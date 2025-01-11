/* eslint-disable @typescript-eslint/naming-convention */

/* eslint-disable n/prefer-global/process */
/* eslint-disable unicorn/no-process-exit */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {tdarrUrl, radarrUrl, sonarrUrl} from './environment';
import {getFailedHealthChecks, tdarrAxios} from './tdarr';
import {getRadarrMovieId as getRadarrMovie} from './radarr';
import logger from './logger';
import {getSonarrSeriesId as getSonarrSeries} from './sonarr';

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

logger.child({count: failedFiles.totalCount}).info('Got failed health checks from Tdarr, going over them...');
for (const failedFile of failedFiles.array) {
	if (!failedFile.meta) {
		logger.child({file: failedFile.file}).warn('Failed file does not have metadata, skipping...');
		continue;
	}

	const {FileName} = failedFile.meta;
	const movie = await getRadarrMovie(failedFile);
	const series = await getSonarrSeries(failedFile);

	if (movie?.id) {
		logger.child({FileName, radarrId: movie.id}).info('Found file in Radarr');
	} else if (series?.id) {
		logger.child({FileName, sonarrId: series.id}).info('Found file in Sonarr');
	} else {
		logger.child({FileName}).warn('Movie not found in Radarr or Sonarr, skipping...');
	}
}

logger.info('Finished');
