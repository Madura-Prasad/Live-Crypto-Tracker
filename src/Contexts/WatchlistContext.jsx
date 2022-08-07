import { StyleSheet, Text, View } from "react-native";
import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WatchlistContext = createContext();

export const useWatchList = () => useContext(WatchlistContext);

const WatchlistProvider = ({ children }) => {
  const [watchListCoinIds, setWatchListCoinIds] = useState([]);

  const getWatchlistData = async () => {
    try {
      const jasonValue = await AsyncStorage.getItem("@watchlist_coins");
      setWatchListCoinIds(jasonValue != null ? JSON.parse(jasonValue) : []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWatchlistData();
  }, []);

  const storeWatchlistCoinId = async (coinId) => {
    try {
      const newWatchList = [...watchListCoinIds, coinId];
      const jsonValue = JSON.stringify(newWatchList);
      await AsyncStorage.setItem("@watchlist_coins", jsonValue);
      setWatchListCoinIds(newWatchList);
    } catch (e) {
      console.log(e);
    }
  };

  const removeWatchlistCoinId = async (coinId) => {
    const newWatchList = watchListCoinIds.filter(
      (coinIdValue) => coinIdValue !== coinId
    );
    const jsonValue = JSON.stringify(newWatchList);
    await AsyncStorage.setItem("@watchlist_coins", jsonValue);
    setWatchListCoinIds(newWatchList);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchListCoinIds, storeWatchlistCoinId, removeWatchlistCoinId }}
    >
      {children}
    </WatchlistContext.Provider>
    
  );
};

export default WatchlistProvider;

const styles = StyleSheet.create({});
