import './UnreadNotificaiton.scss';

interface UnreadNotificationProps {
  onClick: () => void;
  count?: number;
}

export const UnreadNotification = ({
  onClick,
  count = 1
}: UnreadNotificationProps) => {
  return (
    <div className="unread-notification-banner">
      <span className="unread-text">
        📩 New unread message{count > 1 ? 's' : ''}
      </span>
      <button
        type="button"
        className="unread-action-btn"
        onClick={onClick}
      >
        Go to most recent
      </button>
    </div>
  );
};
