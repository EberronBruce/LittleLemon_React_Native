import { React, useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TextInput,
	ActivityIndicator,
} from "react-native";
import PressableButton from "../components/PressableButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	PRIMARY_GREEN_COLOR,
	HIGHLIGHT_DARK_COLOR,
	HIGHLIGHT_LIGHT_COLOR,
	PRIMARY_YELLOW_COLOR,
	SECONDARY_LIGHT_COLOR,
	SECONDARY_DARK_COLOR,
	validateEmail,
	validateName,
	KEY_ISLOGIN,
	KEY_FIRST_NAME,
	KEY_LAST_NAME,
	KEY_EMAIL,
	KEY_PHONE,
} from "../utils";
import { inputStyles } from "../Styles.js";
import { MaskedTextInput } from "react-native-mask-text";

export default function ContactForm({
	firstName,
	setFirstName,
	lastName,
	setLastName,
	email,
	setEmail,
	phone,
	setPhone,
	onSaveProfileChanges,
}) {
	return (
		<View>
			<View style={inputStyles.inputContainer}>
				<Text style={inputStyles.inputHeader}>First Name</Text>
				<TextInput
					style={inputStyles.input}
					value={firstName}
					onChangeText={setFirstName}
					keyboardType="name-phone-pad"
					textContentType="givenName"
					placeholder={"Type your first name"}
				/>
			</View>
			<View style={inputStyles.inputContainer}>
				<Text style={inputStyles.inputHeader}>Last Name</Text>
				<TextInput
					style={inputStyles.input}
					value={lastName}
					onChangeText={setLastName}
					keyboardType="name-phone-pad"
					textContentType="familyName"
					placeholder={"Type your last name"}
				/>
			</View>
			<View style={inputStyles.inputContainer}>
				<Text style={inputStyles.inputHeader}>Email</Text>
				<TextInput
					style={inputStyles.input}
					value={email}
					onChangeText={(text) => setEmail(text.trim())}
					keyboardType="email-address"
					textContentType="emailAddress"
					placeholder={"Type your email"}
				/>
			</View>
			<View style={inputStyles.inputContainer}>
				<Text style={inputStyles.inputHeader}>Phone Number</Text>
				<MaskedTextInput
					mask="(999) 999-9999"
					style={inputStyles.input}
					value={phone}
					onChangeText={(text) => setPhone(text.trim())}
					keyboardType="phone-pad"
					textContentType="telephoneNumber"
					placeholder={"Type your phone"}
                    returnKeyType="done"
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: "flex-start",
		paddingHorizontal: 20,
		paddingTop: 8,
	},
	pictureInfoContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		alignSelf: "center",
	},
	avatarContainer: {
		flexDirection: "column",
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		resizeMode: "contain",
	},
	buttonSpacing: {
		marginStart: "5%",
		marginTop: "3%",
	},
	avatarText: {
		fontSize: 10,
		fontWeight: "300",
	},
});