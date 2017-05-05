/* global fetch */

import fetch from 'isomorphic-fetch'
import qs from 'qs';

// import * as sessionSelectors from 'src/services/session/selectors';
const apiConfig = {
	url: '',
}

export const exceptionExtractError = (exception) => {
	if (!exception.Errors) return false;
	let error = false;
	const errorKeys = Object.keys(exception.Errors);
	if (errorKeys.length > 0) {
		error = exception.Errors[errorKeys[0]][0].message;
	}
	return error;
};

export const fetchApi = (endPoint, payload = {}, reMethod = 'get', headers = {}) => {
	const method =reMethod ? reMethod.toUpperCase() : 'GET';
	const reqHeaders = {
		'Client-ID': '8puWuJWZYls1Ylawxm6CMiYREhsGGSyw',
		...headers,
	};

	const options = { headers: reqHeaders, method };
	let url = endPoint;
	if (method === 'GET') {
		if (url.indexOf('?') === -1) url += '?';
		url += qs.stringify(payload);
	} else {
		options.body = JSON.stringify(payload);
	}
	return fetch(`${apiConfig.url}${url}`, options).then( response => {
		if (response.status === 204) {
			return response.text();
		}
		return response.json();
	});
};
