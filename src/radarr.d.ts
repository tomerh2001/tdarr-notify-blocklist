export type RadarrMovieRecord = {
	id: number;
	folderName: string;
	path: string;
	imdbId: string;
	hasFile: boolean;
	movieFileId: number;
	movieFile?: {
		id: number;
		movieId: number;
		originalFilePath: string;
		path: string;
		relativePath: string;
		releaseGroup: string;
	};
};
