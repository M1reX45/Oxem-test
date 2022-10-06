import { FC, ReactNode, useContext } from 'react';
import { AppContext } from 'store';
import styles from './Button.module.scss';

interface ButtonProps {
	children: ReactNode;
	onClickHandler: () => void;
}

export const Button: FC<ButtonProps> = ({ onClickHandler, children }) => {
	const { isLoading } = useContext(AppContext);

	return (
		<button
			disabled={isLoading}
			className={styles.button + ` ${isLoading ? styles.disabled : ''}`}
			onClick={() => onClickHandler()}
		>
			{children}
		</button>
	);
};
