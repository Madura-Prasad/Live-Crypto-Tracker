import { StyleSheet, Text, View } from "react-native";
import React, { Suspense } from "react";
import PortfolioAssetsList from "./component/PortfolioAssetsList";

const Portfolio = () => {
  return (
    <View>
      <Suspense
        fallback={<Text style={styles.text}> Loading Please Wait </Text>}
      >
        <PortfolioAssetsList />
      </Suspense>
    </View>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
  },
});
