import React, { useEffect } from "react";
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

const rent = [
  { quarter: "Jan", earnings: 13 },
  { quarter: "Feb", earnings: 1 },
  { quarter: "Mar", earnings: 0 },
  { quarter: "Apr", earnings: 0 }
];
const sell = [
  { quarter: "Jan", earnings: 10 },
  { quarter: "Feb", earnings: 0 },
  { quarter: "Mar", earnings: 0 },
  { quarter: "Apr", earnings: 0 }
];

const winDealData = [
  { quarter: "Jan", earnings: 13 },
  { quarter: "Feb", earnings: 16 },
  { quarter: "Mar", earnings: 14 },
  { quarter: "Apr", earnings: 19 }
];
const lostDealData = [
  { quarter: "Jan", earnings: 3 },
  { quarter: "Feb", earnings: 6 },
  { quarter: "Mar", earnings: 4 },
  { quarter: "Apr", earnings: 10 }
];

const chartHeight = Dimensions.get("window").height * 0.3;
const chartWidth = Dimensions.get("window").width;
const Home = props => {
  const { navigation } = props;
  // useEffect(() => {
  //   console.log("home");
  //   navigation.navigate("Login");
  // }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={[
              styles.componentContainer,
              { marginLeft: 10, marginRight: 10 }
            ]}
          >
            <View style={styles.bar}>
              <Text style={styles.barHeader}>Listing Summary</Text>
            </View>
            <View
              style={[
                styles.cardContainer,
                { marginLeft: 10, marginRight: 10 }
              ]}
            >
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
            // height={chartHeight}
            // width={chartWidth}
            containerComponent={<VictoryContainer responsive={true} />}
            // minDomain={{ y: 0 }}
            // domainPadding={{ y: 1 }}
          >
            <VictoryGroup offset={20}>
              <VictoryBar
                horizontal
                data={rent}
                // barRatio={0.8}
                // barWidth={({ index }) => index * 2 + 8}
                x="quarter"
                y="earnings"
                labels={({ datum }) => datum.earnings}
                // style={{
                //   data: {
                //     fill: "#00b0ff"
                //   }
                // }}
                offsetY={20}
                // padding={{ top: 50, bottom: 60 }}
                style={{
                  data: { fill: "#00b0ff" }
                  // parent: { border: "1px solid #ccc" }
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
                data={sell}
                // barWidth={({ index }) => index * 2 + 8}
                x="quarter"
                y="earnings"
                labels={({ datum }) => datum.earnings}
                style={{
                  data: {
                    fill: "#d500f9"
                  }
                }}
              />
            </VictoryGroup>

            <VictoryLegend
              x={200}
              y={20}
              // title="Legend"
              centerTitle
              orientation="horizontal"
              // gutter={10}
              style={{
                // border: { stroke: "black" },
                // title: { fontSize: 20 },
                margin: 30
              }}
              data={[
                // { name: "Rent", symbol: { fill: "tomato", type: "star" } },
                { name: "Rent", symbol: { fill: "#00b0ff" } },
                { name: "Sell", symbol: { fill: "#d500f9" } }
              ]}
            />
          </VictoryChart>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "rgba(128,128,128, .9)",
              marginBottom: 20
            }}
          >
            Listing Summary / Months
          </Text>

          <VictoryChart
            // height={chartHeight}
            // width={chartWidth}
            containerComponent={<VictoryContainer responsive={true} />}
          >
            <VictoryGroup offset={20}>
              <VictoryBar
                horizontal
                data={winDealData}
                x="quarter"
                y="earnings"
                labels={({ datum }) => datum.earnings}
                style={{
                  data: {
                    fill: "#6fbf73"
                  }
                }}
                // labelComponent={<VictoryLabel dy={30} />}
              />
              <VictoryBar
                data={lostDealData}
                x="quarter"
                y="earnings"
                labels={({ datum }) => datum.earnings}
                style={{
                  data: {
                    fill: "#ff9100"
                  }
                }}
              />
            </VictoryGroup>

            <VictoryLegend
              x={200}
              y={4}
              // title="Legend"
              centerTitle
              orientation="horizontal"
              gutter={20}
              // style={{ border: { stroke: "black" }, title: { fontSize: 20 } }}
              data={[
                // { name: "One", symbol: { fill: "tomato", type: "star" } },
                { name: "Won", symbol: { fill: "#6fbf73" } },
                { name: "Lost", symbol: { fill: "#ff9100" } }
              ]}
            />
          </VictoryChart>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "rgba(128,128,128, .9)",
              marginBottom: 20
            }}
          >
            Deal Summary / Months
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    margin: (10, 10, 10, 3)
    // width: "90%"
  },
  bar: {
    shadowOpacity: 0.0015 * 5 + 0.18,
    shadowRadius: 0.54 * 1,
    shadowOffset: {
      height: 0.6 * 1
    },
    backgroundColor: "#ffffff"
    // width: "90%"
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
