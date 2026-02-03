import type { Carpenter } from '../../types';
import { CarpenterCard } from '../CarpenterCard';
import { LoadingSpinner } from '../LoadingSpinner';
import styles from './ResultsSection.module.css';

interface ResultsSectionProps {
    carpenters: Carpenter[];
    loading: boolean;
}

export function ResultsSection({ carpenters, loading }: ResultsSectionProps) {
    return (
        <section className={styles.section}>
            <h2>
                Results 
                {carpenters.length > 0 && (
                    <span className={styles.count}>({carpenters.length})</span>
                )}
            </h2>

            {loading && carpenters.length === 0 && (
                <div className={styles.loadingState}>
                    <LoadingSpinner size="large" />
                    <p>Searching for carpenters...</p>
                </div>
            )}

            {carpenters.length === 0 && !loading && (
                <p className={styles.emptyState}>
                    No carpenters found. Try a different search.
                </p>
            )}

            <div className={styles.grid}>
                {carpenters.map((carpenter) => (
                    <CarpenterCard key={carpenter.id} carpenter={carpenter} />
                ))}
            </div>
        </section>
    );
}
