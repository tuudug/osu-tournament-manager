import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase/types";

type ErrorLogData = Database["public"]["Tables"]["client_error_logs"]["Insert"];

class ErrorLogger {
  private static instance: ErrorLogger;
  private supabase;
  private queue: ErrorLogData[] = [];
  private isProcessing = false;
  private batchSize = 10;
  private batchTimeout = 5000; // 5 seconds
  private timer: NodeJS.Timeout | null = null;

  private constructor() {
    if (typeof window !== "undefined") {
      this.supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );
      window.addEventListener("online", this.processQueue.bind(this));
    }
  }

  public static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  private async processQueue() {
    if (!this.supabase || this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    try {
      while (this.queue.length > 0) {
        const batch = this.queue.splice(0, this.batchSize);
        await this.supabase.from("client_error_logs").insert(batch);
      }
    } catch (error) {
      console.error("Failed to process error log queue:", error);
      // If processing fails, add the items back to the queue
      this.queue.unshift(...this.queue);
    } finally {
      this.isProcessing = false;
    }
  }

  private scheduleProcessing() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.processQueue(), this.batchTimeout);
  }

  public async logError(
    type: string,
    error: unknown,
    context: Record<string, any> = {},
  ) {
    if (typeof window === "undefined") return;

    const errorData: ErrorLogData = {
      error_type: type,
      error_data: this.formatError(error, context),
      url: window.location.href,
      user_agent: navigator.userAgent,
    };

    this.queue.push(errorData);
    this.scheduleProcessing();
  }

  private formatError(error: unknown, context: Record<string, any>) {
    if (error instanceof Error) {
      return {
        message: error.message,
        stack: error.stack,
        ...context,
      };
    } else if (error instanceof Response) {
      return {
        status: error.status,
        statusText: error.statusText,
        ...context,
      };
    } else {
      return {
        error: String(error),
        ...context,
      };
    }
  }
}

export const errorLogger = ErrorLogger.getInstance();

// Global error handlers
if (typeof window !== "undefined") {
  // Handle runtime errors
  window.onerror = (message, source, lineno, colno, error) => {
    errorLogger.logError("runtime", error || message, {
      source,
      lineno,
      colno,
    });
  };

  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    errorLogger.logError("promise_rejection", event.reason);
  });

  // Override console.error
  const originalConsoleError = console.error;
  console.error = (...args) => {
    errorLogger.logError("console_error", args.join(" "));
    originalConsoleError.apply(console, args);
  };
}
