import React, { useLayoutEffect } from 'react';
/* KOI Tokens */
import '@spglobal/tokens/dist/web/tokens.css';
/* KOI Library utility styles */
import '@spglobal/css-components/dist/css/koi.css';

import { RouteConfig } from './configs/routeConfig';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { setDefaultTheme } from './utils/setDefaultTheme';

const themeDetails = {
  activeTheme: 'new-gen',
};

const App: React.FC = () => {
  useLayoutEffect(() => {
    setDefaultTheme('DARK');
  }, []);

  return (
    <ThemeProvider theme={themeDetails}>
      <BrowserRouter>
        <RouteConfig />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
