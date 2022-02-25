import { memo } from 'react';

import { Provider } from 'react-redux';

import ThemeProvider from '@eduzz/houston-ui/styles/ThemeProvider';

import theme from './assets/theme';
import Pages from './components/Pages';
import { store } from './store';

const App = memo(() => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Pages />
      </ThemeProvider>
    </Provider>
  );
});

export default App;
