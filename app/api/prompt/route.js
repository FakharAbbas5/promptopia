import Prompt from "@models/prompt";
import { connectDatabase } from "@utils/database";

export const GET = async () => {
  try {
    await connectDatabase();
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    new Response("Failed to fetch prompts!", { status: 500 });
  }
};
