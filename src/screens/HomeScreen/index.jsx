import { FlatList, RefreshControl, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import CoinItem from "../../component/CoinItem";
// import cryptocurrencies from "../../../../assets/data/cryptocurrencies.json";
import { getCoinMarketData } from "../../services/request";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getCoinMarketData(pageNumber);
    setCoins((existingCoin) => [...existingCoin, ...coinsData]);
    setLoading(false);
  };

  const reFetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getCoinMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, []);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#fffaec",
            fontSize: 22,
            fontWeight: "bold",
            letterSpacing: 2.5,
            paddingHorizontal: 20,
            paddingBottom: 10,
            fontFamily: "customFont",
          }}
        >
          Market Place
        </Text>
        <Text
          style={{
            color: "#939598",
            fontWeight: "500",
            fontSize: 12,
            paddingHorizontal: 10,
          }}
        >
          
          Powered by CoinGecko
        </Text>
      </View>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem market={item} />}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="#fffaec"
            onRefresh={reFetchCoins}
          />
        }
      />
    </View>
  );
};
export default HomeScreen;
