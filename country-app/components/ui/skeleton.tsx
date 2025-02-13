import { View, Animated, StyleSheet, Dimensions } from "react-native";
import { useCallback, useEffect, useRef } from "react";
import { ThemedView } from "./ThemedView";

export const Skeleton = ({ details = false }: { details?: boolean }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const startAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animatedValue]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const renderSkeletonItems = () => {
    return Array(8)
      .fill(null)
      .map((_, index) => (
        <Animated.View key={index} style={[styles.skeletonItem, { opacity }]}>
          <View style={styles.skeletonFlag} />
          <View style={styles.skeletonContent}>
            <View style={styles.skeletonText} />
            <View style={[styles.skeletonText, styles.skeletonSubtext]} />
          </View>
        </Animated.View>
      ));
  };

  return (
    <ThemedView style={styles.container}>
      {details && (
        <Animated.View
          style={[
            styles.skeletonItem,
            {
              height: 300,
              marginVertical: 12,
              backgroundColor: "#D8D8D8",
              marginTop: 40,
            },
            { opacity },
          ]}
        ></Animated.View>
      )}
      {renderSkeletonItems()}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  skeletonItem: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
    alignItems: "center",
  },
  skeletonFlag: {
    width: 50,
    height: 32,
    backgroundColor: "#D8D8D8",
    borderRadius: 4,
  },
  skeletonContent: {
    marginLeft: 12,
    flex: 1,
  },
  skeletonText: {
    height: 16,
    backgroundColor: "#D8D8D8",
    borderRadius: 4,
    width: "80%",
  },
  skeletonSubtext: {
    marginTop: 8,
    width: "60%",
  },
});
