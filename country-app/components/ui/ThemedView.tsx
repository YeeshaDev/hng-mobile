import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface ThemedViewItems extends ViewProps {
  style?: any;
}

export const ThemedView = ({ style, ...props }:ThemedViewItems) => {
  const { colors } = useTheme();

  return <View style={[{ backgroundColor: colors.background }, style]} {...props} />;
};

