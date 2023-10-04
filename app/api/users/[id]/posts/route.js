import Prompt from "@models/prompt";
import { connectDatabase } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectDatabase();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
