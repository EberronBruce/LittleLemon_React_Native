import { useState } from "react";
import { View, Image, Text, TextInput } from "react-native";
import { onboardingStyles } from "../Styles.js";
import logo from "../images/logo.png";
import PressableButton from "../components/PressableButton";
import { validateEmail, validateName, } from "../utils/helpers.js";
import { KEY_FIRST_NAME, KEY_ISLOGIN, KEY_LAST_NAME, KEY_PHONE, KEY_EMAIL, } from "../utils/storageKeys";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


const Onboarding = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const isEmailValid = validateEmail(email);
    const isFirstNameValid = validateName(firstName);
    const isLastNameValid = validateName(lastName);

	const navigation = useNavigation();
    

    return (
		<KeyboardAwareScrollView
			contentContainerStyle={onboardingStyles.scrollContainer}
			keyboardShouldPersistTaps="handled"
		>
		<View style={onboardingStyles.logoContainer}>
			<Image style={onboardingStyles.logo} source={logo} />
		</View>
		<Text style={onboardingStyles.title}> Let us get to know you</Text>

		<View style={onboardingStyles.inputContainer}>
			<Text style={onboardingStyles.inputHeader}>First Name</Text>
			<TextInput
				style={onboardingStyles.input}
				value={firstName}
				onChangeText={setFirstName}
				keyboardType="name-phone-pad"
				textContentType="givenName"
				placeholder={"Type your first name"}
			/>
		</View>
		<View style={onboardingStyles.inputContainer}>
			<Text style={onboardingStyles.inputHeader}>Last Name</Text>
			<TextInput
				style={onboardingStyles.input}
				value={lastName}
				onChangeText={setLastName}
				keyboardType="name-phone-pad"
				textContentType="familyName"
				placeholder={"Type your last name"}
			/>
		</View>
		<View style={onboardingStyles.inputContainer}>
			<Text style={onboardingStyles.inputHeader}>Email</Text>
			<TextInput
				style={onboardingStyles.input}
				value={email}
				onChangeText={(text) => setEmail(text.trim())}
				keyboardType="email-address"
				textContentType="emailAddress"
				placeholder={"Type your email"}
			/>
		</View>
		<View style={onboardingStyles.spacer}></View>
		<View style={onboardingStyles.buttonContainer}>
			<PressableButton
				onPress={async () => {
					// Store the values using AsyncStorage
					await AsyncStorage.setItem(KEY_FIRST_NAME, firstName);
					await AsyncStorage.setItem(KEY_LAST_NAME, lastName);
					await AsyncStorage.setItem(KEY_EMAIL, email);
					await AsyncStorage.setItem(KEY_ISLOGIN, JSON.stringify(true));

					// Navigate to the home screen
					navigation.navigate("Profile");
				}}
				disabled={
					!isEmailValid || !isFirstNameValid || !isLastNameValid
				}
			>
				Next
			</PressableButton>
		</View>
	</KeyboardAwareScrollView>
	);
    
};



export default Onboarding;