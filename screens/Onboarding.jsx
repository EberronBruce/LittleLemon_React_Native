import { useState } from "react";
import {
	View,
	Image,
	Alert,
	Text,
	TextInput,
	Stylesheet,
	KeyboardAvoidingView,
	Platform,
    ScrollView
} from "react-native";
import { onboardingStyles, inputStyles } from "../Styles.js";
import logo from "../images/logo.png";
import PressableButton from "../components/PressableButton";
import { validateEmail, validateName, KEY_FIRST_NAME, KEY_ISLOGIN, KEY_LAST_NAME, KEY_PHONE, KEY_EMAIL } from "../utils";
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
			//style={onboardingStyles.container}
			contentContainerStyle={onboardingStyles.scrollContainer}
			keyboardShouldPersistTaps="handled"
		>
			{/* <KeyboardAvoidingView
				style={onboardingStyles.container}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView
					contentContainerStyle={onboardingStyles.scrollContainer}
					keyboardShouldPersistTaps="handled"
				> */}
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
				{/* </ScrollView>
			</KeyboardAvoidingView> */}
		</KeyboardAwareScrollView>
		);
    
};

// const onboardingStyles = onboardingStylesheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: "center",
// 		justifyContent: "flex-start",
// 	},
// 	scrollContainer: {
// 		flexGrow: 1,
// 		alignItems: "center",
// 		justifyContent: "flex-start",
// 	},
// 	logoContainer: {
// 		paddingTop: 20,
// 		width: "100%",
// 		alignItems: "center",
// 	},
// 	logo: {
// 		resizeMode: "contain",
// 		height: 100,
// 		width: "70%",
// 	},
// 	title: {
// 		padding: 50,
// 		fontSize: 24,
// 		fontWeight: "bold",
// 		textAlign: "center",
// 	},
// 	inputContainer: {
// 		alignItems: "center",
// 		justifyContent: "center",
// 		width: "100%",
// 		marginTop: 10,
// 		marginBottom: 10,
// 	},
// 	input: {
// 		height: 40,
// 		borderRadius: 8,
// 		borderWidth: 1,
// 		padding: 10,
// 		fontSize: 16,
// 		borderColor: "#333333",
// 		width: "90%",
// 	},
// 	inputHeader: {
// 		fontSize: 20,
// 		fontWeight: "bold",
// 		paddingBottom: 10,
// 		alignContent: "flex-start",
// 		alignItems: "flex-start",
// 		justifyContent: "flex-start",
// 		width: "90%",
// 	},
// 	buttonContainer: {
// 		width: "80%",
// 		paddingBottom: 40,
// 		paddingTop: 50,
// 	},
// 	spacer: {
// 		flex: 2,
// 	},
// });


export default Onboarding;