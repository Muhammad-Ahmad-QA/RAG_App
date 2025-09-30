import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { loadAndSplitDocs } from "../loaders/pdfLoader.js";
import { chatModel } from "../config/model.js";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { embeddings } from "../config/embedding.js";

export async function createRAGChain() {
  const docs = await loadAndSplitDocs();

  const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const retriever = vectorStore.asRetriever();

const prompt = ChatPromptTemplate.fromTemplate(`
Use the following context to answer HR-related questions about Emumba's leave policy.
If the answer is not found, reply: "Sorry, I don't have that information."
Context: {context}
Question: {input}
`);

  const combineDocsChain = await createStuffDocumentsChain({
    llm: chatModel,
    prompt,
  });

  return await createRetrievalChain({
    retriever,
    combineDocsChain,
  });
}