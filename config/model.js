import { ChatFireworks } from "@langchain/community/chat_models/fireworks";
import 'dotenv/config';

export const chatModel = new ChatFireworks({
    modelName: "accounts/fireworks/models/mixtral-8x22b-instruct",
    fireworksApiKey: process.env.FIREWORKS_API_KEY,
});