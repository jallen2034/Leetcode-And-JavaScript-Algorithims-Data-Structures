// Exercise 06 — Teams-style chat. Brief, requirements, and lessons learned
import { useEffect } from 'react';
import { ErrorMessage } from "./Error/Error.tsx";
import { SendMessageButton } from "./SendMessageButton/SendMessageButton.tsx";
import { UnreadNotification } from "./UnreadNotification/UnreadNotification.tsx";
import {type ChatScrollReturn, useChatScroll} from "./Hooks/useChatScroll.tsx";
import {type ChatApiReturn, useChatApi} from "./Hooks/useChatAPI.tsx";
import type {ChatMessage} from "../../lib/chatApi.ts";

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
    messages,
    sendingMessage,
    messageSentError,
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
  }, [messages]);

  // TODO (step 4): derive grouped messages here at render time.

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
        {/* TODO (step 4): replace this flat dump with grouped rendering.
            TODO (step 1 sanity check): after your fix, each message should
            appear exactly once. */}
        {messages.map((msg: ChatMessage, i: number) => (
          <div key={i} style={{marginBottom: 6}}>
            <strong>{msg.author}:</strong> {msg.text}
          </div>
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