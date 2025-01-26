/* eslint-disable @typescript-eslint/naming-convention */

import axios from 'axios';
import {tdarrUrl} from './environment';
import {type TdarrTranscodeResponse, type TdarrHealthcheckResponse} from './tdarr.d';

export const tdarrAxios = axios.create({baseURL: tdarrUrl});

export async function getFailedHealthChecks(): Promise<TdarrHealthcheckResponse> {
	const result = await tdarrAxios.post('/api/v2/client/status-tables', {
		data: {
			opts: {table: 'table6'},
			start: 0,
			pageSize: -1,
			filters: [],
			sorts: [],
		},
	});
	return result.data;
}

export async function getFailedTranscodes(): Promise<TdarrTranscodeResponse> {
	const result = await tdarrAxios.post('/api/v2/client/status-tables', {
		data: {
			opts: {table: 'table3'},
			start: 0,
			pageSize: -1,
			filters: [],
			sorts: [],
		},
	});
	return result.data;
}
