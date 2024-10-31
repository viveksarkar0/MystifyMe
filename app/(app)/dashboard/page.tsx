'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { User } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { MessageCard } from '@/components/MessageCard';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import { z } from 'zod';

// Define message interface
interface Message {
  id: number;
  content: string;
  createdAt: Date;
  userId: number;
}

// Define form schema interface
const formSchema = z.object({
  acceptMessages: z.boolean(),
});

const Dashboard = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { acceptMessages: false },
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  // Fetch messages function
  const fetchMessages = useCallback(async (refresh = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get<{ messages: Message[] }>('/api/get-message');
      setMessages(response.data.messages || []);
      if (refresh) {
        toast({
          title: 'Refreshed Messages',
          description: 'Showing latest messages',
        });
      }
    } catch (error) {
      const err = error as AxiosError;
  toast({
    title: 'Error',
    description: (err.response?.data as { message: string })?.message || 'Failed to fetch messages',
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
      const response = await axios.get<{ isAcceptingMessages: boolean }>('/api/accept-messages');
      setValue('acceptMessages', response.data.isAcceptingMessages);
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: 'Error',
        description: (err.response?.data as { message: string })?.message || 'Failed to fetch messages',
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
      const response = await axios.post<{ message: string }>('/api/accept-messages', {
        acceptMessages: !acceptMessages,
      });
      setValue('acceptMessages', !acceptMessages);
      toast({
        title: response.data.message,
        variant: 'default',
      });
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: 'Error',
        description: (err.response?.data as { message: string })?.message || 'Failed to fetch messages',
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
    setMessages(messages.filter((message: Message) => message.id.toString() !== messageId));
  };
  
  if (!session || !session.user) {
    return <div></div>;
  }

  const { username } = session.user as User;
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
      <button onClick={() => signOut()} className='text-white'>Sign Out</button>

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
        key={message.id.toString()} // Convert `id` to string
        message={{ ...message, id: message.id.toString() }} // Ensure `id` is a string
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
