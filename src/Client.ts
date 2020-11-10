import { EventEmitter } from '../deps.ts';
import ProtectedDataStore from './util/ProtectedDataStore.ts';
export default class Client extends EventEmitter {
	public protectedDataStore: ProtectedDataStore;
	constructor(token: string, opt: any) {
		super();
		this.protectedDataStore = new ProtectedDataStore();
	}
}
