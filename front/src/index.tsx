import '@eduzz/houston-forms/yupLocale';

import ReactDOM from 'react-dom';

import setHoustonHooksConfig from '@eduzz/houston-hooks/config';

import App from './App';

setHoustonHooksConfig({
  onUnhandledError: err => console.log(err)
});

ReactDOM.render(<App />, document.getElementById('root'));
