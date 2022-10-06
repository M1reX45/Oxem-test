import { useContext } from 'react';
import axios from 'axios';
import { Button, Form, Title, Summary, Loader } from 'components';
import { AppContext } from 'store';
import styles from './LeasingPage.module.scss';

export const LeasingPage = () => {
	const { summary, formData, isLoading, setIsLoading } =
		useContext(AppContext);

	const onSubmitHandler = async () => {
		setIsLoading(true);
		try {
			const { data } = await axios.post(
				'https://hookb.in/eK160jgYJ6UlaRPldJ1P',
				{
					...summary,
					...formData,
				}
			);
			if (data.success === true) {
				setIsLoading(false);
				alert('Заявка отправлена!');
			}
		} catch {
			alert('Что-то пошло не так... Попробуйте позже!');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.wrapper}>
			<header>
				<Title>Рассчитайте стоимость автомобиля в лизинг</Title>
			</header>
			<div className={styles.body}>
				<Form />
			</div>
			<footer>
				<div className={styles.summaryContainer}>
					<Summary title='Сумма договора лизинга'>
						{summary.contractPrice}
					</Summary>
					<Summary title='Ежемесячный платеж от'>
						{summary.monthPayment}
					</Summary>
				</div>
				<Button onClickHandler={onSubmitHandler}>
					{!isLoading ? 'Оставить заявку' : <Loader />}
				</Button>
			</footer>
		</div>
	);
};
