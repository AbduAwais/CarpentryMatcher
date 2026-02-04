import '../../App.css';
import type { Carpenter } from "../../types";
import { useEffect, useState } from "react";
import { Header, PromptInput, ResultsSection } from '../../components';
import { fetchCarpenters as fetchCarpentersApi } from '../../services';
import styles from './PromptPage.module.css';
export default PromptPage;

function PromptPage() {
    const [carpenters, setCarpenters] = useState<Carpenter[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [city, setCity] = useState("");

    const handleFetchCarpenters = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchCarpentersApi(query, city);
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
        void handleFetchCarpenters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header />

            <div className={styles.container}>
                <p className={styles.subtitle}>What carpentry work do you need done?</p>

                <PromptInput
                    query={query}
                    city={city}
                    loading={loading}
                    error={error}
                    onQueryChange={setQuery}
                    onCityChange={setCity}
                    onSubmit={() => void handleFetchCarpenters()}
                />

                <ResultsSection carpenters={carpenters} loading={loading} />
            </div>
        </>
    );
}

