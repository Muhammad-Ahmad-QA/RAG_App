import { createRAGChain } from "./ragChain.js";

export async function runRAG(query) {
  const chain = await createRAGChain();
  const result = await chain.invoke({ input: query });

  const context = result.context?.map(doc => doc.pageContent).join("\n") || "No context retrieved.";

  return {
    question: query,
    answer: result.answer,
    context,
  };
}