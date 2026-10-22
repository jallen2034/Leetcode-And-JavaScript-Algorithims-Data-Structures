import type {ChatMessage} from "../../../../lib/chatApi.ts";
import type {ChatMessageGroup} from "../../Hooks/UseChatAPI/types.ts";
import type {JSX} from "react";

interface MessageGroupRepeaterProps {
  group: ChatMessageGroup
}

const MessageGroupRepeater = (
  { group }: MessageGroupRepeaterProps
): JSX.Element => {
  const isMe: boolean = group.messages[0].isMe;

  return (
    <div
      key={group.messages[0].id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMe ? 'flex-end' : 'flex-start',
        marginBottom: 12,
      }}
    >
      <div style={{fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 2}}>
        {group.author}
      </div>

      {group.messages.map((msg: ChatMessage) => (
        <div
          key={msg.id}
          style={{
            background: isMe ? '#d1e7ff' : '#f0f0f0',
            color: '#1a1a1a',
            borderRadius: 12,
            padding: '6px 10px',
            marginBottom: 4,
            maxWidth: '75%',
          }}
        >
          {msg.text}
        </div>
      ))}
    </div>
  )
}

export default MessageGroupRepeater;