export class Logger {

    private static settings = {

    };

    private static sinks = [];
    private static levels: Array<LogLevel> = [];

    constructor(
        private scopes: Array<string>,
    ) {}

    public static attachGlobal() {

    }

}

interface LoggerSettings {
    padding: 'left' | 'right' | 'center';
    paddingType: 'space' | 'dot' | 'underscore';
}

interface LogSink {

    print(message: string): void | Promise<void>;

}

export type LogLevel = {
    name: string,
    color: string,
    icon: string,
}