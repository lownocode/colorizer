import React from 'react';

import { 
	View, 
	AdaptivityProvider, 
	AppRoot 
} from '@vkontakte/vkui';

import '@vkontakte/vkui/dist/vkui.css';
import './App.css';

import Home from './panels/Home';

const App = () => {
	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel='home'>
					<Home id='home' />
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
}

export default App;
