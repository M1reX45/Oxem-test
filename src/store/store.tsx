import {
	createContext,
	useState,
	FC,
	ReactNode,
	Dispatch,
	SetStateAction,
} from 'react';
import { summary, formData } from '../types';

interface context {
	summary: summary;
	formData: formData;
	isLoading: boolean;
	setSummary: Dispatch<SetStateAction<summary>>;
	setFormData: Dispatch<SetStateAction<formData>>;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface storeProvider {
	children: ReactNode;
}

export const AppContext = createContext({} as context);

export const StoreProvider: FC<storeProvider> = ({ children }) => {
	const [formData, setFormData] = useState<formData>({
		carPrice: '3300000',
		initialFee: '429000',
		initialFeePercent: '13',
		leasingPeriod: '60',
	});
	const [summary, setSummary] = useState({} as summary);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<AppContext.Provider
			value={{
				formData,
				isLoading,
				summary,
				setSummary,
				setFormData,
				setIsLoading,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
