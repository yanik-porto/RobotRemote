import React from 'react'
import {Text, StyleSheet, View, Button, SafeAreaView} from 'react-native'
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';

class CameraStream extends React.Component {

	constructor(props) {
	  super(props)
	}

	render() {
		return (
				<WebView source={{uri: 'http://192.168.0.27:5000/'}}	/>
			)
	}
}

export default CameraStream