import pino from 'pino';
import {logLevel} from './environment';

const logger = pino({
	level: logLevel,
	transport: {target: 'pino-pretty'},
	redact: ['environment.sonarrApiKey', 'environment.radarrApiKey', 'environment.tdarrApiKey'],
});

export default logger;
