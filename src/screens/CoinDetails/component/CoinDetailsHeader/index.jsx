import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useWatchList } from "../../../../Contexts/WatchlistContext";

const CoinDetails = (props) => {
  const { coinId, image, symbol, market_cap_rank } = props;
  const navigation = useNavigation();
  const { watchListCoinIds, storeWatchlistCoinId, removeWatchlistCoinId } =
    useWatchList();

  const checkIfCoinIsWatchlisted = () =>
    watchListCoinIds.some((coinIdValue) => coinIdValue === coinId);

  const handleWatchlistCoin = () => {
    if (checkIfCoinIsWatchlisted()) {
      return removeWatchlistCoinId(coinId);
    }
    return storeWatchlistCoinId(coinId);
  };

  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name="chevron-back-sharp"
        size={30}
        color="#fffaec"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ width: 35, height: 35 }} />
        <Text style={styles.title}> {symbol.toUpperCase()} </Text>
        <View style={styles.rankContainer}>
          <Text style={styles.titleRank}> #{market_cap_rank} </Text>
        </View>
      </View>
      <AntDesign
        name={checkIfCoinIsWatchlisted() ? "star" : "staro"}
        size={25}
        color={checkIfCoinIsWatchlisted() ? "#fffaec" : "#fffac9"}
        onPress={handleWatchlistCoin}
      />
    </View>
  );
};

export default CoinDetails;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  tickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    marginHorizontal: 5,
    color: "#fffaec",
  },
  titleRank: {
    backgroundColor: "#939598",
    borderRadius: 5,
    padding: 3,
    color: "#fffaec",
    fontWeight: "700",
  },
  rankContainer: {
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});
