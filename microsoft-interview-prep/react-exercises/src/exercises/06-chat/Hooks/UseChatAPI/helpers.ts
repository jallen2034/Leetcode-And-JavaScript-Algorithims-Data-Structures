import type { ChatMessage } from "../../../../lib/chatApi.ts";
import type {ChatMessageGroup} from "./types.ts";

const createFirstMessageGroup = (newMsgFromApi: ChatMessage) => {
  const firstMessageGroup: ChatMessageGroup = {
    author: newMsgFromApi.author,
    messages: [newMsgFromApi]
  }

  return firstMessageGroup;
}

const appendMessageToGroup = (
  mostRecentGroupCopy: ChatMessageGroup,
  newMsgFromApi: ChatMessage
): ChatMessageGroup => {
  if (!mostRecentGroupCopy) {
    const firstMessageGroup: ChatMessageGroup = {
      author: newMsgFromApi.author,
      messages: [newMsgFromApi]
    }

    return firstMessageGroup;
  }

  if (mostRecentGroupCopy.author === newMsgFromApi.author) {
    mostRecentGroupCopy.messages.push(newMsgFromApi);
    return mostRecentGroupCopy;
  }

  const newMessageGroup: ChatMessageGroup = {
    author: newMsgFromApi.author,
    messages: [newMsgFromApi]
  }

  return newMessageGroup;
}

const addMessageToGroups = (
  prevGroups: ChatMessageGroup[],
  newMsgFromAPI: ChatMessage
): ChatMessageGroup[] => {
  if (prevGroups.length === 0) {
    const firstMessageGroup: ChatMessageGroup = createFirstMessageGroup(newMsgFromAPI);
    return [ firstMessageGroup ];
  }

  const mostRecentGroup: ChatMessageGroup = prevGroups[prevGroups.length - 1];

  const deepCopy: ChatMessageGroup = {
    ...mostRecentGroup,
    messages: [ ...mostRecentGroup.messages ]
  }

  const updatedMessageGroup: ChatMessageGroup = appendMessageToGroup(deepCopy, newMsgFromAPI);

  if (mostRecentGroup.author === newMsgFromAPI.author) {
    const prevStateMinusLastMessage: ChatMessageGroup[] = prevGroups.slice(0, -1);
    prevStateMinusLastMessage.push(updatedMessageGroup);
    return prevStateMinusLastMessage;
  }

  return [ ...prevGroups, updatedMessageGroup ];
}

export {
  addMessageToGroups
}