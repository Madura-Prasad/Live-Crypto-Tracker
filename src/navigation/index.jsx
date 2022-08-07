import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoinDetailsScreen from "../screens/CoinDetails";
import BottomTabNav from "./BottomTabNav";
import AddNewAssets from "../screens/AddNewAssets";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name={"Root"}
        component={BottomTabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"CoinDetailsScreen"}
        component={CoinDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"AddNewAssets"}
        component={AddNewAssets}
        options={{
          title: "Add New Assets",
          headerStyle: {
            backgroundColor: "#0c3c4c",
          },
          headerTintColor: "#fffaec",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
