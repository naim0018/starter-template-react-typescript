type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LoggerConfig {
  enableConsole: boolean;
  minLevel: LogLevel;
}

const isDevelopment = import.meta.env.VITE_ENV === 'development';

const defaultConfig: LoggerConfig = {
  enableConsole: isDevelopment,
  minLevel: isDevelopment ? 'debug' : 'warn',
};

const logLevels: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  private shouldLog(level: LogLevel): boolean {
    return (
      this.config.enableConsole &&
      logLevels[level] >= logLevels[this.config.minLevel]
    );
  }

  private formatMessage(level: LogLevel, message: string, data?: unknown): string {
    const timestamp = new Date().toISOString();
    const dataString = data ? `\n${JSON.stringify(data, null, 2)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${dataString}`;
  }

  debug(message: string, data?: unknown): void {
    if (this.shouldLog('debug')) {
      // eslint-disable-next-line no-console
      console.debug(this.formatMessage('debug', message, data));
    }
  }

  info(message: string, data?: unknown): void {
    if (this.shouldLog('info')) {
      // eslint-disable-next-line no-console
      console.log(this.formatMessage('info', message, data));
    }
  }

  warn(message: string, data?: unknown): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, data));
    }
  }

  error(message: string, error?: unknown): void {
    if (this.shouldLog('error')) {
      const errorData = error instanceof Error 
        ? { message: error.message, stack: error.stack }
        : error;
      console.error(this.formatMessage('error', message, errorData));
    }
  }
}

export const logger = new Logger();

export default logger;
