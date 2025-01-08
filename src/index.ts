/* eslint-disable n/prefer-global/process */
/* eslint-disable unicorn/no-process-exit */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import axios from 'axios';
import logger from './logger';

const tdarrLogger = logger.child({source: 'Tdarr'});

const verifyTokenResult = await axios.get('https://tdarr.tomerh2001.com/api/v2/auth/verify-token');
tdarrLogger.child({verifyTokenResult: verifyTokenResult.data}).info('Verify token result');

const statusResult = await axios.get('https://tdarr.tomerh2001.com/api/v2/status');
tdarrLogger.child({statusResult: statusResult.data}).info('Status result');
if (statusResult.data.status !== 'good') {
	throw new Error('Tdarr\'s status is not good, cannot continue.');
}

const failedHealthChecksResult = await axios.post('https://tdarr.tomerh2001.com/api/v2/client/status-tables', {
	data: {
		opts: {table: 'table6'},
		start: 0,
		pageSize: -1,
		filters: [],
		sorts: [],
	},
});
tdarrLogger.child({count: failedHealthChecksResult.data.totalCount}).info('Failed health checks count');
if (failedHealthChecksResult.data.totalCount === 0) {
	tdarrLogger.info('No failed health checks, nothing to do.');
	process.exit(0);
}

const failedHealthChecks = failedHealthChecksResult.data.array;
for (const failedHealthCheck of failedHealthChecks) {
	const failedFile = failedHealthCheck.file;
	logger.child({failedFile}).info('Handling file');
}
