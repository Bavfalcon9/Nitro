import type OPCodes from "./OPCodes.ts";

interface Payload {
    t?: string;
    s?: number;
    op: OPCodes;
    d: any;
}
export default Payload;
