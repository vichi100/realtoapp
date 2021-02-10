import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const character = {
  name: "Luke Skywalker",
  home: "Tatooine",
  species: "human"
};

function Home(props) {
  const { navigation } = props;
  return (
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

      <View style={styles.componentContainer}>
        <View style={styles.bar}>
          <Text style={styles.barHeader}>Deal Summary</Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardHeader1}>Won</Text>
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
            <Text style={styles.cardHeader2}>Lost</Text>
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

      <View style={styles.componentContainer}>
        <View style={styles.bar}>
          <Text style={styles.barHeader}>New Listing Added last month</Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardHeader1}>Won</Text>
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
            <Text style={styles.cardHeader2}>Lost</Text>
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

      {/* <Text style={styles.text}>Home Screen</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("Detail", { item: character })}
      >
        <Text style={styles.buttonText}>Who is {character.name}?</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#ebebeb"
    // margin: 10
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
