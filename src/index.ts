
/* eslint-disable n/prefer-global/process */
/* eslint-disable unicorn/no-process-exit */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {tdarrUrl, radarrUrl, sonarrUrl} from './environment';
import {getFailedHealthChecks, tdarrAxios} from './tdarr';
import {getRadarrMovieId} from './radarr';
import logger from './logger';
import {parseMoviePath} from './utils';

logger.child({tdarrUrl, radarrUrl, sonarrUrl}).info('Started');

const statusResult = await tdarrAxios('/api/v2/status');
logger.child({statusResult: statusResult.data}).debug('Tdarr status');
if (statusResult.data.status !== 'good') {
	throw new Error('Tdarr\'s status is not good, cannot continue.');
}

const failedFiles = await getFailedHealthChecks();
if (failedFiles.totalCount === 0) {
	logger.info('No failed health checks, nothing to do.');
	process.exit(0);
}

logger.child({count: failedFiles.totalCount}).info('Got the failed health checks from Tdarr, going over them...');
for (const failedFile of failedFiles.array) {
	const {directory, filename} = parseMoviePath(failedFile.file);
	if (!directory.includes('Movies')) {
		continue;
	}

	logger.child({filename}).info('Searching for movie in Radarr');
	const radarrId = await getRadarrMovieId(failedFile.file);
	if (radarrId) { /** Radarr Flow */
		logger.child({filename, radarrId}).info('Found movie in Radarr');
	} else { /** Sonarr Flow */
	}
}
