/**
 * @author Azhary Arliansyah
 * @company Pudinglab
 *
 * Helper functions for doing network request
 */
import * as Config from "../constant/Config";

export function formRequest( url, method, data ) {

	let body = '';
	if ( method == 'POST' ) {
		let keys = Object.keys( data );
		for ( let i = 0; i < keys.length; i++ ) {
			body += keys[i] + '=' + data[keys[i]];
			if ( i < keys.length - 1 ) body += '&';
		}
	}

	let http = {
		method: method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};

	if ( method == 'POST' ) http.body = body;

  return fetch(Config.BASE_URL + url, http)
    .then(( response ) => response.json());
}