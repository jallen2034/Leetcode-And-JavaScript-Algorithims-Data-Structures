import './SendMessagesButton.scss';

interface SendMessageButtonProps {
  onSend: () => void;
  disabled?: boolean;
  sending?: boolean;
}

export const SendMessageButton = ({
  onSend,
  disabled = false,
  sending = false,
}: SendMessageButtonProps) => {
  return (
    <button
      className={`send-message-btn ${sending ? 'is-sending' : ''}`}
      onClick={onSend}
      disabled={disabled || sending}
      type="button"
    >
      {sending ? (
        <>
          <span className="spinner-icon" aria-hidden="true"></span>
          <span className="send-text">Sending...</span>
        </>
      ) : (
        <>
          <span className="send-icon" aria-hidden="true">🕊️</span>
          <span className="send-text">Send</span>
        </>
      )}
    </button>
  );
};
