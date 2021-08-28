import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { SketchPicker } from 'react-color';

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

const texts = [
	`Практический опыт показывает, что повышение уровня гражданского сознания играет важную роль в формировании дальнейших направлений развитая системы массового участия.`,
	`Повседневная практика показывает, что постоянное информационно-техническое обеспечение нашей деятельности напрямую зависит от новых предложений.`,
	`Равным образом дальнейшее развитие различных форм деятельности играет важную роль в формировании экономической целесообразности принимаемых решений.`,
	`Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции позволяет выполнить важнейшие задания по разработке ключевых компонентов...`,
	`Значимость этих проблем настолько очевидна, что консультация с профессионалами из IT требует определения и уточнения модели развития.`,
	`С другой стороны социально-экономическое развитие требует определения и уточнения всесторонне сбалансированных нововведений.`,
	`Таким образом, дальнейшее развитие различных форм деятельности обеспечивает широкому кругу специалистов участие в формировании позиций, занимаемых участниками в отношении поставленных...`,
	`Задача организации, в особенности же постоянное информационно-техническое обеспечение нашей деятельности напрямую зависит от ключевых компонентов планируемого обновления?`,
	`Дорогие друзья, рамки и место обучения кадров требует от нас системного анализа дальнейших направлений развития проекта!`,
	`Соображения высшего порядка, а также выбранный нами инновационный путь представляет собой интересный эксперимент проверки ключевых компонентов планируемого обновления.`,
	`С другой стороны выбранный нами инновационный путь требует определения и уточнения новых предложений!`,
];

const Home = ({ id }) => {
	const [ colors, setColors ] = useState({
		hex: '#9013FE',
		hexa: '#9013FE1',
		rgb: 'rgb(144, 19, 254)',
		rgba: 'rgba(144, 19, 254, 1)'
	});
	const [ tooltip, setTooltip ] = useState('');

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

	const padZero = (str, len) => {
		len = len || 2;
		var zeros = new Array(len).join('0');
		return (zeros + str).slice(-len);
	};

	const invertColor = (hex, bw) => {
		if (hex.indexOf('#') === 0) {
			hex = hex.slice(1);
		}
		
		if (hex.length === 3) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}
		if (hex.length !== 6) {
			throw new Error('Invalid HEX color.');
		}
		var r = parseInt(hex.slice(0, 2), 16),
			g = parseInt(hex.slice(2, 4), 16),
			b = parseInt(hex.slice(4, 6), 16);
		if (bw) {
			return (r * 0.299 + g * 0.587 + b * 0.114) > 186
				? '#000000'
				: '#FFFFFF';
		}
		r = (255 - r).toString(16);
		g = (255 - g).toString(16);
		b = (255 - b).toString(16);
		return "#" + padZero(r) + padZero(g) + padZero(b);
	};

	const rgbaToHexa = rgba => {
		var a,
		rgb = rgba.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
		alpha = (rgb && rgb[4] || "").trim(),
		hex = rgb ?
		(rgb[1] | 1 << 8).toString(16).slice(1) +
		(rgb[2] | 1 << 8).toString(16).slice(1) +
		(rgb[3] | 1 << 8).toString(16).slice(1) : rgba;
	  
		if (alpha !== "") { a = alpha; }
		else { a = '01'; }
		hex = hex + a;
	  
		return `#` + hex;
	}

	const convertColor = color => {
		setColors({
			hex: (color.hex).toString().toUpperCase(),
			hexa: rgbaToHexa(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`).toString().toUpperCase(),
			rgb: `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`,
			rgba: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
		});
	};

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
				<SketchPicker
				color={colors.hex}
				onChangeComplete={e => convertColor(e)}
				width='50%'
				/>
			</center>
			<center>
				<h3
				style={{ color: '#fff', marginTop: -5 }}
				>
					{tooltip 
					? <div style={{ color: colors.hex }}>{tooltip}</div> 
					: 'Выберите цвет'}
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
				{texts[Math.floor(Math.random() * texts.length)]}
			</Div>
		</Panel>
	)
};

export default Home;