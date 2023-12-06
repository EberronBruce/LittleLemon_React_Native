import { React} from "react";
import { View, Text, TextInput, } from "react-native";
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
