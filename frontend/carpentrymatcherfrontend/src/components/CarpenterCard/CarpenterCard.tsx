import type { Carpenter } from '../../types';
import styles from './CarpenterCard.module.css';

interface CarpenterCardProps {
    carpenter: Carpenter;
}

export function CarpenterCard({ carpenter }: CarpenterCardProps) {
    const { name, city, phone, website, specialties, rating } = carpenter;

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3>{name}</h3>
                {rating && <span className={styles.rating}>⭐ {rating}</span>}
            </div>
            
            <p className={styles.info}>📍 {city}</p>
            <p className={styles.info}>📞 {phone}</p>
            
            {website && (
                <p className={styles.info}>
                    🌐{" "}
                    <a href={website} target="_blank" rel="noreferrer">
                        {website}
                    </a>
                </p>
            )}
            
            {specialties && specialties.length > 0 && (
                <div className={styles.specialties}>
                    {specialties.map((specialty, index) => (
                        <span key={index} className={styles.tag}>
                            {specialty}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
