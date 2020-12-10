import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { Permissions, ImagePicker } from "expo";
import firebase from 'firebase';
import 'firebase/storage';

//import firebase from "../database/firebase";

const AddCakeScreen = (props) => {
  const initialState = {
    userId: "",
    imagen: "",
    type: '',
    heading: '',
    description:'',
    
    
  }

const uploadImage = uri => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };

      xhr.open("GET", uri);
      xhr.responseType = "blob";
      xhr.send();
    });
  };

  const openGallery = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (resultPermission) {
      const resultImagePicker = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (resultImagePicker.cancelled === false) {
        const imageUri = resultImagePicker.uri;
        const { typeId } = initialState;

        this.uploadImage(imageUri)
          .then(resolve => {
            let ref = firebase
              .storage()
              .ref()
              .child(`images/${typeId}`);
            ref
              .put(resolve)
              .then(resolve => {
                console.log("Imagen subida correctamente");
              })
              .catch(error => {
                console.log("Error al subir la imagen");
              });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };

  
  

  const [state, setState] = useState(initialState);

  const handleChangeText = (value, type) => {
    setState({ ...state, [type]: value });
  };

  const saveNewCake = async () => {
    if (state.type === "") {
      alert("please provide a type");
    } else {

      try {
        await firebase.db.collection("cake").add({
          type:state.type,
          imagen:state.imagen,
          heading: state.heading,
          description:state.description,
        });

        props.navigation.navigate("CakesList");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* type Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Tipo de pastel"
          onChangeText={(value) => handleChangeText(value, "type")}
          value={state.type}
        />
      </View>

       <View style={styles.container}>
        <Button
          onPress={() => openGallery()}
          title="Selecionar una imagen"
          color="#841584"
        />
       
      </View>

      {/* imagen Input */}
      <View style={styles.inputGroup}>
        <Image
          Image={(value) => handleChange(value, "imagen")}
          value={state.imagen}
        />
      </View>

      {/* heading */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Tamaño en libras"
          onChangeText={(value) => handleChangeText(value, "heading")}
          value={state.heading}
        />
      </View>

      {/* description */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder=" Descripción del producto"
          onChangeText={(value) => handleChangeText(value, "description")}
          value={state. description}
        />
      </View>


      <View style={styles.button}>
        <Button title="Save Cake" onPress={() => saveNewCake()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
});

export default AddCakeScreen;
