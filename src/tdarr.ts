/* eslint-disable @typescript-eslint/naming-convention */

import axios from 'axios';
import {tdarrUrl} from './environment';
import logger from './logger';

export const tdarrLogger = logger.child({source: 'Tdarr'});
export const tdarrAxios = axios.create({baseURL: tdarrUrl});

export async function getFailedHealthChecks() {
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
