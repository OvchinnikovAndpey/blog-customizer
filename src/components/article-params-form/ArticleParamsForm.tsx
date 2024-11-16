import clsx from 'clsx';
import { useRef, useState, useEffect } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	style: ArticleStateType;
	setStyle: (style: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	style,
	setStyle,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentStyle, setCurrentStyle] = useState(style);

	const formRef = useRef<HTMLFormElement>(null);

	function formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStyle(currentStyle);
		setIsOpen(false);
	}

	function formResetHandler() {
		setCurrentStyle(defaultArticleState);
		setStyle(defaultArticleState);
	}

	useEffect(() => {
		const closeEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};
		document.addEventListener('keydown', closeEsc);

		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', closeEsc);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	function handleFontFamilyChange(item: OptionType) {
		setCurrentStyle({ ...currentStyle, fontFamilyOption: item });
	}

	function handlerFontColorChange(item: OptionType) {
		setCurrentStyle({ ...currentStyle, fontColor: item });
	}

	function handlerBackgroundChange(item: OptionType) {
		setCurrentStyle({ ...currentStyle, backgroundColor: item });
	}
	function handlerContentWidthChange(item: OptionType) {
		setCurrentStyle({ ...currentStyle, contentWidth: item });
	}

	function handlerFontSizeChange(item: OptionType) {
		setCurrentStyle({ ...currentStyle, fontSizeOption: item });
	}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					ref={formRef}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}
					className={styles.form}>
					<Text
						as='h2'
						size={31}
						weight={800}
						family={'open-sans'}
						uppercase
						dynamicLite>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={currentStyle.fontFamilyOption}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						name='font size'
						title='размер шрифта'
						options={fontSizeOptions}
						selected={currentStyle.fontSizeOption}
						onChange={handlerFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={currentStyle.fontColor}
						onChange={handlerFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={currentStyle.backgroundColor}
						onChange={handlerBackgroundChange}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={currentStyle.contentWidth}
						onChange={handlerContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
