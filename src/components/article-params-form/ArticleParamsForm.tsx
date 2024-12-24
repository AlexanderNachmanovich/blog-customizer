// src/components/article-params-form/ArticleParamsForm.tsx
import { useState, useEffect } from 'react';
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
} from 'src/constants/articleProps';

interface ArticleParamsFormProps {
	isOpen: boolean;
	onToggle: () => void;
	onApply: (newSettings: typeof defaultArticleState) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({ isOpen, onToggle, onApply, onReset }: ArticleParamsFormProps) => {
	const [localState, setLocalState] = useState(defaultArticleState);

	const handleInputChange = (key: keyof typeof defaultArticleState, value: string) => {
		const updatedOption =
			fontFamilyOptions.find(option => option.value === value) ||
			fontColors.find(option => option.value === value) ||
			backgroundColors.find(option => option.value === value) ||
			contentWidthArr.find(option => option.value === value) ||
			fontSizeOptions.find(option => option.value === value);

		if (updatedOption) {
			setLocalState(prevState => ({
				...prevState,
				[key]: updatedOption,
			}));
		}
	};

	const handleReset = () => {
		setLocalState(defaultArticleState);
		onReset();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(localState);
	};

	const handleOutsideClick = (event: MouseEvent) => {
		const panel = document.querySelector(`.${styles.container}`);
		if (panel && !panel.contains(event.target as Node)) {
			onToggle();
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
			>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						title="Шрифт"
						options={fontFamilyOptions}
						selected={localState.fontFamilyOption}
						onChange={(option) =>
							handleInputChange('fontFamilyOption', option.value)
						}
					/>

					<RadioGroup
						name="fontSize"
						title="Размер шрифта"
						options={fontSizeOptions}
						selected={localState.fontSizeOption}
						onChange={(option) =>
							handleInputChange('fontSizeOption', option.value)
						}
					/>
					<Select
						title="Цвет текста"
						options={fontColors}
						selected={localState.fontColor}
						onChange={(option) =>
							handleInputChange('fontColor', option.value)
						}
					/>
					<Separator />
					<Select
						title="Цвет фона"
						options={backgroundColors}
						selected={localState.backgroundColor}
						onChange={(option) =>
							handleInputChange('backgroundColor', option.value)
						}
					/>
					<Select
						title="Ширина контента"
						options={contentWidthArr}
						selected={localState.contentWidth}
						onChange={(option) =>
							handleInputChange('contentWidth', option.value)
						}
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
