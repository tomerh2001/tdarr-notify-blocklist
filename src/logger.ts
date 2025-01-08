import pino from 'pino';

const logger = pino({
	transport: {target: 'pino-pretty'},
	redact: ['environment.sonarrApiKey', 'environment.radarrApiKey', 'environment.tdarrApiKey'],
});
export default logger;
