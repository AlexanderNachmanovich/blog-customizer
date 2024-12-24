import { useState, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

import styles from './ArticleParamsForm.module.scss';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClick } from 'src/hooks/useOutsideClick';

interface ArticleParamsFormProps {
	isOpen: boolean;
	onToggle: () => void;
	onChangeState: (newSettings: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ isOpen, onToggle, onChangeState }: ArticleParamsFormProps) => {
	const [localState, setLocalState] = useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	useOutsideClick(formRef, onToggle);

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setLocalState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const handleReset = () => {
		setLocalState(defaultArticleState);
		onChangeState(defaultArticleState);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onChangeState(localState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={formRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
			>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						title="Шрифт"
						options={fontFamilyOptions}
						selected={localState.fontFamilyOption}
						onChange={handleOnChange('fontFamilyOption')}
					/>
					<RadioGroup
						name="fontSize"
						title="Размер шрифта"
						options={fontSizeOptions}
						selected={localState.fontSizeOption}
						onChange={handleOnChange('fontSizeOption')}
					/>
					<Select
						title="Цвет текста"
						options={fontColors}
						selected={localState.fontColor}
						onChange={handleOnChange('fontColor')}
					/>
					<Separator />
					<Select
						title="Цвет фона"
						options={backgroundColors}
						selected={localState.backgroundColor}
						onChange={handleOnChange('backgroundColor')}
					/>
					<Select
						title="Ширина контента"
						options={contentWidthArr}
						selected={localState.contentWidth}
						onChange={handleOnChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title="Сбросить"
							htmlType="button"
							type="clear"
							onClick={handleReset}
						/>
						<Button
							title="Применить"
							htmlType="submit"
							type="apply"
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
