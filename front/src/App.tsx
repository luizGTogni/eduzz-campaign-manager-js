import { memo } from 'react';

import ThemeProvider from '@eduzz/houston-ui/styles/ThemeProvider';

import theme from './assets/theme';
import Pages from './components/Pages';

const App = memo(() => {
  return (
    <ThemeProvider theme={theme}>
      <Pages />
    </ThemeProvider>
  );
});

export default App;
