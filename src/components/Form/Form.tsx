import { ChangeEvent, FC, FocusEvent, useContext, useEffect } from 'react';
import { FormField } from 'components';
import {
	getInitialFee,
	getInitialFeePercent,
	getMinMaxValue,
	getOnlyNumbers,
} from 'utils';
import { data, rate } from 'data';
import { AppContext } from 'store';
import styles from './Form.module.scss';

export const Form: FC = () => {
	const { formData, setFormData, setSummary } = useContext(AppContext);

	useEffect(() => {
		const monthPayment =
			(+formData.carPrice - +formData.initialFee) *
			((rate * Math.pow(1 + rate, +formData.leasingPeriod)) /
				(Math.pow(1 + rate, +formData.leasingPeriod) - 1));
		const contractPrice =
			+formData.initialFee + +formData.leasingPeriod * monthPayment;
		setSummary({
			contractPrice: String(contractPrice.toFixed(0)),
			monthPayment: String(monthPayment.toFixed(0)),
		});
		return;
	}, [formData, setSummary]);

	const onCarPriceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const { initialFeePercent } = formData;
		const carPrice = getOnlyNumbers(value);
		const initialFee = getInitialFee(carPrice, initialFeePercent);
		setFormData((prev) => ({
			...prev,
			carPrice,
			initialFee,
		}));
	};

	const onInitialFeeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const { carPrice } = formData;
		const initialFee = getOnlyNumbers(value);
		const initialFeePercent = getInitialFeePercent(carPrice, initialFee);
		setFormData((prev) => ({
			...prev,
			initialFee,
			initialFeePercent,
		}));
	};

	const onInitialFeePercentChangeHandler = (
		e: ChangeEvent<HTMLInputElement>
	) => {
		const { value: initialFeePercent } = e.target;
		const initialFee = getInitialFee(formData.carPrice, initialFeePercent);
		setFormData((prev) => ({
			...prev,
			initialFee,
			initialFeePercent,
		}));
	};

	const onLeasingPeriodChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const leasingPeriod = getOnlyNumbers(value);
		setFormData((prev) => ({
			...prev,
			leasingPeriod,
		}));
	};

	const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		const min = data[name as keyof typeof data].min;
		const max = data[name as keyof typeof data].max;
		const formattedValue = getOnlyNumbers(value);
		if (name === 'carPrice') {
			const carPrice = getMinMaxValue(min, max, formattedValue);
			const initialFee = getInitialFee(
				carPrice,
				formData.initialFeePercent
			);
			setFormData((prev) => ({ ...prev, carPrice, initialFee }));
		}
		if (name === 'initialFee') {
			const initialFeePercent = getMinMaxValue(
				min,
				max,
				formData.initialFeePercent
			);
			const initialFee = getInitialFee(
				formData.carPrice,
				initialFeePercent
			);
			setFormData((prev) => ({ ...prev, initialFee, initialFeePercent }));
		}
		if (name === 'leasingPeriod') {
			const leasingPeriod = getMinMaxValue(min, max, formattedValue);
			setFormData((prev) => ({ ...prev, leasingPeriod }));
		}
	};

	return (
		<form className={styles.form}>
			<FormField
				id={data.carPrice.id}
				name={data.carPrice.name}
				label={data.carPrice.description}
				textFieldValue={formData.carPrice}
				sliderValue={formData.carPrice}
				sliderValueMin={data.carPrice.min}
				sliderValueMax={data.carPrice.max}
				sliderStep={'1000'}
				onChangeTextFieldHandler={onCarPriceChangeHandler}
				onBlurHandler={onBlurHandler}
			/>
			<FormField
				id={data.initialFee.id}
				name={data.initialFee.name}
				label={data.initialFee.description}
				textFieldValue={formData.initialFee}
				sliderValue={formData.initialFeePercent}
				sliderValueMin={data.initialFee.min}
				sliderValueMax={data.initialFee.max}
				onChangeTextFieldHandler={onInitialFeeChangeHandler}
				onChangeSliderHandler={onInitialFeePercentChangeHandler}
				onBlurHandler={onBlurHandler}
			/>
			<FormField
				id={data.leasingPeriod.id}
				name={data.leasingPeriod.name}
				label={data.leasingPeriod.description}
				textFieldValue={formData.leasingPeriod}
				sliderValue={formData.leasingPeriod}
				sliderValueMin={data.leasingPeriod.min}
				sliderValueMax={data.leasingPeriod.max}
				onChangeTextFieldHandler={onLeasingPeriodChangeHandler}
				onBlurHandler={onBlurHandler}
			/>
		</form>
	);
};
