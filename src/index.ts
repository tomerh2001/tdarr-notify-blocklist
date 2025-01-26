/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable n/prefer-global/process */
/* eslint-disable unicorn/no-process-exit */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import _ from 'lodash';
import {tdarrUrl, radarrUrl, sonarrUrl} from './environment';
import {getFailedHealthChecks, getFailedTranscodes, tdarrAxios} from './tdarr';
import {getRadarrMovieId as getRadarrMovie} from './radarr';
import logger from './logger';
import {getSonarrSeriesId as getSonarrSeries} from './sonarr';

logger.child({tdarrUrl, radarrUrl, sonarrUrl}).info('Started');

const statusResult = await tdarrAxios('/api/v2/status');
logger.child({statusResult: statusResult.data}).debug('Tdarr status');
if (statusResult.data.status !== 'good') {
	throw new Error('Tdarr\'s status is not good, cannot continue.');
}

const transcodes = await getFailedTranscodes();
logger.child({count: transcodes.totalCount}).info('Got failed transcodes from Tdarr');

const healthchecks = await getFailedHealthChecks();
logger.child({count: healthchecks.totalCount}).info('Got failed health checks from Tdarr');

if (_.isEmpty(healthchecks)) {
	logger.info('No failed health checks...');
	process.exit(0);
}

for (const record of healthchecks.array) {
	if (!record.meta) {
		logger.child({file: record.file}).warn('No meta data, skipping...');
		continue;
	}

	const {FileName} = record.meta;
	const movie = await getRadarrMovie(record);
	const series = await getSonarrSeries(record);

	if (movie?.id) {
		logger.child({FileName, radarrId: movie.id}).info('File found in Radarr');
	} else if (series?.id) {
		logger.child({FileName, sonarrId: series.id}).info('File found in Sonarr');
	} else {
		logger.child({FileName}).warn('File not found in Radarr or Sonarr, skipping...');
	}
}

logger.info('Finished');
