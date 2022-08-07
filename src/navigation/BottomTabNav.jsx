import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons, Fontisto, AntDesign } from "@expo/vector-icons";
import WatchList from "../screens/WatchList";
import Portfolio from "../screens/portfolio";

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#bcbabc",
        tabBarInactiveTintColor: "#7a7985",
        tabBarStyle: {
          backgroundColor: "#2c2443",
          borderColor: "#2c2443",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name="md-home" size={focused ? 24 : 20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Fontisto name="graphql" size={focused ? 24 : 20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="WatchList"
        component={WatchList}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="star" size={focused ? 24 : 20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;

const styles = StyleSheet.create({});
