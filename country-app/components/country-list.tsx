import type { Country } from "@/types";
import { Link } from "expo-router";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "./ui/ThemedText";
import { ThemeColors } from "@/constants/Colors";

interface CountryListItems {
  country: Country;
  colors: ThemeColors;
}

export const CountryListItem = ({ colors, country }: CountryListItems) => {
  return (
    <Link href={`/details/${country.name.common}`} asChild>
      <Pressable>
        <View style={styles.container}>
          <Image
            source={{ uri: country.flags.png }}
            style={styles.flag}
            alt={country?.flags?.alt}
            resizeMode="cover"
          />
          <View style={styles.info}>
            <ThemedText type="defaultSemiBold">
              {country.name.common}
            </ThemedText>
            <ThemedText style={[styles.capital, { color: colors.tint }]}>
              {country.capital || "N/A"}
            </ThemedText>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap:4,
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    alignItems: "center",
  },
  flag: {
    width: 48,
    height: 40,
    borderRadius: 4,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  capital: {
    fontSize: 14,
  },
});
