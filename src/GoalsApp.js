import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppRouter } from './routes/AppRouter';

function GoalsApp() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default GoalsApp;
