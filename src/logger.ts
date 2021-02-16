import * as util from "util";

export class Logger {

    public static Levels: Record<string, LogLevel> = {
        INFO: {
            name: '',
            icon: '',
            color: ''
        }
    };

    private static sinks: Array<LogSink> = [];

    protected constructor(
        private scopes: Array<string>,
    ) {}

    public static createSinks(...sinks: LogSink[]) {
        this.sinks.push(...sinks);
    }

    public static attachGlobal(logger?: Logger) {
        global['logger'] = logger || Logger.create();
    }

    public static create(...scopes: string[]): Logger {
        return new Logger(scopes);
    }

    public scope(...scope: string[]): Logger {
        return new Logger(this.scopes.concat(scope));
    }

    public log(level: LogLevel, content: string | object) {
        if (typeof content === "object")
            // TODO: Make this configurable
            content = util.inspect(content, true, 3, true);

        for (const sink of Logger.sinks)
            // TODO: use formatter
            sink.print(content);
    }

}

interface LogSink {

    print(message: string): void | Promise<void>;

}

export type LogLevel = {
    name: string,
    color: string,
    icon: string,
}