import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Switch
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EmployeeAccess from "./EmployeeAccess";

// https://aboutreact.com/example-of-gridview-using-flatlist-in-react-native/
// https://medium.com/@KPS250/creating-image-slider-with-flatlist-in-react-native-1815d3793d99

const data = [
  {
    name: "Miyah Myles",
    email: "miyah.myles@gmail.com",
    position: "Data Entry Clerk"
  },
  {
    name: "June Cha",
    email: "june.cha@gmail.com",
    position: "Sales Manager",
    photo: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Iida Niskanen",
    email: "iida.niskanen@gmail.com",
    position: "Sales Manager",
    photo: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Renee Sims",
    email: "renee.sims@gmail.com",
    position: "Medical Assistant",
    photo: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Jonathan Nu\u00f1ez",
    email: "jonathan.nu\u00f1ez@gmail.com",
    position: "Clerical",
    photo: "https://randomuser.me/api/portraits/men/43.jpg"
  },
  {
    name: "Sasha Ho",
    email: "sasha.ho@gmail.com",
    position: "Administrative Assistant",
    photo:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb"
  },
  {
    name: "Abdullah Hadley",
    email: "abdullah.hadley@gmail.com",
    position: "Marketing",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f"
  },
  {
    name: "Thomas Stock",
    email: "thomas.stock@gmail.com",
    position: "Product Designer",
    photo:
      "https://tinyfac.es/data/avatars/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
  },
  {
    name: "Veeti Seppanen",
    email: "veeti.seppanen@gmail.com",
    position: "Product Designer",
    photo: "https://randomuser.me/api/portraits/men/97.jpg"
  },
  {
    name: "Bonnie Riley",
    email: "bonnie.riley@gmail.com",
    position: "Marketing",
    photo: "https://randomuser.me/api/portraits/women/26.jpg"
  }
];

const EmployeeList = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const Item = ({ item }) => {
    return <EmployeeAccess item={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.email}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F7F7F7",
    backgroundColor: "#ffffff",
    marginTop: 0
  },
  listItem: {
    // width: "80%",
    // flex: 1,
    // alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  }
});

export default EmployeeList;
