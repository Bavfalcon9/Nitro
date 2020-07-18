import Base from './Base.ts';

class Guild extends Base {
    constructor(data: any) {
        super(data.id);
    }
}

export default Guild;