import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryPie } from "victory-native";

// Function to generate pie data with random values for specified age ranges
function generateAgeRangePieData() {
  const ageRanges = ["18-25", "26-35", "36-45", "46-55", "56-65"];
  const data = ageRanges.map((label) => ({
    x: Math.floor(Math.random() * 100) + 1, // Random value for x between 1 and 100
    y: label
  }));
  console.log("Generated Age Range Pie Data:", data); // Log the generated data
  return data;
}

const samplePieData = generateAgeRangePieData();

const Pie = () => {

  return (
    <View style={styles.container}>
      <VictoryPie
        colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
        data={samplePieData}
        labels={({ datum }) => `${datum.y}`} // Show age range on each slice
        width={300}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    width: '100%',
    marginLeft: 0
  }
});


export default Pie