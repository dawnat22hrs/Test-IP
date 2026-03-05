import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bgPage: string;
      bgCard: string;
      textPrimary: string;
      textSecondary: string;
      border: string;
      accent: string;
      accentHover: string;
      error: string;
      success: string;
    };
  }
}
