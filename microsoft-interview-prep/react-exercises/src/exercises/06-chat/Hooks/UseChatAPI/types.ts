import type {ChatMessage} from "../../../../lib/chatApi.ts";

export interface ChatMessageGroup {
  author: string,
  messages: ChatMessage[];
}