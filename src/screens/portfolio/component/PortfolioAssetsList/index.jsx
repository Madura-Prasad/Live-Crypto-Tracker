import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import PortfolioAssetsItem from "../PortfolioAssetsItem";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  allPortfolioAssets,
  allPortfolioBoughtAssetsInStorage,
} from "../../../../atoms/PortfolioAssets";
import { SwipeListView } from "react-native-swipe-list-view";
import { FontAwesome5  } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PortfolioAssetsList = () => {
  const navigation = useNavigation();
  const assets = useRecoilValue(allPortfolioAssets);
  const [storageAssets, setStorageAssets] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );

  const getCurrentBalance = () =>
    assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.currentPrice * currentAsset.quantityBought,
      0
    );

  const getCurrentValueChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );
    return (currentBalance - boughtBalance).toFixed(2);
  };

  const getCurrentPercentageChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );
    return (
      (((currentBalance - boughtBalance) / boughtBalance) * 100).toFixed(2) || 0
    );
  };

  const isChangePositive = () => getCurrentValueChange() > 0;

  const onDeleteAssets = async (assets) => {
    const newAssets = storageAssets.filter(
      (coin) => coin.unique_id !== assets.item.unique_id
    );
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setStorageAssets(newAssets);
  };

  const renderDeleteButton = (data) => {
    return (
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "#ff0000",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingRight: 22,
          marginLeft: 20,
        }}
        onPress={() => onDeleteAssets(data)}
      >
        <FontAwesome5 name="trash" size={24} color="#fffaec" />
      </Pressable>
    );
  };

  return (
    <SwipeListView
      data={assets}
      renderItem={({ item }) => <PortfolioAssetsItem assetItem={item} />}
      rightOpenValue={-65}
      disableRightSwipe
      keyExtractor={({ id }, index) => `${id}${index}`}
      renderHiddenItem={(data) => renderDeleteButton(data)}
      ListHeaderComponent={
        <>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.currentBalance}> Current Balance </Text>
              <Text style={styles.currentBalanceValue}>
                $ {getCurrentBalance().toFixed(2)}
              </Text>
              <Text
                style={{
                  ...styles.valueChange,
                  color: isChangePositive() ? "#16c784" : "#ff0000",
                }}
              >
                $ {getCurrentValueChange()}(All Time)
              </Text>
            </View>
            <View
              style={{
                ...styles.pricePercentageContainer,
                backgroundColor: isChangePositive() ? "#16c784" : "#ff0000",
              }}
            >
              <AntDesign
                name={isChangePositive() ? "caretup" : "caretdown"}
                size={12}
                color={"#fffaec"}
                style={{ alignSelf: "center", marginRight: 5 }}
              />
              <Text style={styles.percentageChange}>
                
                {getCurrentPercentageChange()} %
              </Text>
            </View>
          </View>
          <View style={styles.assetsLabelContainer}>
            <Text style={styles.assetsLabel}> Your Assets </Text>
          </View>
        </>
      }
      ListFooterComponent={
        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("AddNewAssets")}
        >
          <Text style={styles.buttonText}> Add New Assets </Text>
        </Pressable>
      }
    />
  );
};

export default PortfolioAssetsList;

const styles = StyleSheet.create({
  currentBalance: {
    color: "#fffaec",
    fontWeight: "600",
    fontSize: 14,
  },
  currentBalanceValue: {
    color: "#fffaec",
    fontWeight: "700",
    fontSize: 30,
    letterSpacing: 1.5,
  },
  valueChange: {
    fontWeight: "700",
    fontSize: 16,
  },
  percentageChange: {
    fontWeight: "700",
    color: "#fffaec",
    fontSize: 17,
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    alignItems: "center",
    alignContent: "flex-end",
  },
  pricePercentageContainer: {
    flexDirection: "row",
    marginRight: 15,
    backgroundColor: "#007500",
    padding: 10,
    borderRadius: 10,
    alignContent: "flex-end",
  },
  assetsLabel: {
    color: "#fffaec",
    fontWeight: "700",
    fontSize: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  buttonContainer: {
    backgroundColor: "#939598",
    padding: 10,
    alignItems: "center",
    marginVertical: 25,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fffaec",
    fontSize: 17,
    fontWeight: "700",
  },
});
