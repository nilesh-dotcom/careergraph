// Server-side PDF text extraction
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // Dynamic import since pdf-parse is server-only
  const pdfParse = (await import("pdf-parse")).default;
  const data = await pdfParse(buffer);
  return data.text;
}

export async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  // For DOCX, we extract text from the XML content
  const JSZip = (await import("jszip")).default;
  const zip = await JSZip.loadAsync(buffer);

  const docXml = await zip.file("word/document.xml")?.async("text");
  if (!docXml) {
    throw new Error("Invalid DOCX file - no document.xml found");
  }

  // Strip XML tags to get plain text
  const text = docXml
    .replace(/<\/w:p>/g, "\n") // paragraph breaks
    .replace(/<\/w:r>/g, " ") // run breaks
    .replace(/<[^>]+>/g, "") // strip all XML tags
    .replace(/\s+/g, " ") // normalize whitespace
    .trim();

  return text;
}
