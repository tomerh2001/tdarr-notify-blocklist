export function parseMoviePath(filepath: string) {
	const parts = filepath.split('/');
	const filename = parts.pop()!;
	const directory = parts.join('/');
	return {directory, filename};
}
