import { useState, type RefObject, useRef } from 'react';

export interface ChatScrollReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  isAtBottom: boolean;
  unreadMessage: boolean;
  undreadCount: number;
  scrollToBottom: () => void;
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  updateUnreadMessageCount: (count: number) => void;
  updateUnreadMessage: (show: boolean) => void;
  resetUnreadMessageCount: () => void;
}

export const useChatScroll = (): ChatScrollReturn => {
  const [unreadMessage, setUnreadMessage] = useState<boolean>(false);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const [undreadCount, setUnreadCount] = useState<number>(0);

  const messagesEndRef: RefObject<HTMLDivElement | null> = useRef(null);
  const containerRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setUnreadCount(0);
    setUnreadMessage(false);
  }

  const handleScroll = () => {
    if (!containerRef.current) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    const isAtBottom: boolean = scrollHeight - scrollTop === clientHeight;

    setIsAtBottom(isAtBottom);
  }

  const updateUnreadMessage = (newState: boolean) => {
    setUnreadMessage(newState);
  }

  const resetUnreadMessageCount = () => {
    setUnreadCount(0);
  }

  const updateUnreadMessageCount = (incrementBy: number) => {
    setUnreadCount((prevCount: number) => {
      return prevCount + incrementBy;
    });
  }

  return {
    scrollToBottom,
    handleScroll,
    updateUnreadMessage,
    updateUnreadMessageCount,
    resetUnreadMessageCount,
    isAtBottom,
    containerRef,
    messagesEndRef,
    unreadMessage,
    undreadCount
  }
};
