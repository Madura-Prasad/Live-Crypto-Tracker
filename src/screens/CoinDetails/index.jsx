import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";
import CoinDetailsHeader from "./component/CoinDetailsHeader";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { getDetailsCoinData, getCoinMarketChart } from "../../services/request";
import FilterComponent from "./component/FilterComponent";
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";

const CoinDetailsScreen = () => {
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const route = useRoute();
  const {
    params: { coinId },
  } = route;

  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [selectedRange, setSelectedRange] = useState("1");

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailsCoinData(coinId);
    // const fetchCoinMarketData = await getCoinMarketChart(coinId);
    setCoin(fetchedCoinData);
    // setCoinMarketData(fetchCoinMarketData);
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    setLoading(false);
  };

  const fetchMarketCoinData = async (selectedRangeValue) => {
    const fetchedCoinMarketData = await getCoinMarketChart(
      coinId,
      selectedRangeValue
    );
    setCoinMarketData(fetchedCoinMarketData);
  };

  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData(1);
  }, []);

  if (loading || !coin || !coinMarketData) {
    return <ActivityIndicator size="large" />;
  }

  const {
    id,
    image: { small },
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
    symbol,
    name,
  } = coin;

  const { prices } = coinMarketData;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ff0000" : "#16c784" || "#fffaec";
  const chartColor = current_price.usd > prices[0][1] ? "#16c784" : "#ff0000";
  const { width: SIZE } = Dimensions.get("window");

  const formatCurrency = ({ value }) => {
    "worklet";
    if (value === "") {
      if (current_price.usd < 1) {
        return `$${current_price.usd}`;
      }
      return `$${current_price.usd.toFixed(2)}`;
    }
    if (current_price.usd < 1) {
      return `$${parseFloat(value)}`;
    }
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const changeCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setUsdValue((floatValue * current_price.usd).toString());
  };

  const changeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / current_price.usd).toString());
  };

  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <LineChart.Provider
        data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
      >
        <CoinDetailsHeader
          coinId={id}
          image={small}
          symbol={symbol}
          market_cap_rank={market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.title1}> {name} </Text>
            <LineChart.PriceText
              format={formatCurrency}
              style={styles.currentPrice}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: 7,
              alignItems: "center",
              borderRadius: 10,
              backgroundColor: percentageColor,
            }}
          >
            <AntDesign
              name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
              size={12}
              color={"#fffaec"}
              style={{ alignSelf: "center", marginRight: 5 }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#fffaec",
              }}
            >
              {price_change_percentage_24h?.toFixed(2)} %
            </Text>
          </View>
        </View>
        <View style={styles.filerContainer}>
          <FilterComponent
            filterDay="1"
            filterText="24H"
            selectedRange={selectedRange}
            setSelectedRange={onSelectedRangeChange}
          />
          <FilterComponent
            filterDay="7"
            filterText="7D"
            selectedRange={selectedRange}
            setSelectedRange={onSelectedRangeChange}
          />
          <FilterComponent
            filterDay="30"
            filterText="30D"
            selectedRange={selectedRange}
            setSelectedRange={onSelectedRangeChange}
          />
          <FilterComponent
            filterDay="365"
            filterText="1Y"
            selectedRange={selectedRange}
            setSelectedRange={onSelectedRangeChange}
          />
          <FilterComponent
            filterDay="max"
            filterText="All"
            selectedRange={selectedRange}
            setSelectedRange={onSelectedRangeChange}
          />
        </View>
        <LineChart height={SIZE / 2} width={SIZE}>
          <LineChart.Path color={chartColor} />
        </LineChart>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                color: "#fffaec",
                fontWeight: "700",
                alignSelf: "center",
                marginLeft: 10,
              }}
            >
              {symbol.toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={coinValue.toString()}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            />
          </View>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                alignSelf: "center",
                color: "#fffaec",
              }}
            >
              USD
            </Text>
            <TextInput
              style={styles.input}
              value={usdValue}
              keyboardType="numeric"
              onChangeText={changeUsdValue}
            />
          </View>
        </View>
      </LineChart.Provider>
    </View>
  );
};

export default CoinDetailsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    alignSelf: "center",
    color: "#fffaec",
  },
  title1: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fffaec",
    marginTop: 15,
  },
  priceTitle: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#fffaec",
  },
  priceContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fffaec",
  },
  input: {
    width: 130,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#fffaec",
    padding: 10,
    color: "#fffaec",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  filerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#000000",
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
  },
  currentPrice: {
    color: "#fffaec",
    fontSize: 30,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
