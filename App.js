import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import WatchlistProvider from "./src/Contexts/WatchlistContext";
import { RecoilRoot } from "recoil";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    customFont: require("./assets/fonts/customFont.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: "#0c3c4c",
        },
      }}
    >
      <RecoilRoot>
        <WatchlistProvider>
          <View style={styles.container}>
            <Navigation />
            <StatusBar hidden={true} style="light" />
          </View>
        </WatchlistProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c3c4c",
    paddingTop: 25,
  },
});
