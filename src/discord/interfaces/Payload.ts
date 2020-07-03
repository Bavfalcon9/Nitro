import OPCodes from "./OPCodes.ts";

interface Payload {
    t?: string;
    op: OPCodes;
    d: any;
}
export default Payload;