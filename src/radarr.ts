
/* eslint-disable @typescript-eslint/naming-convention */

import axios from 'axios';
import {radarrApiKey, radarrUrl} from './environment';
import logger from './logger';

export const radarrLogger = logger.child({source: 'Radarr'});
export const radarrAxios = axios.create({baseURL: radarrUrl});
radarrAxios.interceptors.request.use(config => {
	config.params ||= {};
	config.params.apikey = radarrApiKey;
	return config;
});

export async function getRadarrMovieId(filename: string) {
	for await (const record of getRadarrHistory()) {
		if (record.sourceTitle === filename) {
			return record.id;
		}
	}
}

export async function * getRadarrHistory() {
	for (let page = 1; ; page++) {
		const result = await radarrAxios.get('/api/v3/history', {params: {page, pageSize: 1000}});
		yield * result.data.records;

		if (result.data.page * result.data.pageSize >= result.data.totalRecords) {
			break;
		}
	}
}
