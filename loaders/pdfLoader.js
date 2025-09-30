import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function loadAndSplitDocs() {
  const loader = new PDFLoader("documents/Emumba-Leave-Policy.pdf");
  const docs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 50 });
  return await splitter.splitDocuments(docs);
}