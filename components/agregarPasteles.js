import React, { Component,useState,useEffect } from "react";



import {
  View,
  Image,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

import {
  Icon,
  listItems,
  Avatar,
  ListItem,
  Divider,
} from "react-native-elements";
import { render } from "react-dom";



const url ='';
const FormularioPasteles = (props) => {
  const [pasteles, setPasteles] = useState({
    pasteles:""
  });
  useEffect(()=>{
    
 },[pasteles])

  const entrar = async()=>{
    //https://dsalinas.pythonanywhere.com/api/preguntas
    //api/token
           await fetch(url,{
            method:'POST',
            body: JSON.stringify(pasteles),
            headers: {
                'Content-Type': 'application/json'
            },
                
    })
        .then((resp) => resp.json())
        .then((resp) =>console.log(resp)
        )
        .catch((error)=>{
          console.log(error);

        });
       
}
  const Mostrarlista = () => {
    if (pasteles.nombre === "") {
      alert("faltan campos por llenar");
      
    } else {
      
      entrar()
      props.navigation.navigate("mostrador");
      
    }
  };

 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.Avatar}>
        <Text>Agregar Tipo Pastel </Text>
        </View>
        <View style={styles.imputgroup}>
          <Text>Tipo: </Text>
          <View style={styles.text}>
          <TextInput
           onChangeText={(text) =>
             setPasteles({ ...pasteles, pasteles: text })
           }
           placeholder="tipo"
         />
          </View>
          <View style={styles.button}>
          <Button
            color="#19AC52"
            title="Agregar"
            onPress={() => Mostrarlista()}
          />
        </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item1:{backgroundColor:"#808080"},
  item2:{backgroundColor:"#a9a9a9"},
  container: {
    flex: 1,
    backgroundColor: "#18448f",
    padding: 35,

  },
  

  disket: {
    marginTop: 5,
    width: 20, 
    height: 20,
  },
  subcontainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginTop: 20,
  },
  imputgroup: {
    padding: 10,
    marginBottom: 15,
    borderBottomColor: "#cccccc",
  },
  Cabecera: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    marginBottom: 15,
    borderRadius: 10,
    paddingBottom: 15,
    paddingTop: 15,
  },

  text: {
    borderBottomWidth:0.1,
    borderRadius: 2,
  },
  
 

  Avatar: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    paddingTop: 15,
  },
});
export default FormularioCategoria;