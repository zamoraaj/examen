import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const CakeScreen = (props) => {
  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    firebase.db.collection("cake").onSnapshot((querySnapshot) => {
      const cakes = [];
      querySnapshot.docs.forEach((doc) => {
        const {type, imagen, heading, description, } = doc.data();
        cakes.push({
          id: doc.id,
          type,
          imagen,
          heading,
          description,
        });
      });
      setCakes(cakes);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateCakeScreen")}
        title="Add Cake"
      />
      {users.map((cake) => {
        return (
          <ListItem
            key={cake.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("CakeDetailScreen", {
                cakeId: cake.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{cake.type}</ListItem.Title>
              <ListItem.Subtitle>{cake.imagen}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default CakeScreen;
