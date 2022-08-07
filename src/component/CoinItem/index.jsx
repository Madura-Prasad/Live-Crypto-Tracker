import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CoinDetailsScreen from "../../screens/CoinDetails";

const CoinItem = ({ market }) => {
  const {
    id,
    name,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    market_cap,
    image,
  } = market;

  const navigation = useNavigation();

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ff0000" : "#16c784";

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1e12) {
      return `${(marketCap / 1e12).toFixed(2)} T`;
    }
    if (marketCap > 1e9) {
      return `${(marketCap / 1e9).toFixed(2)} B`;
    }
    if (marketCap > 1e6) {
      return `${(marketCap / 1e6).toFixed(2)} M`;
    }
    if (marketCap > 1e3) {
      return `${(marketCap / 1e3).toFixed(2)} K`;
    }
    return 10;
  };
  return (
    <Pressable
      style={styles.coinContainer}
      onPress={() => navigation.navigate("CoinDetailsScreen", { coinId: id })}
    >
      <Image
        source={{
          uri: image,
        }}
        style={{
          height: 35,
          width: 35,
          marginRight: 10,
        }}
      />
      <View>
        <Text style={styles.title}> {name} </Text>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.rankContainer}> {market_cap_rank} </Text>
          </View>
          <Text style={styles.text}> {symbol.toUpperCase()} </Text>
          <AntDesign
            name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
            size={12}
            color={percentageColor}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text
            style={{
              color: percentageColor,
              fontWeight: "700",
              alignSelf: "center",
            }}
          >
            {price_change_percentage_24h.toFixed(2)} %
          </Text>
        </View>
      </View>
      <View style={styles.price}>
        <Text style={styles.text}> $ {current_price.toFixed(2)} </Text>
        <Text style={styles.text}> MCap {normalizeMarketCap(market_cap)} </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#fffaec",
    fontSize: 20,
    fontWeight: "700",
  },
  text: {
    color: "#fffac4",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 5,
    marginBottom: 5,
  },
  coinContainer: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#7E7474",
    padding: 15,
    justifyContent: "space-between",
  },
  // margin auto not working code
  price: {
    marginLeft: "auto",
    alignItems: "flex-end",
  },
  rank: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginRight: 5,
  },
  rankContainer: {
    backgroundColor: "#939598",
    borderRadius: 5,
    padding: 3,
    color: "#fffaec",
    marginRight: 10,
    marginLeft: 10,
    fontWeight: "500",
  },
});

export default CoinItem;
