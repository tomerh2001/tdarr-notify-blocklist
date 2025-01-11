/* eslint-disable @typescript-eslint/naming-convention */

import axios from 'axios';
import {sonarrApiKey, sonarrUrl} from './environment';

export const sonarrAxios = axios.create({baseURL: sonarrUrl});
sonarrAxios.interceptors.request.use(config => {
	config.params ||= {};
	config.params.apikey = sonarrApiKey;
	return config;
});
