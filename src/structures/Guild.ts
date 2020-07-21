import Base from './Base.ts';

class Guild extends Base {
    constructor(data: any) {
        super(data.id);
    }

    public get paritial(): boolean {
        return false;
    }
}
export default Guild;