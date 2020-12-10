import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const CakeDetailScreen = (props) => {
  const initialState = {
    id: "",
    type: '',
    imagen:'',
    heading: '',
    description: '',
  };

  const [cake, setCake] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setCake({ ...cake, [prop]: value });
  };

  const getCakeById = async (id) => {
    const dbRef = firebase.db.collection("cakes").doc(id);
    const doc = await dbRef.get();
    const cake = doc.data();
    setCake({ ...cake, id: doc.id });
    setLoading(false);
  };

  const deleteCake = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("cakes")
      .doc(props.route.params.userId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("CakesList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the Cake",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteCake() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateCake = async () => {
    const cakeRef = firebase.db.collection("cakes").doc(cake.id);
    await cakeRef.set({
      type: cake.type,
      imagen:cake.imagen,
      heading: cake.heading,
      description: cake.description,
    });
    setCake(initialState);
    props.navigation.navigate("CakesList");
  };

  useEffect(() => {
    getUserById(props.route.params.cakeId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Type"
          autoCompleteType="typename"
          style={styles.inputGroup}
          value={cake.type}
          onChangeText={(value) => handleTextChange(value, "type")}
        />
      </View>
       {/* imagen Input */}
       <View style={styles.inputGroup}>
        <Image
          placeholder="Imagen"
    
          onChangeText={(value) => handleTextChange(value, "imagen")}
          value={cake.imagen}
        />
      </View>
      <View>
        <TextInput
          placeholder="Heading"
          style={styles.inputGroup}
          value={cake.heading}
          onChangeText={(value) => handleTextChange(value, "heading")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateCake()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default CakeDetailScreen;
