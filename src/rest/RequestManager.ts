import ProtectedDataStore from "../stores/ProtectedDataStore.ts";

class RequestManager {
     private _queue: Set<any>;
     private _ticker?: number;

     constructor() {
          this._queue = new Set();
     }

     /**
      * Queue a request, this is assuming you don't want to
      * issue a request directly. 
      * To Do: Assign requests id's, and emit an event when completed.
      * @param req - Request
      */
     public static queue(url: string, req: RequestInit): Promise<any> {
          //this._queue.add(Request);
          return RequestManager.request(url, req);
     }

     /**
      * Send a request and handle the response respectfully (not yet :o)
      * @param req - Request
      */
     public static request(url: string, req: RequestInit): Promise<any> {
          req.headers = {
               'Authorization': 'Bot ' + ProtectedDataStore.token || '',
               'User-Agent': 'Nitro (https://github.com/Bavfalcon9/Nitro)'
          };
          
          if (req.method === 'POST') {
               req.headers['Content-Type'] = 'application/json';
          }
          return new Promise((resolve: any, reject: any): void => {
               fetch(url, req).then((resp: Response): any => {
                    return resolve(resp);
               }).catch((reason: any) => {
                    return reject(reason);
               });
          });
     }
}
export default RequestManager;