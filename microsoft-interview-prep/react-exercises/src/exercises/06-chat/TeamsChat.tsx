// Exercise 06 — Teams-style chat. Brief, requirements, and lessons learned
import { useEffect } from 'react';
import { ErrorMessage } from "./Components/Error/Error.tsx";
import { SendMessageButton } from "./Components/SendMessageButton/SendMessageButton.tsx";
import { UnreadNotification } from "./Components/UnreadNotification/UnreadNotification.tsx";
import { type ChatScrollReturn, useChatScroll } from "./Hooks/UseChatScroll/useChatScroll.tsx";
import { type ChatApiReturn, useChatApi } from "./Hooks/UseChatAPI/useChatAPI.tsx";
import type { ChatMessageGroup } from "./Hooks/UseChatAPI/types.ts";
import MessageGroupRepeater from "./Components/MessageGroupRepeater/MessageGroupRepeater.tsx";

export default function TeamsChat() {
  const {
    scrollToBottom,
    handleScroll,
    updateUnreadMessageCount,
    updateUnreadMessage,
    resetUnreadMessageCount,
    isAtBottom,
    containerRef,
    messagesEndRef,
    unreadMessage,
    undreadCount
  }: ChatScrollReturn = useChatScroll();

  const {
    draft,
    sendingMessage,
    messageSentError,
    messageGroups,
    sendChatMessage,
    dismissError,
    updateDraftMessage,
    handleEnterKeyPress
  }: ChatApiReturn = useChatApi(
    resetUnreadMessageCount,
    updateUnreadMessage,
    scrollToBottom
  );

  useEffect(() => {
    updateUnreadMessage(true);
    updateUnreadMessageCount(1);

    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messageGroups]);

  return (
    <div>
      <h2>06 — Teams-style chat</h2>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: 360,
          overflowY: 'auto',
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 12,
          marginBottom: 8,
        }}
      >
        {messageGroups.map((group: ChatMessageGroup) => (
          <MessageGroupRepeater group={group}/>
        ))}
        <div ref={messagesEndRef}/>
      </div>

      <div style={{display: 'flex', gap: 8}}>
        <input
          value={draft}
          onChange={(e) => updateDraftMessage(e.target.value)}
          placeholder="Type a message"
          disabled={sendingMessage}
          style={{flex: 1}}
          onKeyDown={(event) => handleEnterKeyPress(event)}
        />
        <SendMessageButton onSend={sendChatMessage} sending={sendingMessage}/>
      </div>

      {messageSentError &&
        <ErrorMessage message={messageSentError} onDismiss={dismissError}/>
      }

      {unreadMessage &&
        <UnreadNotification
            onClick={scrollToBottom} count={undreadCount}
        />
      }
    </div>
  );
}