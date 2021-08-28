import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { ChromePicker } from 'react-color';

import { 
	Panel, 
	PanelHeader,
	Card,
	CardGrid,
	SimpleCell,
	PanelHeaderButton,
	Div,
} from '@vkontakte/vkui';
import { Icon24PaletteOutline, Icon24Copy } from '@vkontakte/icons';

import './Home.css';
import {
	rgbaToHexa,
	invertColor
} from '../functions';

const texts = [
	`_Практический_ опыт показывает, _что повышение уровня_ гражданского сознания играет важную роль в формировании дальнейших направлений развитая системы массового участия.`,
	`Повседневная практика _показывает, что постоянное информационно-техническое_ обеспечение нашей деятельности напрямую зависит от новых предложений.`,
	`Равным образом дальнейшее развитие различных форм деятельности играет важную роль в формировании экономической целесообразности принимаемых решений.`,
	`Значимость этих проблем настолько очевидна, _что начало повседневной_ работы по формированию позиции позволяет выполнить важнейшие задания по разработке ключевых компонентов...`,
	`Значимость этих проблем настолько очевидна, что консультация с _профессионалами из IT_ требует определения и уточнения модели развития.`,
	`С другой стороны _социально-экономическое развитие требует_ определения и уточнения всесторонне сбалансированных нововведений.`,
	`Таким образом, дальнейшее развитие различных _форм деятельности обеспечивает_ широкому кругу специалистов участие в формировании позиций, занимаемых участниками в отношении поставленных...`,
	`Задача организации, в _особенности же постоянное информационно-техническое_ обеспечение нашей деятельности напрямую зависит от ключевых компонентов планируемого обновления?`,
	`Дорогие друзья, рамки _и место обучения кадров требует_ от нас системного анализа дальнейших направлений развития проекта!`,
	`Соображения высшего порядка, а также выбранный нами _инновационный путь представляет_ собой интересный эксперимент проверки ключевых компонентов планируемого обновления.`,
	`С другой стороны выбранный нами инновационный путь _требует определения и уточнения_ новых предложений!`,
	`Задача организации, в особенности же новая модель организационной деятельности _создаёт предпосылки качественно новых шагов для..._`,
	`Равным образом рамки и место обучения кадров _обеспечивает широкому кругу специалистов_ участие в формировании системы...`,
	`Практический опыт показывает, что _выбранный нами инновационный путь требует от нас_ системного анализа ключевых компонентов...`,
	`Разнообразный и богатый опыт постоянный количественный _рост и сфера нашей активности влечет за_ собой процесс...`,
	`Практический опыт показывает, что выбранный нами инновационный путь _способствует подготовке и реализации существующих финансовых и..._`,
	`Задача организации, в особенности же социально-экономическое развитие позволяет оценить _значение направлений прогрессивного развития_...`
];

const Home = ({ id }) => {
	const [ colors, setColors ] = useState({
		hex: '#9013FE',
		hexa: '#9013FE1',
		rgb: 'rgb(144, 19, 254)',
		rgba: 'rgba(144, 19, 254, 1)'
	});
	const [ tooltip, setTooltip ] = useState('');
	const [ lorem, setLorem ] = useState('');

	const regex = {
		paragraph: /(?:\r\n){2,}/g,
		formatting: /(\_.*?\_)|(\*.*?\*)/g,
	};

	let applyFormatting = (text) => {
		return text.split(regex.formatting).filter(n => n).map((str) => {
		let parsed = str[0] == '_'
			? (<b>{applyFormatting(str.substr(1, str.length - 2))}</b>)
			: str;
		return parsed;
	  });
	};

	useEffect(() => {
		setLorem(texts[Math.floor(Math.random() * texts.length)]);
		applyFormatting(lorem);
	}, []);

	const copyColor = from => {
		switch (from) {
			case 'hex':
				bridge.send('VKWebAppCopyText', { text: colors.hex });
				setTooltip('HEX скопирован!');
				return setTimeout(() => { setTooltip('') }, 4500);
			case 'rgb':
				bridge.send('VKWebAppCopyText', { text: colors.rgb });
				setTooltip('RGB скопирован!');
				return setTimeout(() => { setTooltip('') }, 4500);
			case 'hexa':
				bridge.send('VKWebAppCopyText', { text: colors.hexa });
				setTooltip('HEXA скопирован!');
				return setTimeout(() => { setTooltip('') }, 4500);
			case 'rgba':
				bridge.send('VKWebAppCopyText', { text: colors.rgba });
				setTooltip('RGBA скопирован!');
				return setTimeout(() => { setTooltip('') }, 4500);
			default:
				return;
		}
	};

	const convertColor = color => {
		document.documentElement.style.setProperty('--background_content', color.hex);
		document.documentElement.style.setProperty('--header_background', color.hex);
		document.documentElement.style.setProperty('--header_text', invertColor(color.hex, true));
		document.documentElement.style.setProperty('--header_tint', invertColor(color.hex, true));

		setColors({
			hex: (color.hex).toString().toUpperCase(),
			hexa: rgbaToHexa(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`).toString().toUpperCase(),
			rgb: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
			rgba: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
		});
	};

	let formattedText;

	formattedText = lorem.split(regex.paragraph) || [];
	formattedText = formattedText.map((text, i) => {
		return (
		<div key={i}>
			{
				applyFormatting(text)
			}
		</div>
		)
	});

	return (
		<Panel id={id}>
			<PanelHeader 
			left={<Icon24PaletteOutline className='icon'/>}
			separator={false}
			>
				Colorizer
			</PanelHeader>
			<br/>
			<center>
				<ChromePicker
				color={colors.hex}
				onChange={e => convertColor(e)}
				width='80%'
				/>
			</center>
			<center>
				<h3
				style={{ color: '#fff' }}
				>
					{tooltip 
					? <div style={{ color: colors.hex }}>{tooltip}</div> 
					: <div style={{ color: invertColor(colors.hex, true) }}>Выберите цвет</div>}
				</h3>
			</center>

			<br/>
			<CardGrid size='m'>
				<Card style={{ background: invertColor(colors.hex, true), borderRadius: 10 }}>
					<SimpleCell
					description={<div style={{ color: colors.hex }}>HEX</div>}
					disabled
					style={{ background: invertColor(colors.hex, true), borderRadius: 10 }}
					after={<PanelHeaderButton onClick={() => copyColor('hex')}>
						<Icon24Copy fill={colors.hex}/>
					</PanelHeaderButton>}
					>
						<b style={{ color: colors.hex }}>{colors.hex}</b>
					</SimpleCell>
				</Card>

				<Card style={{ background: invertColor(colors.hex, true), borderRadius: 10 }}>
					<SimpleCell
					description={<div style={{ color: colors.hex }}>RGB</div>}
					disabled
					style={{ background: invertColor(colors.hex, true), borderRadius: 10 }}
					after={<PanelHeaderButton onClick={() => copyColor('rgb')}>
						<Icon24Copy fill={colors.hex}/>
					</PanelHeaderButton>}
					>
						<b style={{ color: colors.hex }}>{colors.rgb}</b>
					</SimpleCell>
				</Card>

				<Card style={{ background: invertColor(colors.hex, true), borderRadius: 10 }}>
					<SimpleCell
					description={<div style={{ color: colors.hex }}>HEXA</div>}
					disabled
					style={{ background: invertColor(colors.hex, true), borderRadius: 10 }}
					after={<PanelHeaderButton onClick={() => copyColor('hexa')}>
						<Icon24Copy fill={colors.hex}/>
					</PanelHeaderButton>}
					>
						<b style={{ color: colors.hex }}>{colors.hexa}</b>
					</SimpleCell>
				</Card>

				<Card style={{ background: invertColor(colors.hex, true), borderRadius: 10 }}>
					<SimpleCell
					description={<div style={{ color: colors.hex }}>RGBA</div>}
					disabled
					style={{ background: invertColor(colors.hex, true), borderRadius: 10 }}
					after={<PanelHeaderButton onClick={() => copyColor('rgba')}>
						<Icon24Copy fill={colors.hex}/>
					</PanelHeaderButton>}
					>
						<b style={{ color: colors.hex }}>{colors.rgba}</b>
					</SimpleCell>
				</Card>
			</CardGrid>
			<Div
			style={{ color: colors.hex }}
			>
				<Card style={{ background: invertColor(colors.hex, true), borderRadius: 10, padding: 10 }}>
					{
						formattedText
					}
				</Card>
			</Div>
		</Panel>
	)
};

export default Home;