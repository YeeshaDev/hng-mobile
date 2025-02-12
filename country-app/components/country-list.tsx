import type { CountryItems } from '@/service/types';
import { Link } from 'expo-router';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from './ui/ThemedText';
import { ThemeColors } from '@/constants/Colors';

interface CountryListItems {
  country: CountryItems;
  colors:ThemeColors
}

export const CountryListItem = ({colors, country }: CountryListItems) => {
  return (
    <Link
    href={`/details/${country.name}`}
    asChild>
      <Pressable>
     <View
      style={styles.container} 
    >
      <Image 
        source={{ uri: country.href.flag }} 
        style={styles.flag}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <ThemedText type='defaultSemiBold' >
          {country.name}
        </ThemedText>
        <ThemedText  style={[styles.capital, {color:colors.tint}]}>
          {country.capital || 'N/A'}
        </ThemedText>
      </View>
    </View>
    </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: 'center',
  },
  flag: {
    width: 48,
    height: 32,
    borderRadius: 4,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  capital: {
    fontSize: 14,
    marginTop: 2,
  },
});