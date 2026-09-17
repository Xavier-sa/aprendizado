import { NextResponse } from "next/server";
import { categoryRepository } from "@/repositories/category.repository";
import { getUserId } from "@/lib/session";

export async function GET(request: Request) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
  try {
    const categories = await categoryRepository.findAll(userId);
    return NextResponse.json({ categories });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro inesperado" }, { status: 500 });
  }
}
