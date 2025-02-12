import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const isDark = theme === 'dark';

  return (
    <TouchableOpacity style={styles.button} onPress={toggleTheme}>
      <Ionicons 
        name={isDark ? 'moon-outline' : 'sunny'} 
        size={26} 
        color={colors.text} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});
