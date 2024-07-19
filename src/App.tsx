import React from 'react';

/* KOI Tokens */
import '@spglobal/tokens/dist/web/tokens.css';
/* KOI Library utility styles */
import '@spglobal/css-components/dist/css/koi.css';

import { RouteConfig } from './configs/routeConfig';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

const themeDetails = {
  activeTheme: 'new-gen',
};

const App: React.FC = () => (
  <ThemeProvider theme={themeDetails}>
    <BrowserRouter>
      <RouteConfig />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
