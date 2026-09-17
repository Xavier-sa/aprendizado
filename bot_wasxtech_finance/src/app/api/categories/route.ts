import { NextResponse } from "next/server";
import { categoryRepository } from "@/repositories/category.repository";

export async function GET() {
  const categories = await categoryRepository.findAll();
  return NextResponse.json({ categories });
}
