import {I_Console, I_LogCtx, I_LogConfig, I_LogSegment, I_Log } from './i_log2.ts.adligo.org@slink/i_log2.mts';
//import {I_Console, I_LogCtx, I_LogConfig, I_LogSegment, I_Log } from '@i_log2.ts.adligo.org@slink/i_log2';

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