import { useEffect, useState } from 'react';
import { type ChatMessage, sendMessage, subscribeToIncoming } from "../../../../lib/chatApi.ts";
import type {ChatMessageGroup} from "./types.ts";
import { addMessageToGroups } from "./helpers.ts";
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
  const [messageGroups, setMessageGroups] = useState<ChatMessageGroup[]>([]);

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

      const sentMessageFromMe: ChatMessageGroup = {
        author: sentMessage.author,
        messages: [sentMessage]
      }

      setMessageGroups((prevState: ChatMessageGroup[]): ChatMessageGroup[] => {
        return [...prevState, sentMessageFromMe]
      });

      setDraft('');
    } catch (error) {
      setMessageSentError(`Unexpected Error happened from the API when trying to send message: ${error}`)
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
    const unsubscribe = subscribeToIncoming((newMsgFromAPI: ChatMessage) => {
      setMessageGroups((prevState: ChatMessageGroup[]): ChatMessageGroup[] => {
        return addMessageToGroups(prevState, newMsgFromAPI);
      });
    })

    return () => {
      unsubscribe();
    };
  }, []);

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
