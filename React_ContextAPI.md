# Context API
Context API 는 리액트 프로젝트에서 전역적으로 사용할 데이터가 있을 때 유용한 기능입니다.  
(Context API 는 리액트 v16.3 부터 사용하기 쉽게 많이 개선되었습니다.)  

- 새 Context 만들기  
```javascript
// contexts/color.js
import React, { createContext, useState } from 'react';

// Context 기본 상태 지정
// 기본값은 Provider 를 사용하지 않았을 때만 사용됩니다.
// (만약 Provider 를 사용했는데 value 값을 명시하지 않았다면, 이 기본값을 사용하지 않기 떄문에 오류가 발생합니다.)
const ColorContext = createContext({
	state: {
		color: 'block', 
		subcolor: 'red',
	},
	actions: {
		setColor: () => {},
		setSubcolor: () => {},
	}
});

// Provider 를 사용하면 Context 값을 변경할 수 있습니다.
// Context API 를 사용할 컴포넌트에 값 주입
const ColorProvider = ({ children/*props.children*/ }) => {
	const [color, setColor] = useState('black');
	const [subcolor, setSubcolor] = useState('red'); // Consumer 내부에서 상태 변경이 가능하도록 합니다.

	const value = {
		state: { color, subcolor },
		actions: { setColor, setSubcolor },
	};

	// Context 와 컴포넌트 연결 (값 변경)
	// Provider 를 사용할 떄는 value 값을 명시해 주어야 제대로 작동!!
	return (
		<ColorContext.Provider value={value}>
			{children}
		</ColorContext.Provider>
	);
};

const ColorConsumer = ColorContext.Consumer;
//const { Consumer: ColorConsumer } = ColorContext;

// ColorProvider, ColorConsumer 내보내기 
export { ColorProvider, ColorConsumer };

export default ColorContext;
```


- Consumer 사용하기  
Context 를 사용할 컴포넌트 
```javascript
// components/ColorBox.js
import React, { useContext } from 'react';
import ColorContext from '../contexts/color';

const ColorBox = () => {
	const { state } = useContext(ColorContext); // Context 사용하기
	const style = {
		width: '20px',
		height: '20px',
	};

	return (
		<>
			<div style={
				{
					...style,
					background: state.color,
				}
			}></div>
			<div style={
				{
					...style,
					background: state.subcolor,
				}
			}></div>
		</>
	);
};

export default ColorBox;
```
```javascript
// components/SelectColors.js
import React from 'react';
import { ColorConsumer } from '../contexts/color';

const colors = ['red', 'orange', 'yellow', 'green', 'blue'];

const SelectColors = () => {
	return (
		<ColorConsumer>
			{({ actions/* Context 값 */ }) => (
				<div>
					{colors.map((color, index) => (
						<div 
							key={index} 
							style={{ background: color, width: '20px', height: '20px' }} 
							onClick={() => actions.setColor(color)}
							onContextMenu={(event) => { // 마우스 오른쪽 클릭 
								event.preventDefault();
								actions.setSubcolor(color);
							}}
						>
						</div>
					))}
				</div>
			)}
		</ColorConsumer>		
	);
};

export default SelectColors;
```


- Provider  
Context 의 값 변경
```javascript
// App.js
import React from 'react';
import ColorBox from './components/ColorBox';
import { ColorProvider } from './contexts/color';
import SelectColors from './components/SelectColors';

const App = () => {
	return (
		<ColorProvider>
			<div>
				<SelectColors />
				<ColorBox />
			</div>
		</ColorProvider>
	);
};

export default App;
```
