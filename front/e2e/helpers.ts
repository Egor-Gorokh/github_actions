import { request, type APIRequestContext } from '@playwright/test';

const API = process.env.E2E_API_URL ?? 'http://localhost:3000';

const E2E_RESET_TOKEN = 'e2e-reset-course-DevOps-2026';

export async function resetTodos(api?: APIRequestContext) {
  const ctx = api ?? (await request.newContext());
  const res = await ctx.post(`${API}/test/reset`, {
    headers: { 'x-e2e-reset-token': E2E_RESET_TOKEN },
  });
  if (!res.ok()) {
    throw new Error(`Reset failed: ${res.status()} ${res.statusText()}`);
  }
  if (!api) await ctx.dispose();
}

export async function createTodoViaApi(
  title: string,
  description?: string,
): Promise<{ id: string; title: string; description: string | null }> {
  const ctx = await request.newContext();
  const res = await ctx.post(`${API}/todos`, {
    data: { title, ...(description ? { description } : {}) },
  });
  if (!res.ok()) {
    throw new Error(`Create failed: ${res.status()}`);
  }
  const todo = await res.json();
  await ctx.dispose();
  return todo;
}
