declare module "pdf-parse" {
  interface PdfData {
    text: string;
    numpages?: number;
  }

  type PdfParser = (buffer: Buffer) => Promise<PdfData>;
  const pdfParse: PdfParser;
  export default pdfParse;
}
