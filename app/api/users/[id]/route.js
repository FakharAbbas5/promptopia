import { connectDatabase } from "@utils/database";
import User from "@models/user";

export const GET = async (request, { params }) => {
  try {
    await connectDatabase();

    const user = await User.findById(params.id);
    if (!user) return new Response("User not found!", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response("User not found!", { status: 500 });
  }
};
