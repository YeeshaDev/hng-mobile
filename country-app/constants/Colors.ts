/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
export interface ThemeColors {
  background: string;
  text: string;
  tint: string;
  icon: string;  
  button:string;
}

export type ColorScheme = 'light' | 'dark';

export const Colors: Record<ColorScheme, ThemeColors> = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#667085',
    icon: '#687076',
    button:'#FF6C00'
    
    
  },
  dark: {
    text: '#ECEDEE',
    background: '#000F24',
    tint: '#98A2B3',
    icon: '#9BA1A6',
    button:'#FF6C00'
    
  },
};
