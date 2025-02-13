import { useState, useRef } from "react";
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Ionicons } from "@expo/vector-icons";
import { Country } from "@/types";
import WebView from "react-native-webview";
const { width } = Dimensions.get("window");

const FlagCarousel = ({ country }: { country: Country | undefined }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<any>(null);

  const images = [
    { uri: country?.flags?.png, key: "flag" },
    { uri: country?.coatOfArms?.png, key: "coatOfArms" },
    country?.maps?.openStreetMaps
      ? {
          type: "webview",
          uri: country.maps.openStreetMaps,
          key: "openStreetMaps",
        }
      : null,
    country?.maps?.googleMaps
      ? { type: "webview", uri: country.maps.googleMaps, key: "googleMaps" }
      : null,
  ].filter((item) => item);

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        data={images}
        width={width * 0.9}
        height={250}
        loop
        autoPlay
        autoPlayInterval={3000}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) =>
          item?.type === "webview" ? (
            <WebView
              source={{ uri: item?.uri }}
              style={{ width: "100%", height: 250, borderRadius: 10 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              injectedJavaScript={`document.body.style.opacity = '1';`}
            />
          ) : (
            <Image
              source={{ uri: item?.uri }}
              style={{ width: "100%", height: 250, borderRadius: 10 }}
            />
          )
        }
      />

      {/* ----- Navigation Arrows ------ */}
      <TouchableOpacity
        style={[styles.carouselButton, styles.leftButton]}
        onPress={() => {
          const newIndex =
            currentIndex === 0 ? images.length - 1 : currentIndex - 1;
          setCurrentIndex(newIndex);
          carouselRef.current?.scrollTo({ index: newIndex, animated: true });
        }}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.carouselButton, styles.rightButton]}
        onPress={() => {
          const newIndex =
            currentIndex === images.length - 1 ? 0 : currentIndex + 1;
          setCurrentIndex(newIndex);
          carouselRef.current?.scrollTo({ index: newIndex, animated: true });
        }}
      >
        <Ionicons name="chevron-forward" size={24} color="black" />
      </TouchableOpacity>

      {/*----- Pagination ----- */}
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === currentIndex ? "white" : "gray" },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default FlagCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    position: "relative",
    alignItems: "center",
    marginVertical: 5,
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
  paginationContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    width: 9,
    height: 9,
    margin: 5,
    borderRadius: 4,
  },
});
