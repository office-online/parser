import {BlobReader, ZipReader} from "@zip.js/zip.js";

// Document Parser
export function parseAsync(data: Blob) {
	// Creates a BlobReader object used to read `zipFileBlob`.
	const zipFileReader = new BlobReader(data);
	return zipFileReader;
}
