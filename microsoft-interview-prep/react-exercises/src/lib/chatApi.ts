// Infrastructure for exercise 06 — a fake Teams-style chat backend.
//
// subscribeToIncoming(cb) starts a stream of incoming messages at random
// intervals and returns an UNSUBSCRIBE function. If you subscribe twice
// without cleaning up, you get two streams — and React StrictMode mounts
// effects twice in dev ON PURPOSE, so a missing cleanup shows up as
// duplicated messages. That's not a bug in this file; it's the exercise.
//
// sendMessage(text) resolves with the sent message after realistic latency.

export type ChatMessage = {
  id: string;
  author: string;
  text: string;
  sentAt: number;
  isMe: boolean;
};

// Scripted author order with deliberate back-to-back repeats (Priya x2,
// Elena x3) so consumers that GROUP consecutive messages by author have
// both cases guaranteed: same-author-as-last and author-changed.
const AUTHOR_SCRIPT = [
  'Priya', 'Priya',
  'Marcus',
  'Elena', 'Elena', 'Elena',
  'Marcus', 'Marcus',
  'Priya',
];

const CANNED_REPLIES = [
  'Did you see the p95 spike on the ingestion dashboard?',
  'Deploy to canary finished, watching the error rate now.',
  'Can someone review my PR before standup?',
  'The Fabric workspace demo is at 2pm, right?',
  'Telemetry sampling is at 10%, should we bump it for the incident?',
  'lgtm 🚀',
  'Grabbing coffee, back in 5.',
  'That flaky test is failing again on main 😤',
];

let nextId = 1;

export function makeMessage(text: string, author: string, isMe: boolean): ChatMessage {
  return { id: `msg-${nextId++}`, author, text, sentAt: Date.now(), isMe };
}

// Deliberately DETERMINISTIC: every subscription walks the same script on the
// same schedule. So if a component subscribes twice (hello, missing cleanup
// under StrictMode), you'll see each message arrive TWICE, back to back —
// the bug becomes impossible to miss.
export function subscribeToIncoming(onMessage: (msg: ChatMessage) => void): () => void {
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout>;
  let step = 0;

  const scheduleNext = () => {
    timer = setTimeout(() => {
      if (cancelled) return;
      const author = AUTHOR_SCRIPT[step % AUTHOR_SCRIPT.length];
      const text = CANNED_REPLIES[step % CANNED_REPLIES.length];
      step += 1;
      onMessage(makeMessage(text, author, false));
      scheduleNext();
    }, 3000);
  };

  scheduleNext();
  console.log('[chat] subscribed to incoming messages');

  return () => {
    cancelled = true;
    clearTimeout(timer);
    console.log('[chat] unsubscribed');
  };
}

// Failure modes are DETERMINISTIC (same lesson as the incoming stream):
//   - any message containing "fail" rejects — on-demand error testing
//   - every 5th send rejects — ambient failures you didn't ask for
let sendCount = 0;

export function sendMessage(text: string): Promise<ChatMessage> {
  sendCount += 1;
  const shouldFail = text.toLowerCase().includes('fail') || sendCount % 5 === 0;

  return new Promise((resolve, reject) => {
    // Increased this Claude to 2500ms (2.5 seconds) so I can test my loader.
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`[chat] send failed (send #${sendCount})`));
        return;
      }
      resolve(makeMessage(text, 'You', true));
    }, 2500);
  });
}