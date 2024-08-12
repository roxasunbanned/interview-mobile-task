import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory-native";

const data = [
  { quarter: 1, earnings: getRandomNumber(1000, 20000) },
  { quarter: 2, earnings: getRandomNumber(1000, 20000) },
  { quarter: 3, earnings: getRandomNumber(1000, 20000) },
  { quarter: 4, earnings: getRandomNumber(1000, 20000) }
];

function getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

const Barchart = () => {
    
  return (
    <View style={styles.container}>
        <VictoryChart
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={40}
        >
        <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3, 4]}
            tickFormat={["Q1", "Q2", "Q3", "Q4"]}
        />
        <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(x) => (`£${x / 1000}k`)}
        />
        <VictoryBar
            data={data}
            x="quarter"
            y="earnings"
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
    marginLeft: 10,
    width: '100%'
  }
});


export default Barchart