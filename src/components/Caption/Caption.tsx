import { FC } from 'react';
import styles from './Caption.module.scss';

interface CaptionProps {
	captionStyle: string;
	children?: string;
}

export const Caption: FC<CaptionProps> = ({ captionStyle, children }) => {
	return (
		<div
			className={
				captionStyle === 'initialFee'
					? styles.caption + ' ' + styles.captionPercent
					: styles.caption
			}
		>
			{children !== '' && Number(children).toFixed(0)}
			{captionStyle === 'carPrice' && '₽'}
			{captionStyle === 'initialFee' && '%'}
			{captionStyle === 'leasingPeriod' && 'мес.'}
		</div>
	);
};
