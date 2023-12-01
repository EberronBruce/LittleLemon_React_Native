import { React, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Profile() {
	useEffect(() => {
	    try {
	        AsyncStorage.clear();
	    } catch (error) {
	        console.erroor(error);
	    }
	})

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Profile</Text>
		</View>
	);
}