/**
 * Erro "esperado": mensagem segura para mostrar ao usuário (ex.: "Categoria
 * não encontrada"). Qualquer outro erro (Prisma, rede, etc.) NUNCA deve
 * chegar ao cliente com sua mensagem original — ver docs/security.md,
 * seção "Erros".
 */
export class AppError extends Error {}
