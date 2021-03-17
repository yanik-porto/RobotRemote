import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator  } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Remote from '../Components/Remote'
import BluetoothConnection from '../Components/BluetoothConnection'
import CameraStream from '../Components/CameraStream'

const MenuTabNavigator = createBottomTabNavigator({
  BluetoothConnection: {
    screen: BluetoothConnection,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Images/bluetooth.png')}
          style={styles.icon}/>
      }
    }
  },
  Remote: {
    screen: Remote,
    navigationOptions: {
    	tabBarIcon: () => {
    		return <Image
    		  source={require('../Images/ic_joystick.png')}
    		  style={styles.icon}/>
    	}
    }
  }, 
  CameraStream: {
    screen: CameraStream,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Images/eye-round.png')}
          style={styles.icon}/>
      }
    }
  }
},
{
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
    inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
    showLabel: false, // On masque les titres
    showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
  }
})

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

const AppContainer = createAppContainer(MenuTabNavigator)
export default AppContainer