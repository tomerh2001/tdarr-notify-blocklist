
/* eslint-disable n/prefer-global/process */
/* eslint-disable unicorn/no-process-exit */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {tdarrUrl, radarrUrl, sonarrUrl} from './environment';
import {getFailedHealthChecks, tdarrAxios, tdarrLogger} from './tdarr';
import {getRadarrMovieId, radarrLogger} from './radarr';
import logger from './logger';
import {parseMoviePath} from './utils';

logger.child({tdarrUrl, radarrUrl, sonarrUrl}).info('Started');

const statusResult = await tdarrAxios('/api/v2/status');
tdarrLogger.child({statusResult: statusResult.data}).debug('Tdarr status');
if (statusResult.data.status !== 'good') {
	throw new Error('Tdarr\'s status is not good, cannot continue.');
}

const failedFiles = await getFailedHealthChecks();
if (failedFiles.totalCount === 0) {
	tdarrLogger.info('No failed health checks, nothing to do.');
	process.exit(0);
}

tdarrLogger.child({count: failedFiles.totalCount}).info('Retrieved failed health checks from Tdarr');

for (const failedFile of failedFiles.array) {
	const {directory, filename} = parseMoviePath(failedFile.file);
	if (!directory.includes('Movies')) {
		continue;
	}

	logger.child({filename}).debug('Getting radarr movie');
	const radarrId = await getRadarrMovieId(failedFile.file);
	radarrLogger.child({filename, id: radarrId}).debug('Radarr movie');
	break;
}
