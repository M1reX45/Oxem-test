import { ChangeEvent, FC, useContext } from 'react';
import { AppContext } from 'store';
import styles from './Slider.module.scss';

interface SliderProps {
	value: string;
	min: string;
	max: string;
	step?: string;
	onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Slider: FC<SliderProps> = ({
	value,
	min,
	max,
	step,
	onChangeHandler,
}) => {
	const { isLoading } = useContext(AppContext);

	return (
		<div className={styles.slider}>
			<input
				disabled={isLoading}
				type={'range'}
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChangeHandler(e)}
			/>
		</div>
	);
};
