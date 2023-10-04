import Prompt from "@models/prompt";
import { connectDatabase } from "@utils/database";

export const POST = async req => {
  const { userId, prompt, tag } = await req.json();
  try {
    connectDatabase();

    let newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    newPrompt = await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    new Response("Failed to create Prompt", { status: 500 });
  }
};
