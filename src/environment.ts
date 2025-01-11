/* eslint-disable n/prefer-global/process */
import _ from 'lodash';

/** Logger */
export const logLevel = process.env.LOG_LEVEL ?? 'info';

/** Media */
export const sonarrUrl = process.env.SONARR_URL ?? 'http://sonarr:8989';
export const radarrUrl = process.env.RADARR_URL ?? 'http://radarr:7878';
export const tdarrUrl = process.env.TDARR_URL ?? 'http://tdarr:8265';
export const sonarrApiKey = _.toString(process.env.SONARR_API_KEY);
export const radarrApiKey = _.toString(process.env.RADARR_API_KEY);
