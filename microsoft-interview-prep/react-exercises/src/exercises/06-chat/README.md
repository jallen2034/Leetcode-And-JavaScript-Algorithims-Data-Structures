# Exercise 06 — Chat UI à la Microsoft Teams

"Create a Chat Interface like Teams" is a **documented Microsoft machine-coding
prompt** — this is the highest-value exercise in the folder for the loop.

Target: core (steps 1–4) in ~60 min, stretches after.

## The planted bug

You'll see it immediately: every incoming message appears **twice**. Nothing is
wrong with `chatApi`. StrictMode mounts effects twice in dev to expose exactly
this class of bug. Fix it properly — not by disabling StrictMode (say out loud
why that's the wrong move).

## Requirements

1. Fix the double-subscription (effect cleanup).
2. Sending: input + Enter key AND a Send button; clears on send; uses
   `sendMessage()` and appends the resolved message. Stretch flavour: append
   optimistically BEFORE the promise resolves — then what do you do if it had
   failed? (Say the rollback story out loud.)
3. Auto-scroll: new messages scroll the list to the bottom. `useRef` +
   `scrollIntoView` (or `scrollTop = scrollHeight`). Which effect triggers it,
   and on what dependency?
4. Message grouping, Teams-style: consecutive messages from the same author
   render under ONE author header. Derive the grouping at render time — do
   NOT store grouped structure in state. (Why not? What happens to your
   groups when one message arrives?)
5. Accessibility: the message list should be a semantic list; new-message
   announcements want `aria-live="polite"` on the container; label the input.

## Stretches

6. Smart auto-scroll: if the user has scrolled UP to read history, new
   messages must NOT yank them down — show a "↓ new messages" pill instead.
   (Compare `scrollTop + clientHeight` vs `scrollHeight`; keep the threshold
   forgiving.)
7. "Priya is typing..." indicator driven by a random timer — then ask: where
   would a debounce or throttle belong in a REAL typing indicator, on the
   sender side or receiver side?

## Interview talking points

- Why keys = `message.id` and never the array index (messages get PREPENDED
  when loading history — exercise 03's lesson, live).
- Where the subscription belongs (effect, `[]` deps, cleanup) vs where sending
  belongs (event handler, no effect). "You don't need an effect for user
  events" is a sentence interviewers love hearing.
- `setMessages(prev => [...prev, msg])` — functional form, because the
  subscription callback closes over a stale `messages`. This is the same
  stale-closure creature from debounce-land.

## Lessons actually learned building it (2026-10-18)

- Effect cleanup = return the unsubscribe; StrictMode's mount→cleanup→mount
  dance exists to prove it works. Setup/cleanup are a matched create/destroy
  pair — nothing survives between cycles.
- `finally` is only for things correct on BOTH outcomes (spinner yes; error
  reset belongs at attempt START; scroll belongs on SUCCESS only).
- Derive from the cause, not downstream state: unread counting lives in the
  subscription callback (which KNOWS a message is incoming), not in a
  `[messages]` effect (which only knows "something changed" — and fires on
  mount and on your own sends).
- Scroll UX: scroll events are the trigger, position is the truth. Derive
  `isAtBottom` from measurement on every scroll event; paused/pill/auto-scroll
  all key off that one boolean. Auto-resume and self-healing auto-scroll fall
  out for free. (Same pattern Twitch/Discord ship.)
- Perf: store the decision (boolean), not the measurement (scrollTop px) —
  React's same-value bailout then does the throttling for you. rAF-throttle
  only if the handler itself gets heavy. Refs are for values render never reads.
