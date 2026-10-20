import type { ChatMessage } from "../../../../lib/chatApi.ts";
import type {ChatMessageGroup} from "./types.ts";

const groupMessages = (
  messages: ChatMessage[]
): ChatMessageGroup[] => {
  const messageGroups: ChatMessageGroup[] = [];

  for (let message of messages) {
    const peakedLastMessageGroupInList: ChatMessageGroup = messageGroups[messageGroups.length - 1];
    
    if (peakedLastMessageGroupInList === undefined) {
      const initalChatGroup: ChatMessageGroup = {
        author: message.author,
        messages: [ message ]
      }

      messageGroups.push(initalChatGroup);
      continue;
    }

    if (peakedLastMessageGroupInList.author === message.author) {
      peakedLastMessageGroupInList.messages.push(message);
      continue;
    }

    const newChatGroup: ChatMessageGroup = {
      author: message.author,
      messages: [ message ]
    }

    messageGroups.push(newChatGroup);
  }

  return messageGroups;
}

export {
  groupMessages
}