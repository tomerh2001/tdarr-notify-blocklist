/* eslint-disable n/prefer-global/process */
import _ from 'lodash';

const environment = {
	sonarrUrl: process.env.SONARR_URL ?? 'http://sonarr:8989',
	radarrUrl: process.env.RADARR_URL ?? 'http://radarr:7878',
	tdarrUrl: process.env.TDARR_URL ?? 'http://tdarr:8265',
	sonarrApiKey: _.toString(process.env.SONARR_API_KEY),
	radarrApiKey: _.toString(process.env.RADARR_API_KEY),
	tdarrApiKey: _.toString(process.env.TDARR_API_KEY),
};
export default environment;
