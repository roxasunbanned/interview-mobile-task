import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";

// Function to generate line data with random percentages for each month
function generateMonthlyLineData() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = months.map((month, index) => ({
    x: month,
    y: Math.floor(Math.random() * 101) // Random percentage between 0 and 100
  }));
  console.log("Generated Monthly Line Data:", data); // Log the generated data
  return data;
}

const sampleLineData = generateMonthlyLineData();
const Line = () => {

  return (
    <View style={styles.container}>
    <VictoryChart
      theme={VictoryTheme.material}
    >
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc"}
        }}
        data={sampleLineData}
        x="x"
        y="y" 
      />
    </VictoryChart>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.primary,
    width: '90%',
    marginLeft: -20
  }
});


export default Line