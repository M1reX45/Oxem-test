import { ChangeEvent, FC, FocusEvent, useContext } from 'react';
import { Slider, TextField } from 'components';
import styles from './FormField.module.scss';
import { AppContext } from 'store';

interface FormFieldProps {
	id: string;
	name: string;
	label: string;
	textFieldValue: string;
	sliderValue: string;
	sliderValueMin: string;
	sliderValueMax: string;
	sliderStep?: string;
	caption?: string;
	onChangeTextFieldHandler: (e: ChangeEvent<HTMLInputElement>) => void;
	onChangeSliderHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlurHandler: (e: FocusEvent<HTMLInputElement>) => void;
}

export const FormField: FC<FormFieldProps> = ({
	id,
	name,
	label,
	textFieldValue,
	sliderValue,
	sliderValueMin,
	sliderValueMax,
	sliderStep,
	caption,
	onChangeTextFieldHandler,
	onChangeSliderHandler,
	onBlurHandler,
}) => {
	const { isLoading } = useContext(AppContext);

	return (
		<div
			className={
				styles.formField + ` ${isLoading ? styles.disabled : ''}`
			}
		>
			<TextField
				id={id}
				name={name}
				label={label}
				value={textFieldValue}
				captionValue={sliderValue}
				onChangeHandler={onChangeTextFieldHandler}
				onBlurHandler={onBlurHandler}
			/>
			<Slider
				value={sliderValue}
				min={sliderValueMin}
				max={sliderValueMax}
				step={sliderStep}
				onChangeHandler={
					onChangeSliderHandler ?? onChangeTextFieldHandler
				}
			/>
		</div>
	);
};
