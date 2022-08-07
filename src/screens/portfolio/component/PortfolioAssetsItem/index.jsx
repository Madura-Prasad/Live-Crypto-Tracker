import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const PortfolioAssetsItem = ({ assetItem }) => {
  const {
    currentPrice,
    image,
    name,
    priceChangePercentage,
    quantityBought,
    ticker,
  } = assetItem;

  const isChangePositive = () => priceChangePercentage >= 0;

  const renderHolding = () => (quantityBought * currentPrice).toFixed(2);

  return (
    <View style={styles.coinContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <View>
        <Text style={styles.title}> {name} </Text>
        <Text style={styles.ticker}> {ticker} </Text>
      </View>
      <View style={{ marginLeft: `auto`, alignItems: "flex-end" }}>
        <Text style={styles.title}> {currentPrice} </Text>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name={isChangePositive() ? "caretup" : "caretdown"}
            size={12}
            color={isChangePositive() ? "#16c784" : "#e81123"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text
            style={{
              color: isChangePositive() ? "#16c784" : "#e81123",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            {priceChangePercentage?.toFixed(2)} %
          </Text>
        </View>
      </View>
      <View style={styles.qtnContainer}>
        <Text style={styles.title}> {renderHolding()} </Text>
        <Text style={styles.ticker}>
          
          {quantityBought} {ticker}
        </Text>
      </View>
    </View>
  );
};

export default PortfolioAssetsItem;

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
    alignSelf: "center",
  },
  title: {
    color: "#fffaec",
    fontWeight: "600",
    fontSize: 16,
    alignSelf: "flex-end",
  },
  ticker: {
    color: "#fffaec",
    fontWeight: "600",
  },
  coinContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#0c3c4c",
  },
  qtnContainer: {
    marginLeft: `auto`,
    alignItems: "flex-end",
  },
});
