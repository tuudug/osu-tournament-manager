import React from "react";
import { errorLogger } from "@/services/error/error-logger";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    errorLogger.logError("react_error", error, {
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-lg bg-red-50 p-4 text-red-800">
          <h2 className="mb-2 text-lg font-semibold">Something went wrong</h2>
          <p>
            Please try refreshing the page. If the problem persists, contact
            support.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
