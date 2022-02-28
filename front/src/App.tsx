import { memo } from 'react';

import { Provider } from 'react-redux';

import ThemeProvider from '@eduzz/houston-ui/styles/ThemeProvider';

import theme from './assets/theme';
import Alert from './components/Globals/Alert';
import Loader from './components/Globals/Loader';
import Pages from './components/Pages';
import { store } from './store';

const App = memo(() => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Loader />
        <Alert />

        <Pages />
      </ThemeProvider>
    </Provider>
  );
});

export default App;
