export type TdarrHealthcheckResponse = {
	array: TdarrHealthcheckRecord[];
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
