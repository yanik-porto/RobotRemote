import React from 'react'
import {Text, StyleSheet, View, Button, SafeAreaView, FlatList, TouchableOpacity, Image} from 'react-native'
import BluetoothSerial from 'react-native-bluetooth-serial'
import Toast from '@remobile/react-native-toast'

class Remote extends React.Component {

	constructor(props) {
	  super(props)
	  this.state = {
	    connected: true,
	    unpairedDevices: []
	  }
	  this.timer = null;

	  this._goLeft = this._goLeft.bind(this)
	  this._goRight = this._goRight.bind(this)
	  this._goForward = this._goForward.bind(this)
	  this._goBackward = this._goBackward.bind(this)
	  this._stop = this._stop.bind(this)
	}

	_goForward() {
		console.log("go forward")
		this._write("front\r\n")
	}

	_goBackward() {
		console.log("go backward")
		this._write("back\r\n")
	}

	_goLeft() {
		console.log("go left")
		this._write("left\r\n")
	}

	_stop() {
		console.log("stop")
		this._write("stop\r\n")
	}

	_goRight() {
		console.log("go right")
		this._write("right\r\n")
	}

	stopTimer() {
	  clearTimeout(this.timer);
	}

	componentDidMount() {
		Promise.all([BluetoothSerial.isEnabled(), BluetoothSerial.list()]).then(
		  values => {
		    const [isEnabled, devices] = values;
		    this.setState({ isEnabled, devices, devicesFormatted });
	  		}
	  	).catch((err) => console.log(err.message));

	  	BluetoothSerial.on("bluetoothEnabled", () =>
	  	  console.log("Bluetooth enabled")
	  	);

	  	BluetoothSerial.on("bluetoothDisabled", () =>
	  	  console.log("Bluetooth disabled")
	  	);

	  	BluetoothSerial.on("error", err => {
	  	  console.log("error", err);
	  	});

	  	BluetoothSerial.on("connectionLost", () => {
	  	  if (this.state.device) {
	  	    this.connect(this.state.device)
	  	      .then(res => {})
	  	      .catch(err => {
	  	        console.log("error", err);
	  	      });
	  	  }
	  	});
	}

	/**
	 * Write message to device
	 * @param  {String} message
	 */
	_write (message) {
	  if (!this.state.connected) {
	    Toast.showShortBottom('You must connect to device first')
	  }

	  BluetoothSerial.write(message)
	  .then((res) => {
	    Toast.showShortBottom('Successfuly wrote to device')
	    this.setState({ connected: true })
	  })
	  .catch((err) => Toast.showShortBottom(err.message))
	}

	render() {
		return (
			<SafeAreaView style={styles.main_container}>
				<Text style={styles.main_text}> My Remote </Text>
				<View style={styles.arrows}>
					<View>
						<TouchableOpacity title='Front' onLongPress={this._goForward} onPressOut={this._stop}>
							<Image
							  style={styles.button_image}
							  source={require('../Images/up.png')} />
						</TouchableOpacity>
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
						<TouchableOpacity title='Left' onLongPress={this._goLeft} onPressOut={this._stop}>
							<Image
							  style={styles.button_image}
							  source={require('../Images/left.png')} />
						</TouchableOpacity>
						<TouchableOpacity title='Right' onLongPress={this._goRight} onPressOut={this._stop}>
							<Image
							  style={styles.button_image}
							  source={require('../Images/right.png')} />
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity title='Back' onLongPress={this._goBackward} onPressOut={this._stop}>
							<Image
							  style={styles.button_image}
							  source={require('../Images/down.png')} />
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		)
	}
}


const styles = StyleSheet.create({
	main_container: {
		alignItems: 'center',
		flex: 1
	},
	main_text: {
		flex: 1,
		fontSize: 30
	},
	list: {
	  flex: 1
	},
	button_image: {
		width: 60,
		height: 60
	},
	arrows: {
		flexDirection: 'column', 
		justifyContent: 'center', 
		alignItems: 'center',
		flex: 8
	},
	cameraVideo: {
		flex: 10
  }
})

export default Remote