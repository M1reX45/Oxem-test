import { ChangeEvent, FocusEvent, FC, useState, useContext } from 'react';
import { Caption } from 'components/Caption';
import { AppContext } from 'store';
import styles from './TextField.module.scss';

interface TextFieldProps {
	id: string;
	name: string;
	label: string;
	value: string;
	captionValue?: string;
	onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
	onBlurHandler: (e: FocusEvent<HTMLInputElement>) => void;
}

export const TextField: FC<TextFieldProps> = ({
	id,
	name,
	label,
	value,
	captionValue,
	onChangeHandler,
	onBlurHandler,
}) => {
	const [isActive, setIsActive] = useState(false);
	const { isLoading } = useContext(AppContext);

	return (
		<>
			<div className={styles.label}>
				<label htmlFor={id}>{label}</label>
			</div>
			<div
				className={
					styles.container + ` ${isActive ? styles.active : ''}`
				}
			>
				<input
					disabled={isLoading}
					id={id}
					name={name}
					type={'text'}
					maxLength={9}
					value={Number(value).toLocaleString('ru')}
					onChange={(e) => onChangeHandler(e)}
					onBlur={(e) => {
						setIsActive(false);
						onBlurHandler(e);
					}}
					className={styles.input}
					onFocus={() => setIsActive(true)}
				/>
				<Caption captionStyle={name}>
					{name === 'initialFee' ? captionValue : ''}
				</Caption>
			</div>
		</>
	);
};
