import {I_Out} from '@ts.adligo.org/i_io/dist/i_io.mjs';
import {I_Console, I_LogCtx, I_LogConfig, I_LogSegment, I_Log, LogLevel, LOGNAME, LEVEL, MESSAGE, DEFAULT_FORMAT } 
  from '@ts.adligo.org/i_log2/dist/i_log2.mjs';


export class ConsoleWrapper implements I_Console {
    theConsole = console;

    constructor(consoleDelgate?: any) {
        if (consoleDelgate != undefined) {
            this.theConsole = consoleDelgate;
        }
    }

    public debug(...data: any[]): void {
        if (data.length == 1) {
            this.theConsole.debug(data[0]);
        } else {
            this.theConsole.debug(data);
        }
    }
    public error(...data: any[]): void {
        if (data.length == 1) {
            this.theConsole.error(data[0]);
        } else {
            this.theConsole.error(data);
        }
    }
    public info(...data: any[]): void {
        if (data.length == 1) {
            this.theConsole.info(data[0]);
        } else {
            this.theConsole.info(data);
        }
    }
    public trace(...data: any[]): void {
        if (data.length == 1) {
            this.theConsole.trace(data[0]);
        } else {
            this.theConsole.trace(data);
        }
    }
    warn(...data: any[]): void {
        if (data.length == 1) {
            this.theConsole.warn(data[0]);
        } else {
            this.theConsole.warn(data);
        }
    }

}



export class LogSegment implements I_LogSegment {
    private buffer: string[] = [];

    public write(message: string): void {
        this.buffer.push(message);
    }


    public flush(): string {
        if (this.buffer.length > 0) {
            return this.buffer.join('');
        } 
        return '';
    }
}


export class Log implements I_Log {
    private name: string;
    private level: LogLevel;
    private format: string;
    private console: I_Console;


    constructor(name: string, level: LogLevel, format: string, console: I_Console) {
        this.name = name;
        this.level = level;
        this.format = format;
        this.console = console;
    }


    private formatMessage(message: string, level: string): string {
        return this.format
            .replace(LOGNAME, this.name)
            .replace(LEVEL, level)
            .replace(MESSAGE, message);
    }


    public debug(message: string | I_LogSegment): void {
        var level = 'DEBUG';
        if (this.isDebug()) {
            if (typeof message === 'string') {
                this.console.debug(this.formatMessage(message, level));
            } else {
                this.console.debug(this.formatMessage(message.flush(), level));
            }
        }
    }


    public error(message: string | I_LogSegment): void {
        var level = 'ERROR';
        if (this.isError()) {
            if (typeof message === 'string') {
                this.console.error(this.formatMessage(message, level));
            } else {
                this.console.error(this.formatMessage(message.flush(), level));
            }
        }
    }


    public info(message: string | I_LogSegment): void {
        var level = 'INFO';
        if (this.isInfo()) {
            if (typeof message === 'string') {
                this.console.info(this.formatMessage(message, level));
            } else {
                this.console.info(this.formatMessage(message.flush(), level));
            }
        }
    }


    public trace(message: string | I_LogSegment): void {
        var level = 'TRACE';
        if (this.isTrace()) {
            if (typeof message === 'string') {
                this.console.trace(this.formatMessage(message, level));
            } else {
                this.console.trace(this.formatMessage(message.flush(), level));
            }
        }
    }


    public warn(message: string | I_LogSegment): void {
        var level = 'WARN';
        if (this.isWarn()) {
            if (typeof message === 'string') {
                this.console.warn(this.formatMessage(message, level));
            } else {
                this.console.warn(this.formatMessage(message.flush(), level));
            }
        }
    }


    public getFormat(): string {
        return this.format;
    }


    public getLevel(): LogLevel {
        return this.level;
    }


    public getName(): string {
        return this.name;
    }


    public isDebug(): boolean {
        return this.level <= LogLevel.DEBUG;
    }


    public isError(): boolean {
        return this.level <= LogLevel.ERROR;
    }


    public isInfo(): boolean {
        return this.level <= LogLevel.INFO;
    }


    public isTrace(): boolean {
        return this.level <= LogLevel.TRACE;
    }


    public isWarn(): boolean {
        return this.level <= LogLevel.WARN;
    }
}


export class LogConfig implements I_LogConfig {
    public readonly CLAZZ_NAME: string = "org.adligo.ts.log2.LogConfig";
    private levels: Map<string,LogLevel> = new Map();
    private format: string = DEFAULT_FORMAT;
    private ctx: I_LogCtx;
    private log: I_Log;

    constructor(properties?: Map<string,string>, format?: string) {
        if (format != undefined) {
            this.format = format;
        }
        if (properties != undefined) {
            for (const [key, value] of Object.entries(properties)) {
                if (key.startsWith('level.')) {
                    const logName = key.substring(6);
                    const level = this.parseLevel(value);
                    if (level !== undefined) {
                        this.levels.set(logName,level);
                    }
                }
            }
        }
        console.log('levels are ' + JSON.stringify(this.levels));
    }
    
    public update(ctx: I_LogCtx) {
        this.ctx = ctx;
        this.log = ctx.getLog(this.CLAZZ_NAME);
    }

    public getFormat(): string {
        return this.format;
    }
    
    private parseLevel(value?: string): LogLevel {
        if (value == undefined) {
            return LogLevel.INFO;
        } else {
            switch (value.toUpperCase()) {
                case 'TRACE': return LogLevel.TRACE;
                case 'DEBUG': return LogLevel.DEBUG;
                case 'INFO': return LogLevel.INFO;
                case 'WARN': return LogLevel.WARN;
                case 'ERROR': return LogLevel.ERROR;
            }
        }
        return LogLevel.INFO;
    }

    getLevel(logName: string): LogLevel {
        /*
        console.debug("LogConfig getLevel '" + logName + "'");
        console.debug('LogConfig has levels ' + JSON.stringify(this.levels));
        if (this.log != undefined) {
            console.debug('LogConfig is at ' + this.log.getLevel());
        }
        */
        if (this.log != undefined && this.log.isDebug()) {
            this.log.debug('LogConfig getLevel for ' + logName + ' is ' + r);
            this.log.debug('LogConfig levels are ' + JSON.stringify(this.levels));
        }
        var r: LogLevel | undefined = this.levels.get(logName); 
        if (this.log != undefined && this.log.isDebug()) {
            this.log.debug("LogConfig getLevel for '" + logName + "' is " + r);
        } else {
            //console.log("LogConfig getLevel for '" + logName + "' is " + r);
        }
        if (r != undefined) {
            return r;
        }
        var lnp = logName.split('.');
        var dotCount = lnp.length - 1;
        while(r == undefined) {
            var logNameLess = this.concat(lnp, dotCount);
            r = this.levels.get(logNameLess); 
            if (this.log != undefined && this.log.isDebug()) {
                this.log.debug("LogConfig getLevel logNameLess for '" + logNameLess + "' is " + r);
            } else {
                //console.log("LogConfig getLevel logNameLess for '" + logNameLess + "' is " + r);
            }
            dotCount--;
            if (logNameLess == '') {
                return LogLevel.INFO;
            }
        }
        return r;
    }

    private concat(parts: string [], nbr: number ): string {
        var sb: string = '';
        for (let index = 0; index < nbr; index++) {
            if (index >= 1) {
                sb = sb + '.' + parts[index];
            } else {
                sb = sb + parts[index];
            }
            
        }
        return sb;
    }
}


export class LogCtx implements I_LogCtx {
    public readonly CLAZZ_NAME = "org.adligo.ts.log2.LogCtx";

    private console: I_Console;
    private config: I_LogConfig;
    private log: I_Log;
    private logs: { [key: string]: I_Log } = {};

    constructor(config?: I_LogConfig, console?: I_Console) {
        this.console = console || new ConsoleWrapper();
        this.config = config || new LogConfig();
        this.config.update(this);
        this.log = this.getLog(this.CLAZZ_NAME);
    }


    public getConsole(): I_Console {
        return this.console;
    }


    public getLog(logName: string): I_Log {
        if (!this.logs[logName]) {
            const level = this.config.getLevel(logName);
            if (this.log != undefined) {
                if (this.log.isInfo()) {
                    this.log.info("Creating log '" + logName + "' with level " + level)
                }
            }
            this.logs[logName] = new Log(logName, level, this.config.getFormat(), this.console);
        }
        return this.logs[logName];
    }
}