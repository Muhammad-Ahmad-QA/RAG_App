import readline from 'readline';
import { createRAGChain } from "./rag/ragChain.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Ask your leave policy question: ", async (userInput) => {
  const chain = await createRAGChain();
  const response = await chain.invoke({ input: userInput });
  console.log("Bot:", response.answer);
  rl.close();
})