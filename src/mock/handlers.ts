import { delay, http, HttpResponse } from "msw";

export const handlers = [
    // Example: GET /api/user
    http.get("https://jsonplaceholder.typicode.com/todos", async () => {
        await delay(3000);
        const mockTodos = Array.from({ length: 10 }).map((_, i) => ({
            id: i + 1,
            title: `Todo ${i + 1}`,
            completed: false,
        }));
        return HttpResponse.json(mockTodos);
    }),

    // Example: POST /api/login
    http.post("/api/login", async ({ request }) => {
        const { username }: any = await request.json();
        return HttpResponse.json({ message: `Welcome ${username}!` });
    }),
];
