import { transactionController } from "@/controllers/transaction.controller";

export async function GET(request: Request) {
  return transactionController.list(request);
}

export async function POST(request: Request) {
  return transactionController.create(request);
}
