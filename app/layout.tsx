'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../theme/theme';

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Add this to normalize styles */}
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}