import ProtectedDataStore from '../stores/ProtectedDataStore.ts';
import Endpoints from './Endpoints.ts';
import MessageContent from '../network/discord/interfaces/MessageContent.ts';
import Message from '../structures/Message.ts';
import Client from '../Client.ts';
import { ApplicationInformation } from '../network/discord/interfaces/ApplicationInformation.ts';
import SimpleEmbed from '../utils/discord/SimpleEmbed.ts';

class RequestManager {
     private static client: Client;

     constructor(client: Client) {
          RequestManager.client = client;
          // to do: Queue system (respect discord rate limits)
          // to do: Handle errors correctly, pass through promise.
          // to do: Never
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
     public static request(url: string, req: RequestInit): Promise<Response> {
          req.headers = {
               'Authorization': 'Bot ' + ProtectedDataStore.token || '',
               'User-Agent': 'Nitro (https://github.com/Bavfalcon9/Nitro)'
          };
          
          if (req.method === 'POST' || req.method === 'PATCH') {
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

     /**
      * Send a message, return a promise.
      * @param chanid - Channel Id
      * @param content - Content
      */
     public static async sendMessage(chanid: string, content: MessageContent|SimpleEmbed): Promise<Message> {
          const response = await RequestManager.request(Endpoints.REST_BASE_URL + Endpoints.CHANNEL_MESSAGES(chanid), {
               body: JSON.stringify(content),
               method: 'POST'
          });
          if (!response.ok) {
               throw 'Failed to post: ' + await response.text();
          } else {
               return new Message(await response.json());
          }
     }

     /**
      * Edit a message
      * @param chanid - Channel Id
      * @param mid - Message Id
      * @param content - New content
      */
     public static async editMessage(chanid: string, mid: string, content: MessageContent): Promise<Message> {
          const response = await RequestManager.request(Endpoints.REST_BASE_URL + Endpoints.CHANNEL_MESSAGES(chanid, mid), {
               body: JSON.stringify(content),
               method: 'PATCH'
          });
          if (!response.ok) {
               throw 'Failed to post: ' + await response.text();
          } else {
               return new Message(await response.json());
          }
     }

     /**
      * Deletes a message
      * @param chanid - Channel Id
      * @param mid - Message Id
      */
     public static async deleteMessage(chanid: string, mid: string): Promise<boolean> {
          const response = await RequestManager.request(Endpoints.REST_BASE_URL + Endpoints.CHANNEL_MESSAGES(chanid, mid), {
               method: 'DELETE'
          });
          if (!response.ok) {
               return false;
          } else {
               return true;
          }
     }

     /**
      * Get the application for the bot.
      */
     public static async getApplication(): Promise<boolean|ApplicationInformation> {
          const response = await RequestManager.request(Endpoints.get(Endpoints.OAUTH2_APPLICATION), {
               method: 'GET'
          });

          if (!response.ok) {
               return false;
          } else {
               return await response.json();
          }
     }
}
export default RequestManager;