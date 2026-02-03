import type { Carpenter } from '../types';

const API_BASE_URL = "http://localhost:5000";

export async function fetchCarpenters(query: string, city: string): Promise<Carpenter[]> {
    const params = new URLSearchParams();
    if (query.trim()) params.append("query", query.trim());
    if (city.trim()) params.append("city", city.trim());

    const res = await fetch(
        `${API_BASE_URL}/api/carpenters${params.toString() ? `?${params.toString()}` : ""}`
    );

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }

    return (await res.json()) as Carpenter[];
}
