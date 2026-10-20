import { useEffect, useState } from 'react';
import { type ChatMessage, sendMessage, subscribeToIncoming } from "../../../../lib/chatApi.ts";
import type {ChatMessageGroup} from "./types.ts";
import { groupMessages } from "./helpers.ts";
import * as React from "react";

export interface ChatApiReturn {
  draft: string;
  messageGroups: ChatMessageGroup[]
  sendingMessage: boolean;
  messageSentError: string | null;
  sendChatMessage: () => Promise<void>;
  dismissError: () => void;
  updateDraftMessage: (newValue: string) => void;
  handleEnterKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const useChatApi = (
  resetUnreadMessageCount: any,
  updateUnreadMessage: any,
  scrollToBottom: any
): ChatApiReturn => {
  const [draft, setDraft] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>([])

  const [messageSentError, setMessageSentError] = useState<string | null>(null)
  const [sendingMessage, setSendingMessage] = useState<boolean>(false);

  const dismissError = () => {
    setMessageSentError(null);
  }

  const handleEnterKeyPress = (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendChatMessage();
    }
  }

  const sendChatMessage = async () => {
    if (sendingMessage) {
      console.error('You are already sending a message bud');
      return;
    }

    setMessageSentError(null);

    try {
      setSendingMessage(true);
      const sentMessage: ChatMessage = await sendMessage(draft);

      setMessages((prevState: ChatMessage[]): ChatMessage[] => {
        return [...prevState, sentMessage]
      });

      setDraft('');
    } catch (error) {
      setMessageSentError(`Unexpected Error happened from the APi when trying to send message: ${error}`)
    } finally {
      setSendingMessage(false);
      resetUnreadMessageCount();
      updateUnreadMessage(false);
      scrollToBottom();
    }
  }

  const updateDraftMessage = (newValue: string) => {
    setDraft(newValue);
  };

  useEffect(() => {
    const unsubscribe = subscribeToIncoming((msg: ChatMessage) => {
      setMessages((prevState: ChatMessage[]): ChatMessage[] => {
        return [...prevState, msg]
      })
    })

    return () => {
      unsubscribe();
    };
  }, []);

  const messageGroups: ChatMessageGroup[] = groupMessages(messages);

  return {
    draft,
    sendingMessage,
    messageSentError,
    messageGroups,
    sendChatMessage,
    dismissError,
    updateDraftMessage,
    handleEnterKeyPress
  };
};
