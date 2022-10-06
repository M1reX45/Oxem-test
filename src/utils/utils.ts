export const getOnlyNumbers = (text: string) => {
	return text.replace(/\D/g, '');
};

export const getMinMaxValue = (min: string, max: string, value: string) => {
	if (+value < +min) return min;
	if (+value > +max) return max;
	return value;
};

export const getInitialFee = (carPrice: string, initialFeePercent: string) => {
	return String(Math.round((+initialFeePercent * +carPrice) / 100));
};

export const getInitialFeePercent = (carPrice: string, initialFee: string) => {
	return String((+initialFee / +carPrice) * 100);
};
