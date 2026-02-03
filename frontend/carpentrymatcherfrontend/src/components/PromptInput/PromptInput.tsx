import { useEffect, useRef } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';
import styles from './PromptInput.module.css';

interface PromptInputProps {
    query: string;
    city: string;
    loading: boolean;
    error: string | null;
    onQueryChange: (value: string) => void;
    onCityChange: (value: string) => void;
    onSubmit: () => void;
}

export function PromptInput({
    query,
    city,
    loading,
    error,
    onQueryChange,
    onCityChange,
    onSubmit,
}: PromptInputProps) {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    // Auto-resize textarea
    const handleResizeTextArea = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 200)}px`;
        }
    };

    // Handle Enter key to submit
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (query.trim()) {
                onSubmit();
            }
        }
    };

    // Auto-resize on input change
    useEffect(() => {
        handleResizeTextArea();
    }, [query]);

    // Focus textarea on mount
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, []);

    return (
        <div className={styles.container}>
            <textarea
                ref={textAreaRef}
                className={styles.textarea}
                placeholder="Describe what you need done... (e.g. I want to build a wooden terrace ca. 20 m²)"
                rows={1}
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <div className={styles.actions}>
                <input
                    className={styles.cityInput}
                    value={city}
                    onChange={(e) => onCityChange(e.target.value)}
                    placeholder="City / Postcode"
                />

                <button
                    className={styles.sendButton}
                    onClick={onSubmit}
                    disabled={loading || !query.trim()}
                    aria-label="Search"
                >
                    {loading ? (
                        <LoadingSpinner size="small" />
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    )}
                </button>
            </div>

            {error && (
                <p className={styles.error}>Error: {error}</p>
            )}
        </div>
    );
}
