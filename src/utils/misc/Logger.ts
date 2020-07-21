import * as fmtColors from "https://deno.land/std/fmt/colors.ts";

class Logger {
    public static DEBUG_ENABLED = false;
    private name: string;

    constructor(name: string = 'NITRO') {
        this.name = name;
    }

    public debug(msg: string): void {
        if (!Logger.DEBUG_ENABLED) return;
        const named: string = `[${this.name}/DEBUG]: `;
        this.colorLog(named + msg, 0x969696);
        return;
    }

    public warn(msg: string): void {
        const named: string = `[${this.name}/WARN]: `;
        this.colorLog(named + msg, 0xff6a45);
        return;
    }

    public notice(msg: string): void {
        const named: string = `[${this.name}/NOTICE]: `;
        this.colorLog(named + msg, 0x41f7fa);
        return;
    }

    public colorLog(msg: string, color: number): void {
        console.log(fmtColors.rgb24(msg, color));
        return;
    }
}

export default Logger;