/**
 * 스토리북 미리보기 방식 구성
 * https://storybook.js.org/docs/react/configure/overview#configure-story-rendering
 */
//import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

//import 'css/bundle.css'; // 서비스 페이지 공통 CSS

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
// https://storybook.js.org/docs/react/writing-stories/decorators#global-decorators
// https://storybook.js.org/docs/react/essentials/toolbars-and-globals#global-types-and-the-toolbar-annotation
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {},
    expanded: true,
  },
  /*nextRouter: {
    Provider: RouterContext.Provider,
  },*/
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone5',
  },
  backgrounds: {
    default: 'white',
    grid: {
      cellSize: 10,
      opacity: 0.4,
      cellAmount: 5,
      // offsetX: 16,
      // offsetY: 16,
    },
    values: [
      { name: 'white', value: '#fff' },
      { name: 'light', value: '#f8f8f8' },
      { name: 'dark', value: '#333' },
      { name: 'black', value: '#000' },
    ],
  },
};
