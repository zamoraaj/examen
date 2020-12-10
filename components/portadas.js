import React from 'react'
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'


const takeImage = async () => {
  // make sure that we have the permission
  const hasPermission = await askForPermission()
  if (!hasPermission) {
    return
  } else {
    // launch the camera with the following settings
    let image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    })
    // make sure a image was taken:
    if (!image.cancelled) {
      fetch('http://192.168.2.111:8080/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // send our base64 string as POST request
        body: JSON.stringify({
          imgsource: image.base64,
        }),
      })
    }
  }
}
const  mostrando=()=> {

const askForPermission = async () => {
  const permissionResult = await Permissions.askAsync(Permissions.CAMERA)
  if (permissionResult.status !== 'granted') {
    Alert.alert('no permissions to access camera!', [{ text: 'ok' }])
    return false
  }
  return true
}


	
  
	return (
		<View style={styles.container}>
			<Button title="Take a foto" onPress={takeImage} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

const server=()=>{
  const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '15MB' }))

app.post('/', (req, res) => {
	fs.writeFile('./out.png', req.body.imgsource, 'base64', (err) => {
		if (err) throw err
	})
	res.status(200)
})
app.listen(8080)
}
export default mostrando;