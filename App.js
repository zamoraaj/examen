import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  Button
} from 'react-native';
import data from './data';
import pastelesBoda from './pastelesBoda'
import Appss from './components/mostrador'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import firebase from 'firebase';


import Portada from './components/portadas'
import promocion from './promocion';
import CreateCakeScreen from "./screens/CreateCakeScreen";
import CakeDetailScreen  from "./screens/CakeDetailScreen";

const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 100; //nombre logo abajo
const LOGO_HEIGHT = 50; //logo abajo
const DOT_SIZE = 40; //puntos de abajo a la derecha
const TICKER_HEIGHT = 15; //logo arriba
const CIRCLE_SIZE = width * 0.4;



const Circle = ({ scrollX }) => {
  return (
    
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map(({ color }, index) => {
        const inputRange = [
          (index - 0.55) * width,
          index * width,
          (index + 0.55) * width,
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.2, 0],
        });
        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                backgroundColor: color,
                opacity,
                transform: [{ scale }],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const Ticker = ({ scrollX }) => {
  const inputRange = [-width, 0, width];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [TICKER_HEIGHT, 0, -TICKER_HEIGHT],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map(({ type }, index) => {
          return (
            <Text key={index} style={styles.tickerText}>
              {type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const Item = ({ imageUri, heading, description, index, scrollX, navigation }) => {

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [
    (index - 0.3) * width,
    index * width,
    (index + 0.3) * width,
  ];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });
  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.7, 0, -width * 0.7],
  });
  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0],
  });

  return (
    <View style={styles.itemStyle}>
      <Animated.Image 
        source={imageUri }onPress={() => navigation.navigate('bodas')} 
      
        style={[
          styles.imageStyle,
          {
            transform: [{ scale }],
          },
        ]}
       
        
      
      />
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
              transform: [{ translateX: translateXHeading }],
            },
          ]}
        >
          {heading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
              transform: [
                {
                  translateX: translateXDescription,
                },
              ],
            },
          ]}
        >
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

const Pagination = ({ scrollX }) => {
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE, 0, DOT_SIZE],
  });
  return (
    <View style={[styles.pagination]}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            position: 'absolute',
            // backgroundColor: 'red',
            transform: [{ translateX }],
          },
        ]}
      />
      {data.map((item) => {
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <View
              style={[styles.paginationDot, { backgroundColor: item.color }]}
            />
           
          </View>
        );
      })}
    </View>
  );
};


function HomeScreen({navigation}){
 const scrollX = React.useRef(new Animated.Value(0)).current;

  return(
   
      <View style={styles.container}>
      
      <StatusBar style='auto' hidden />
      <Circle scrollX={scrollX} />
      <Animated.FlatList
        keyExtractor={(item) => item.key}
        data={data}
        renderItem={({ item, index }) => (
          <Item {...item} index={index} scrollX={scrollX} navigation={navigation} />
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <Image
        style={styles.logo}
        source={require('./assets/logo.png')}
    
    />
      <Pagination scrollX={scrollX} />
      <Ticker scrollX={scrollX} />
      <Button style={styles.button}
        title="BODA"
        onPress={() => navigation.navigate('bodas')}
      />
  
      <Button 
      style={styles.button}
        title="Promoción"
        onPress={() => navigation.navigate('promocion')}
      />
       <Button 
      style={styles.button}
        title="Hacer Pedido"
        onPress={() => navigation.navigate('prueba')}
      />
    </View>
  
   
  )
}
function bodas() {
 const scrollX = React.useRef(new Animated.Value(0)).current;
  
  return (
    <View style={styles.container}>
      
      <StatusBar style='auto' hidden />
      <Circle scrollX={scrollX} />
      <Animated.FlatList
        keyExtractor={(item) => item.key}
        data={pastelesBoda}
        renderItem={({ item, index }) => (
          <Item {...item} index={index} scrollX={scrollX}/>
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <Image
        style={styles.logo}
        source={require('./assets/logo.png')}
    
    />
      <Pagination scrollX={scrollX} />

    </View>
  
  );
}

function Promocion() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  
  return (
    <View style={styles.container}>
      
      <StatusBar style='auto' hidden />
      <Circle scrollX={scrollX} />
      <Animated.FlatList
        keyExtractor={(item) => item.key}
        data={promocion}
        renderItem={({ item, index }) => (
          <Item {...item} index={index} scrollX={scrollX}/>
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
      <Image
        style={styles.logo}
        source={require('./assets/logo.png')}
    
    />
      <Pagination scrollX={scrollX} />

    </View>
  
  );
}

const Stack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="bodas" component={bodas} />
          <Stack.Screen name="promocion" component={Promocion} />
          <Stack.Screen name="prueba" component={CreateCakeScreen} />

        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  alignContent:'center',
  
  },
  container2: {
   
    alignContent:'center',
    
    },
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
	
    width: width * 0.75,
	height: width * 0.75,
	height:height * 0.90,
    resizeMode: 'center',
    flex: 1,
    paddingTop:2,
  },
  textContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    flex: 1,
  },
  heading: {
    color: '#444',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 5,
  },
  description: {
    color: '#ccc',
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  logo: {

	position: 'absolute',
    top: '2%',
    overflow: 'hidden',
    height: TICKER_HEIGHT,
    //opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: 'contain',
    left: '80%',
    bottom: 10,
    
  },
  pagination: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
	justifyContent: 'center',
	
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
	borderColor: '#ddd',
	flex:1
  },
  tickerContainer: {
    position: 'absolute',
    top: '3%',
    left: '1%',
    overflow: 'hidden',
    height: TICKER_HEIGHT,
  },
  tickerText: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: '15%',
  },
  button:{
    flex:1,
    backgroundColor:'red',    
    borderRadius:4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:5
   
  },
});
