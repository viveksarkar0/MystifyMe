'use client';

import { Button } from '@/components/ui/button';
import { toast, useToast } from '@/hooks/use-toast';
import { User } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { MessageCard } from '@/components/MessageCard';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import { z } from 'zod';
interface Message {
  id: number;            // Message ID
  content: string;       // Message content
  createdAt: Date;     // Timestamp of when the message was created
  userId: number;        // ID of the user who created the message
}
const Dashboard = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  // Zod schema for the form
  const formSchema = z.object({
    acceptMessages: z.boolean()
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { acceptMessages: false }
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  

  // Fetch messages function
  const fetchMessages = useCallback(async (refresh = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/get-message');
      console.log(response.data.messages)
      setMessages(response.data.messages || []);
      if (refresh) {
        toast({
          title: 'Refreshed Messages',
          description: 'Showing latest messages',
        });
      }
    } catch (error:any) {
      toast({
        title: 'Error',
        description: error.response?.data.message || 'Failed to fetch messages',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Fetch accept messages setting
  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get('/api/accept-messages');
      setValue('acceptMessages', response.data.isAcceptingMessages);
    } catch (error:any) {
      toast({
        title: 'Error',
        description: error.response?.data.message || 'Failed to fetch message settings',
        variant: 'destructive',
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  // Toggle accept messages setting
  const handleSwitchChange = async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.post('/api/accept-messages', {
        acceptMessages: !acceptMessages,
      });
      setValue('acceptMessages', !acceptMessages);
      toast({
        title: response.data.message,
        variant: 'default',
      });
    } catch (error:any) {
      toast({
        title: 'Error',
        description: error.response?.data.message || 'Failed to update message settings',
        variant: 'destructive',
      });
    } finally {
      setIsSwitchLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (session?.user) {
      fetchMessages();
      fetchAcceptMessages();
    }
  }, [session, fetchMessages, fetchAcceptMessages]);


  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message:any) => message.id!== messageId));
  };

  
  if (!session || !session.user) {
    return <div></div>;
  }
  const { username } = session?.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  // Copy profile URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: 'URL Copied!',
      description: 'Profile URL has been copied to clipboard.',
    });
  };

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-slate-950 rounded w-full max-w-6xl mt-32">
      <h1 className="text-4xl font-bold mb-4 text-white">Welcome, {username}!</h1>
      <button onClick={()=> signOut()} className='text-white'>sing ou</button>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-white">Copy Your Unique Link</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="bg-gray-800 text-white p-2 rounded-l-md w-full"
          />
          <Button onClick={copyToClipboard} className="rounded-r-md">Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2 text-white">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={() => fetchMessages(true)}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
     
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p className="text-white">No messages to display.</p>
        )}
      </div> 
    </div>
  );
};

export default Dashboard;
