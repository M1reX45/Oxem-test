import { FC } from 'react';
import styles from './Summary.module.scss';

interface SummaryProps {
	title: string;
	children: string;
}

export const Summary: FC<SummaryProps> = ({ title, children }) => {
	const amount = Math.round(Number(children));

	return (
		<div className={styles.summary}>
			<div className={styles.title}>
				<span>{title}</span>
			</div>
			<div className={styles.amount}>
				<span>{amount > 0 ? amount.toLocaleString('ru') : '0'}</span>
				<span className={styles.rub}> ₽</span>
			</div>
		</div>
	);
};
