import * as React from "react";
import "./Error.scss";

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="error-container" role="alert">
      <div className="error-icon" aria-hidden="true">⚠️</div>
      <div className="error-content">
        <p className="error-text">{message}</p>
        <button className="error-retry-btn" onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
};