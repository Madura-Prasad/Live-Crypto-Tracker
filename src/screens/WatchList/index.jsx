import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { useWatchList } from "../../Contexts/WatchlistContext";
import CoinItem from "../../component/CoinItem";
import { getWatchlistedCoins } from "../../services/request";

const WatchList = () => {
  const { watchListCoinIds } = useWatchList();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const transformCoinIds = () => watchListCoinIds.join("%2C");

  const fetchWatchlistedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchListCoinsData = await getWatchlistedCoins(1, transformCoinIds());
    setCoins(watchListCoinsData);
    setLoading(false);
  };

  useEffect(() => {
    if (watchListCoinIds.length > 0) {
      fetchWatchlistedCoins();
    }
  }, [watchListCoinIds]);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem market={item} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={watchListCoinIds.length > 0 ? fetchWatchlistedCoins : null}
        />
      }
    />
  );
};

export default WatchList;

const styles = StyleSheet.create({});
