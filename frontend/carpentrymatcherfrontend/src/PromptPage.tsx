import './App.css';
import type { Carpenter } from "./types/Carpenter";
import { useEffect, useState } from "react";
import { Header, PromptInput, ResultsSection } from './components';
import styles from './PromptPage.module.css';

function PromptPage() {
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
        } catch (err: unknown) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Load all carpenters on first page load
    useEffect(() => {
        void fetchCarpenters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header />

            <div className={styles.container}>
                <p className={styles.subtitle}>Describe your job and find local carpenters</p>

                <PromptInput
                    query={query}
                    city={city}
                    loading={loading}
                    error={error}
                    onQueryChange={setQuery}
                    onCityChange={setCity}
                    onSubmit={() => void fetchCarpenters()}
                />

                <ResultsSection carpenters={carpenters} loading={loading} />
            </div>
        </>
    );
}

export default PromptPage;
