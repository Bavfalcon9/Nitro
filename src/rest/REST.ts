import Endpoints from '../constants/Endpoints.ts';

export default class REST {
	private static token: string;

	public static setToken(token: string) {
		this.token = token;
	}

	public static async request(
		method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT',
		endpoint: string,
		body?: object
	): Promise<any> {
		let headers: any =
			method === 'POST' || method === 'PATCH'
				? {
						Authorization: `Bot ${this.token}`,
						'User-Agent': 'Nitro (https://github.com/Cqdet/Nitro)',
						'Content-Type': 'application/json',
				  }
				: {
						Authorization: `Bot ${this.token}`,
						'User-Agent': 'Nitro (https://github.com/Cqdet/Nitro)',
				  };

		if ((method === 'GET' || method === 'DELETE') && body) {
			let str = '';
			for (let key of Object.keys(body)) {
				// @ts-ignores
				if (!body[key]) {
					// @ts-ignore
					if (Array.isArray(body[key])) {
						// @ts-ignore
						for (let val of body[key]) {
							str += `&${encodeURIComponent(
								key
							)}=${encodeURIComponent(val)}`;
						}
					} else {
						str += `&${encodeURIComponent(
							key
							// @ts-ignore
						)}=${encodeURIComponent(body[key])}`;
					}
				}
			}
			endpoint += '?' + str.substring(1);
		}
		let res = await fetch(Endpoints.REST_URL + endpoint, {
			method,
			headers,
			body: JSON.stringify(body),
		});
		if (!res.ok) {
			throw `Failed to ${method}: ${await res.text()}`;
		} else {
			return res.json() || {};
		}
	}
}
