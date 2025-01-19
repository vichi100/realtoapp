import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Switch
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ContactList = props => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
      </View>

      <View style={styles.container}>
        <FlatList
          data={data}
          //data defined in constructor
          // ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.fab}>
          <TouchableOpacity
            onPress={() => toggleSortingBottomNavigationView()}
            style={styles.fabIcon1}
          >
            <MaterialCommunityIcons name="sort" color={"#ffffff"} size={26} />
          </TouchableOpacity>
          <View style={styles.verticalLine}></View>
          <TouchableOpacity
            onPress={() => toggleBottomNavigationView()}
            style={styles.fabIcon2}
          >
            <MaterialCommunityIcons
              name="filter-variant-plus"
              color={"#ffffff"}
              size={26}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactList;
