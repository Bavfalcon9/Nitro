class ProtectedDataStore {
    public static token?: string;

    hash(key: string, value: any): string {
        if(typeof value == 'object') {
            JSON.stringify(value);
        }
        let protectedStream: string = '';
        for (let i of value) {
            let cl = value.charCodeAt(i);
            //protectedStream += cl + (this.startTime - this.randomInc);// get the charCode
        }
        return protectedStream;
    }
}
export default ProtectedDataStore;