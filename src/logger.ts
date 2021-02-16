export class Logger {

    private static sinks = [];
    private static levels: Array<LogLevel> = [];

    protected constructor(
        private scopes: Array<string>,
    ) {}

    public static attachGlobal(logger?: Logger) {
        global['logger'] = logger || Logger.create();
    }

    public static create(): Logger {
        return new Logger([]);
    }

    public scope(scope: string): Logger {
        return new Logger(this.scopes.concat(scope));
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