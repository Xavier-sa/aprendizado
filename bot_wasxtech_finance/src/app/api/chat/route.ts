import { chatController } from "@/controllers/chat.controller";

export async function POST(request: Request) {
  return chatController.post(request);
}
