import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
    size?: 'small' | 'large';
}

export function LoadingSpinner({ size = 'small' }: LoadingSpinnerProps) {
    return (
        <span 
            className={`${styles.spinner} ${size === 'large' ? styles.large : ''}`}
        />
    );
}
