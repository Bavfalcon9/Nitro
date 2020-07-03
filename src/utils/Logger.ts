import Colors from './Colors.ts';

class Logger {
    public static DEBUG_ENABLED = false;
    private name: string;

    constructor(name: string = 'NITRO') {
        this.name = name;
    }

    public debug(msg: string): void {
        if (!Logger.DEBUG_ENABLED) return;
        const named: string = `[${this.name}/DEBUG]: `;
        this.colorLog(named + msg, Colors.Dim);
        return;
    }

    public warn(msg: string): void {
        const named: string = `[${this.name}/WARN]: `;
        this.colorLog(named + msg, Colors.FgRed);
        return;
    }

    public notice(msg: string): void {
        const named: string = `[${this.name}/NOTICE]: `;
        this.colorLog(named + msg, Colors.FgBlue);
        return;
    }

    public colorLog(msg: string, color: string): void {
        console.log(color + msg);
        return;
    }
}

export default Logger;