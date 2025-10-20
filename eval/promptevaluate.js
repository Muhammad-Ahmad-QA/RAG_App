import { runRAG } from "../rag/ragRunner.js";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatFireworks } from "@langchain/community/chat_models/fireworks";
import 'dotenv/config';

const model = new ChatFireworks({
  apiKey: process.env.FIREWORKS_API_KEY,
  modelName: "accounts/fireworks/models/mixtral-8x22b-instruct",
});

const prompt = ChatPromptTemplate.fromTemplate(`
You are evaluating a RAG chatbot's response.
Given the context retrieved from documents, assess how well the answer is grounded in that context.
Context: {context}
Question: {question}
Answer: {answer}
Rate the grounding from 1 to 5 and explain your reasoning.
`);

const chain = prompt.pipe(model);

const questions = [
  "How many PTO days do I get?",
  "Can I take Special Occasion Leave for my cousin’s wedding?",
  "Can I carry forward unused sick leave?",
  "How do I apply for leave?",
];

for (const question of questions) {
  const { answer, context } = await runRAG(question);

  const result = await chain.invoke({ question, answer, context });

  console.log(`\n📘 Question: ${question}`);
  console.log(`💬 Answer: ${answer}`);
  console.log(`📎 Context Evaluation:\n${result.content}`);
}