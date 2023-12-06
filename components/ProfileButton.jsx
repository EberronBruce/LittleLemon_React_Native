import { React, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { receiveImage } from "../state/actions";
import {SECONDARY_DARK_COLOR } from "../utils/colors"
import {KEY_IMAGE_URI, KEY_FIRST_NAME, KEY_LAST_NAME,} from "../utils/storageKeys";
import {getAllAsyncStorageItems} from "../utils/helpers";

export default function ProfileButton() {
	const imageURI = useSelector((state) => state.profile.imageUri)
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const navigation = useNavigation();

	useEffect(() => {
		
		getAllAsyncStorageItems()
			.then((data) => {
				setFirstName(data[KEY_FIRST_NAME] ?? "");
				setLastName(data[KEY_LAST_NAME] ?? "");
				dispatch(receiveImage(data[KEY_IMAGE_URI]));
			})
			.catch((error) => {
				console.log("Error retrieving AsyncStorage items:", error);
			});  
	}
    , []);

	return (
		<TouchableOpacity
			style={styles.profileButton}
			onPress={() => navigation.navigate("Profile")}
		>
			{imageURI ? (
				<Image source={{ uri: imageURI }} style={styles.avatar} />
			) : (
				<View style={styles.avatarPlaceholder}>
					<Text style={styles.avatarPlaceholderText}>
						{firstName.charAt(0).toUpperCase()}
						{lastName.charAt(0).toUpperCase()}
					</Text>
				</View>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	profileImage: {
		width: 40,
		height: 40,
		resizeMode: "contain",
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 50,
		resizeMode: "contain",
	},
	avatarPlaceholder: {
		backgroundColor: SECONDARY_DARK_COLOR,
		width: 40,
		height: 40,
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
	},
	avatarPlaceholderText: {
		color: "white",
		fontSize: 15,
	},
});
