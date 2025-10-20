import { runRAG } from "../rag/ragRunner.js";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatFireworks } from "@langchain/community/chat_models/fireworks";
import 'dotenv/config';

const model = new ChatFireworks({
  apiKey: process.env.FIREWORKS_API_KEY,
  modelName: "accounts/fireworks/models/mixtral-8x22b-instruct",
});

const evaluatorPrompt = ChatPromptTemplate.fromTemplate(`
You are an evaluator for a RAG chatbot.
Rate the chatbot's answer based on how well it matches the reference answer.
Reference: {reference}
Question: {question}
Chatbot Answer: {answer}
Respond with a score from 1 to 5 and explain your reasoning.
`);

const chain = evaluatorPrompt.pipe(model);

const testCases = [
  {
    question: "How many PTO days do I get?",
    reference: "Paid Time Off (PTO): 15 working days/year for vacation, personal time, recharge.",
  },
  {
    question: "Can I take Special Occasion Leave for my cousin’s wedding?",
    reference: "Special Occasion Leave is for your own marriage or religious pilgrimage only.",
  },
  {
    question: "Can I carry forward unused sick leave?",
    reference: "The context provided does not explicitly mention whether or not unused sick leave can be carried forward.",
  },
  {
    question: "How do I apply for leave?",
    reference: "Use BambooHR’s Time Off Request Module. It's your one-stop shop for leave requests.",
  },
];

for (const test of testCases) {
  const { question, reference } = test;
  const { answer } = await runRAG(question);

  const result = await chain.invoke({ question, answer, reference });

  console.log(`\n🧪 Question: ${question}`);
  console.log(`💬 Answer: ${answer}`);
  console.log(`📘 Reference Evaluation:\n${result.content}`);
}