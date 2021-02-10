import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend
} from "victory-native";

const data1 = [
  { quarter: "Jan", earnings: 13 },
  { quarter: "Feb", earnings: 16 },
  { quarter: "Mar", earnings: 14 },
  { quarter: "Apr", earnings: 19 }
];
const data2 = [
  { quarter: "Jan", earnings: 3 },
  { quarter: "Feb", earnings: 6 },
  { quarter: "Mar", earnings: 4 },
  { quarter: "Apr", earnings: 0 }
];
function Home(props) {
  return (
    <View style={styles.container}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryGroup offset={20}>
          <VictoryBar
            data={data1}
            x="quarter"
            y="earnings"
            labels={({ datum }) => datum.earnings}
            style={{
              data: {
                fill: "blue"
              }
            }}
            // labelComponent={<VictoryLabel dy={30} />}
          />
          <VictoryBar
            data={data2}
            x="quarter"
            y="earnings"
            labels={({ datum }) => datum.earnings}
            style={{
              data: {
                fill: "green"
              }
            }}
          />
        </VictoryGroup>

        <VictoryLegend
          x={115}
          y={-30}
          title="Legend"
          centerTitle
          orientation="horizontal"
          gutter={20}
          // style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
          data={[
            { name: "One", symbol: { fill: "tomato", type: "star" } },
            { name: "Two", symbol: { fill: "orange" } },
            { name: "Three", symbol: { fill: "gold" } }
          ]}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
  componentContainer: {
    flex: 1,
    margin: 10
  },
  cardContainer: {
    flexDirection: "row",
    margin: (10, 10, 10, 3),
    width: "100%"
  },
  bar: {
    shadowOpacity: 0.0015 * 5 + 0.18,
    shadowRadius: 0.54 * 1,
    shadowOffset: {
      height: 0.6 * 1
    },
    backgroundColor: "#ffffff",
    width: "100%"
    // marginLeft: 15,
    // marginRight: 15
  },
  barHeader: {
    fontSize: 16,
    fontWeight: "600",
    alignContent: "center",
    padding: 5,
    width: "100%",
    textAlign: "center"
  },
  card: {
    padding: 15,
    shadowOpacity: 0.0015 * 5 + 0.18,
    shadowRadius: 0.54 * 5,
    shadowOffset: {
      height: 0.6 * 5
    },
    backgroundColor: "#ffffff"
  },
  cardContent: {
    flexDirection: "row",
    margin: 10
  },
  innerCard: {
    shadowOpacity: 0.0015 * 5 + 0.18,
    shadowRadius: 0.54 * 5,
    shadowOffset: {
      height: 0.6 * 5
    },
    backgroundColor: "#ffffff",
    padding: 20
  },
  cardHeader1: {
    fontSize: 16,
    fontWeight: "600",
    alignContent: "center",
    textAlign: "left"
  },
  cardHeader2: {
    fontSize: 16,
    fontWeight: "600",
    alignContent: "center",
    textAlign: "right"
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
    margin: 5
  },
  space: {
    margin: 5
  },
  buttonContainer: {
    backgroundColor: "#222",
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: "#fff"
  }
});

export default Home;
