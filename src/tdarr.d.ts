export type TdarrResponse<T> = {
	array: T[];
	totalCount: number;
};

export type TdarrHealthcheckRecord = {
	file: string;
	meta?: {
		FileName: string;
		Directory: string;
		FileType: string;
		FileTypeExtension: string;
	};
	HealthCheck: 'Error' | 'Success';
	fileMedium: 'video' | 'audio' | 'image' | 'other';
	video_codec_name: string;
	audio_codec_name: string;
	video_resolution: string;
};
export type TdarrHealthcheckResponse = TdarrResponse<TdarrHealthcheckRecord>;

export type TdarrTranscodeRecord = {
	DB: string;
	_id: string;
	file: string;
	footprintId: string;
	hasClosedCaptions: boolean;
	container: string;
	scannerReads: {
		ffProbeRead: string;
	};
	ffProbeData: {
		format: Record<string, unknown>;
		streams: Array<Record<string, unknown>>;
	};
	file_size: number;
	video_resolution: string;
	fileMedium: string;
	video_codec_name: string;
	audio_codec_name: string;
	lastPluginDetails: string;
	createdAt: number;
	bit_rate: number;
	duration: number;
	statSync: {
		ctimeMs: number;
		mtimeMs: number;
	};
	HealthCheck: string;
	TranscodeDecisionMaker: string;
	lastHealthCheckDate: number;
	holdUntil: number;
	lastTranscodeDate: number;
	bumped: boolean;
	history: string;
	oldSize: number;
	newSize: number;
	newVsOldRatio: number;
	videoStreamIndex: number;
	fileNameWithoutExtension: string;
};
export type TdarrTranscodeResponse = TdarrResponse<TdarrTranscodeRecord>;
