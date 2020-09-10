import Guild from "../guild/Guild.ts";
import Client from "../../Client.ts";
import Base from "../Base.ts";

class Channel extends Base {
     constructor(data: any) {
          super(data.id);
     }

     public static getTypeString(type: number): 'text' | 'dm' | 'voice' | 'group' | 'category' | 'news' | 'store' | 'video' {
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
