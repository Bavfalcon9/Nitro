import Base from "../Base.ts";

class Channel extends Base {
     constructor(id: string) {
          super(id);
     }

     public static getTypeString(type: number): string {
          switch(type) {
               default:
               case 0:
                    return 'text';
               case 1:
                    return 'dm';
               case 2:
                    return 'voice';
               case 3:
                    return 'group';
               case 4:
                    return 'category';
               case 5:
                    return 'news';
               case 6:
                    return 'store';
               case 7:
                    return 'video';
          }
     }
}
export default Channel;