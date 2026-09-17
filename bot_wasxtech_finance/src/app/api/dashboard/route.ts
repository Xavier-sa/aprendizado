import { dashboardController } from "@/controllers/dashboard.controller";

export async function GET() {
  return dashboardController.get();
}
