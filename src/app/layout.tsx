'use client';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from '../store';
import StyledComponentsRegistry from './lib/registry';
import './globals.css';
import { theme } from '@/theme/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
