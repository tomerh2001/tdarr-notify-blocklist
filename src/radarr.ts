
/* eslint-disable @typescript-eslint/naming-convention */

import axios from 'axios';
import {radarrApiKey, radarrUrl} from './environment';
import {type TdarrHealthcheckRecord} from './tdarr.d';
import {type RadarrMovieRecord} from './radarr.d';

export const radarrAxios = axios.create({baseURL: radarrUrl, headers: {'X-Api-Key': radarrApiKey}});

export async function getRadarrMovieId(tdarrRecord: TdarrHealthcheckRecord) {
	for await (const record of await getRadarMovies()) {
		if (record.movieFile?.path === tdarrRecord.file) {
			return record.id;
		}
	}
}

export async function getRadarMovies(): Promise<RadarrMovieRecord[]> {
	const result = await radarrAxios.get('/api/v3/movie');
	return result.data;
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
