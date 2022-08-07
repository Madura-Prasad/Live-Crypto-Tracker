import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const FilterComponent = (props) => {
  const { filterDay, filterText, selectedRange, setSelectedRange } = props;
  const isFilterSelected = (filter) => filter === selectedRange;
  return (
    <Pressable
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: isFilterSelected(filterDay)
          ? "#939598"
          : "transparent",

        borderRadius: 5,
      }}
      onPress={() => setSelectedRange(filterDay)}
    >
      <Text
        style={{
          color: isFilterSelected(filterDay) ? "#fffaec" : "#fffa88",
          fontWeight: "600",
        }}
      >
        {filterText}
      </Text>
    </Pressable>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({});
