import { FireworksEmbeddings } from "@langchain/community/embeddings/fireworks";
import 'dotenv/config';

export const embeddings = new FireworksEmbeddings({
  apiKey: process.env.FIREWORKS_API_KEY,
});