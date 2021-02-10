import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView
} from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend,
  VictoryContainer,
  VictoryAxis
} from "victory-native";

// rezar
// rezo
// https://www.youtube.com/watch?v=mjJzaiGkaQA profile screen

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
const chartHeight = Dimensions.get("window").height * 0.3;
const chartWidth = Dimensions.get("window").width;
function Home(props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.componentContainer}>
            <View style={styles.bar}>
              <Text style={styles.barHeader}>Listing Summary</Text>
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardHeader1}>Residential</Text>
                <View style={styles.cardContent}>
                  <View style={styles.innerCard}>
                    <Text>20</Text>
                    <Text>Rent</Text>
                  </View>
                  <View style={styles.space} />
                  <View style={styles.innerCard}>
                    <Text>10</Text>
                    <Text>Sell</Text>
                  </View>
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.cardHeader2}>Commercial</Text>
                <View style={styles.cardContent}>
                  <View style={styles.innerCard}>
                    <Text>20</Text>
                    <Text>Rent</Text>
                  </View>
                  <View style={styles.space} />
                  <View style={styles.innerCard}>
                    <Text>10</Text>
                    <Text>Sell</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <VictoryChart
            height={chartHeight}
            width={chartWidth}
            containerComponent={<VictoryContainer responsive={true} />}
          >
            <VictoryGroup offset={20}>
              <VictoryBar
                horizontal
                data={data1}
                x="quarter"
                y="earnings"
                labels={({ datum }) => datum.earnings}
                // style={{
                //   data: {
                //     fill: "blue"
                //   }
                // }}
                offsetY={20}
                padding={{ top: 20, bottom: 60 }}
                style={{
                  data: { fill: "rgb(23, 52, 76)" },
                  parent: { border: "1px solid #ccc" }
                }}
                // labelComponent={<VictoryLabel dy={30} />}
              />
              {/* <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            dependentAxis
            style={{
              tickLabels: { fontSize: 15, padding: 15, width: 60 }
            }}
            tickValues={[1, 2, 3, 4]}
            tickFormat={["Yes", "No", "Probably", "Never"]}
          /> */}
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
              y={30}
              title="Legend"
              centerTitle
              orientation="horizontal"
              gutter={20}
              // style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
              data={[
                // { name: "Rent", symbol: { fill: "tomato", type: "star" } },
                { name: "Rent", symbol: { fill: "orange" } },
                { name: "Sell", symbol: { fill: "gold" } }
              ]}
            />
          </VictoryChart>
          <Text>Deal Summary</Text>

          <VictoryChart
            height={chartHeight}
            width={chartWidth}
            containerComponent={<VictoryContainer responsive={true} />}
          >
            <VictoryGroup offset={20}>
              <VictoryBar
                horizontal
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
              y={30}
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
          <Text>Deal Summary</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  dealChart: {
    marginTop: 10
  },
  componentContainer: {
    // flex: 1,
    marginBottom: 20
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
