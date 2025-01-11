/* eslint-disable @typescript-eslint/naming-convention */

import axios from 'axios';
import {sonarrApiKey, sonarrUrl} from './environment';
import {type TdarrHealthcheckRecord} from './tdarr.d';
import {type SonarrSeriesRecord} from './sonarr.d';

export const sonarrAxios = axios.create({baseURL: sonarrUrl, headers: {'X-Api-Key': sonarrApiKey}});

export async function getSonarrSeriesId(tdarrRecord: TdarrHealthcheckRecord) {
	for await (const record of await getSonarrSeries()) {
		if (tdarrRecord.meta?.Directory.includes(record.path)) {
			return record;
		}
	}
}

export async function getSonarrSeries(): Promise<SonarrSeriesRecord[]> {
	const result = await sonarrAxios.get('/api/v3/series');
	return result.data;
}

export async function * getSonarrHistory() {
	for (let page = 1; ; page++) {
		const result = await sonarrAxios.get('/api/v3/history', {params: {page, pageSize: 1000}});
		yield * result.data.records;

		if (result.data.page * result.data.pageSize >= result.data.totalRecords) {
			break;
		}
	}
}
