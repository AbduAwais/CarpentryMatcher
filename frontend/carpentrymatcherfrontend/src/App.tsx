import './App.css'
import type { Carpenter } from "./types.ts/Carpenter";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [carpenters, setCarpenters] = useState<Carpenter[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [query, setQuery] = useState("");
    const [city, setCity] = useState("");

    const API_BASE_URL = "http://localhost:5000";

    const fetchCarpenters = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            if (query.trim()) params.append("query", query.trim());
            if (city.trim()) params.append("city", city.trim());

            const res = await fetch(
                `${API_BASE_URL}/api/carpenters${params.toString() ? `?${params.toString()}` : ""}`
            );

            if (!res.ok) {
                throw new Error(`API error: ${res.status}`);
            }

            const data = (await res.json()) as Carpenter[];
            setCarpenters(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message ?? "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Load all carpenters on first page load
    useEffect(() => {
        fetchCarpenters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "1rem" }}>
            <h1>Carpentry Matcher</h1>
            <p>Describe your job and find local carpenters.</p>

            <div
                style={{
                    border: "1px solid #ddd",
                    padding: "1rem",
                    borderRadius: "8px",
                    marginBottom: "1.5rem",
                }}
            >
                <div style={{ marginBottom: "0.5rem" }}>
                    <label>
                        What do you need done?
                        <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            rows={3}
                            style={{ width: "100%", marginTop: "0.25rem" }}
                            placeholder="E.g. I want to build a wooden terrace ca. 20 m²"
                        />
                    </label>
                </div>

                <div style={{ marginBottom: "0.5rem" }}>
                    <label>
                        City / Postcode
                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            style={{ width: "100%", marginTop: "0.25rem" }}
                            placeholder="E.g. København, 2450, Roskilde"
                        />
                    </label>
                </div>

                <button onClick={fetchCarpenters} disabled={loading}>
                    {loading ? "Searching..." : "Find carpenters"}
                </button>

                {error && (
                    <p style={{ color: "red", marginTop: "0.5rem" }}>Error: {error}</p>
                )}
            </div>

            <h2>Results</h2>
            {loading && carpenters.length === 0 && <p>Loading carpenters...</p>}

            {carpenters.length === 0 && !loading && <p>No carpenters found.</p>}

            <div>
                {carpenters.map((c) => (
                    <div
                        key={c.id}
                        style={{
                            border: "1px solid #eee",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            marginBottom: "0.75rem",
                        }}
                    >
                        <h3 style={{ margin: 0 }}>{c.name}</h3>
                        <p style={{ margin: "0.25rem 0" }}>{c.city}</p>
                        <p style={{ margin: "0.25rem 0" }}>📞 {c.phone}</p>
                        {c.website && (
                            <p style={{ margin: "0.25rem 0" }}>
                                🌐{" "}
                                <a href={c.website} target="_blank" rel="noreferrer">
                                    {c.website}
                                </a>
                            </p>
                        )}
                        {c.specialties?.length > 0 && (
                            <p style={{ margin: "0.25rem 0" }}>
                                Specialties: {c.specialties.join(", ")}
                            </p>
                        )}
                        {c.rating && <p style={{ margin: "0.25rem 0" }}>Rating: {c.rating}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
