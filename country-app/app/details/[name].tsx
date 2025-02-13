import {
  View,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { useTheme } from "@/context/useTheme";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountries } from "@/context/app-context";
import FlagCarousel from "@/components/flag-carousel";

export default function CountryDetail() {
  const navigation = useNavigation();
  const { name } = useLocalSearchParams() as { name: string };
  const { colors } = useTheme();
  const { countries, isLoading } = useCountries();

  const country = countries.find(
    (item) => item.name.common.toLowerCase() === name?.toLowerCase()
  );

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.detailItem}>
      <ThemedText style={styles.value}>{label}:</ThemedText>
      <ThemedText style={[styles.label, { color: colors.tint }]}>
        {value}
      </ThemedText>
    </View>
  );
  if (isLoading) {
    return <Skeleton details />;
  }
  return (
    <ThemedView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingTop: 60,
          paddingBottom: 8,
        }}
      >
        <Link href="/">
          <AntDesign name="arrowleft" size={26} color={colors.text} />
        </Link>
        <ThemedText
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {country?.name.common}
        </ThemedText>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
       <FlagCarousel country={country} />

        <View style={styles.content}>
          <View style={{ marginBottom: 10 }}>
            <DetailItem
              label="Population"
              value={country?.population?.toLocaleString() || "N/A"}
            />
            <DetailItem
              label="Continent"
              value={country?.continents?.join(", ") || "N/A"}
            />
            <DetailItem label="Subregion" value={country?.subregion || "N/A"} />
            <DetailItem
              label="Capital"
              value={country?.capital?.[0] || "N/A"}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <DetailItem
              label="Official Languages"
              value={
                country?.languages
                  ? Object.values(country?.languages).join(", ")
                  : "N/A"
              }
            />

            <DetailItem
              label="Country Code"
              value={`${country?.cca2} (${country?.cca3}) ` || "N/A"}
            />
            <DetailItem
              label="Area"
              value={`${country?.area.toLocaleString()} km²`}
            />
            <DetailItem
              label="Currencies"
              value={
                country?.currencies
                  ? Object.values(country?.currencies)
                      .map((c) => `${c.name} (${c.symbol})`)
                      .join(", ")
                  : "N/A"
              }
            />
          </View>
          <DetailItem
            label="Timezones"
            value={country?.timezones.slice(0,2).join(", ") || "N/A"}
          />
          <DetailItem
            label="Driving side"
            value={country?.car?.side || "N/A"}
          />
          <DetailItem
            label="Independent"
            value={country?.independent ? "Yes" : "No"}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    position: "relative",
    marginHorizontal: 16,
  },
  carouselButton: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -20 }],
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(7px)",
    boxShadow: "0 0px 2px #000",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  leftButton: {
    left: 8,
  },
  rightButton: {
    right: 8,
  },
  flag: {
    height: 300,
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    borderRadius: 10,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
});
