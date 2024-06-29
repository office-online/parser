import {BlobReader, TextWriter, ZipReader} from "@zip.js/zip.js";
import {parseDocument, DomHandler} from "htmlparser2";

// Document Parser
export async function parseAsync(data: Blob) {
    // Creates a BlobReader object used to read `zipFileBlob`.
    const blobReader = new BlobReader(data);
    // Creates a ZipReader object reading the zip content via `blobReader`
    const zipReader = new ZipReader(blobReader);
    // get all entries from the zip
    const entries = await zipReader.getEntries();
    for (const entry of entries) {
        let entryWriter = new TextWriter();
        let text = await entry.getData(entryWriter);
        let $ = parseDocument(text, {xmlMode: true});
        console.dir($);
    }
    // close the ZipReader
    await zipReader.close();

    return entries;
}
