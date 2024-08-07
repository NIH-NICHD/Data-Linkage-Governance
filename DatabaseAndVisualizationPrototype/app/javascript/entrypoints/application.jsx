import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from '../theme/VizTheme';
import { VizProvider } from '../reducer/VizContextProvider';
import { createRoot } from 'react-dom/client';
import Glossary from '../containers/Glossary';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import App from '../containers/App';
let rootElement = document.getElementById('root');
const router = createHashRouter(
  [
    {
      path: '/:id',
      element: <App />,
    },
    {
      path: '/',
      element: <App />,
    }
  ]
)
if(rootElement) {
  const root = createRoot(rootElement); // createRoot(container!) if you use TypeScript
  root.render(
    <React.StrictMode>
      <VizProvider>
        <ThemeProvider theme = {theme}>
          <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </VizProvider>
    </React.StrictMode>
  );
} else {
  rootElement = document.getElementById('glossary');
  if(rootElement) {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <Glossary />
      </React.StrictMode>
    );
  }
}

