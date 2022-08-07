import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import SearchableDropDown from "react-native-searchable-dropdown";
import { useRecoilState } from "recoil";
import { allPortfolioBoughtAssetsInStorage } from "../../atoms/PortfolioAssets";
import { getAllCoins, getDetailsCoinData } from "../../services/request";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AddNewAssets = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [boughtAssetQtn, setBoughtAssetQtn] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const navigation = useNavigation();

  const [assetStorage, setAssetStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );

  const fetchAllCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const allCoins = await getAllCoins();
    setAllCoins(allCoins);
    setLoading(false);
  };

  const fetchCoinInfo = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinInfo = await getDetailsCoinData(selectedCoinId);
    setSelectedCoin(coinInfo);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCoins();
  }, []);

  useEffect(() => {
    if (selectedCoinId) {
      fetchCoinInfo();
    }
  }, [selectedCoinId]);

  const onAddNewAssets = async () => {
    const newAsset = {
      id: selectedCoin.id,
      unique_id: selectedCoin.id + Math.random(0, 1e6),
      name: selectedCoin.name,
      image: selectedCoin.image.small,
      ticker: selectedCoin.symbol.toUpperCase(),
      quantityBought: parseFloat(boughtAssetQtn),
      priceBought: selectedCoin.market_data.current_price.usd,
    };
    const newAssets = [...assetStorage, newAsset];
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setAssetStorage(newAssets);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchableDropDown
        items={allCoins}
        onItemSelect={(item) => setSelectedCoinId(item.id)}
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.item}
        itemTextStyle={{ color: "#fffaec" }}
        resetValue={false}
        placeholder={selectedCoinId || "Search Coin"}
        placeholderTextColor="#fffaec"
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1.5,
            borderColor: "#2c2443",
            borderRadius: 5,
            backgroundColor: "#2c2443",
            color: "#fffaec",
          },
        }}
      />
      {selectedCoin && (
        <>
          <View style={styles.boughtQtnContainer}>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{ color: "#fffaec", fontSize: 90 }}
                value={boughtAssetQtn}
                placeholder="0"
                keyboardType="numeric"
                onChangeText={setBoughtAssetQtn}
              />
              <Text style={styles.ticker}>
                
                {selectedCoin.symbol.toUpperCase()}
              </Text>
            </View>
            <Text style={{ color: "#fffaec" }}>
              $ {selectedCoin.market_data.current_price.usd}
              Per Coin
            </Text>
          </View>
          <Pressable
            style={{
              ...styles.buttonContainer,
              backgroundColor: boughtAssetQtn === "" ? "#2c2443" : "#2c2455",
            }}
            onPress={onAddNewAssets}
            disabled={boughtAssetQtn === ""}
          >
            <Text style={styles.buttonText}> Add New Assets </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default AddNewAssets;

const styles = StyleSheet.create({
  dropdownContainer: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  item: {
    padding: 10,
    marginTop: 2,
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#fffaec",
    borderRadius: 5,
  },
  ticker: {
    color: "grey",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 25,
    marginLeft: 5,
  },
  boughtQtnContainer: {
    alignItems: "center",
    marginTop: 50,
    flex: 1,
  },
  buttonContainer: {
    padding: 10,
    alignItems: "center",
    marginVertical: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fffaec",
    fontSize: 17,
    fontWeight: "700",
  },
  pricePerCoin: {
    color: "DCD7C9",
    fontWeight: "500",
    fontSize: 17,
    letterSpacing: 1,
  },
});
