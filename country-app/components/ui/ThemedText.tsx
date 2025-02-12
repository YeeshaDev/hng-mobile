import { useTheme } from '@/hooks/useTheme';
import { Text, type TextProps, StyleSheet } from 'react-native';

export type ThemedTextItems = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextItems) {
  const { theme, colors } = useTheme();

  const color = theme === 'light' ? lightColor ?? colors.text : darkColor ?? colors.text;

  return (
    <Text
      style={[
        { color },
        styles[type], 
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    textDecorationLine: 'underline',
  },
});
