import { useState } from "react";
import {
	View,
	Image,
	Alert,
	Text,
	TextInput,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
    ScrollView
} from "react-native";
import logo from "../images/logo.png";
import PressableButton from "../components/PressableButton";
import { validateEmail, validateName } from "../utils";


const Onboarding = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const isEmailValid = validateEmail(email);
    const isFirstNameValid = validateName(firstName);
    const isLastNameValid = validateName(lastName);
    

    return (
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContainer}
					keyboardShouldPersistTaps="handled"
				>
					<View style={styles.logoContainer}>
						<Image style={styles.logo} source={logo} />
					</View>
					<Text style={styles.title}> Let us get to know you</Text>

					<View style={styles.inputContainer}>
						<Text style={styles.inputHeader}>First Name</Text>
						<TextInput
							style={styles.input}
							value={firstName}
							onChangeText={setFirstName}
							keyboardType="name-phone-pad"
							textContentType="givenName"
							placeholder={"Type your first name"}
						/>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.inputHeader}>Last Name</Text>
						<TextInput
							style={styles.input}
							value={lastName}
							onChangeText={setLastName}
							keyboardType="name-phone-pad"
							textContentType="familyName"
							placeholder={"Type your last name"}
						/>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.inputHeader}>Email</Text>
						<TextInput
							style={styles.input}
							value={email}
							onChangeText={(text) => setEmail(text.trim())}
							keyboardType="email-address"
							textContentType="emailAddress"
							placeholder={"Type your email"}
						/>
					</View>
					<View style={styles.spacer}></View>
					<View style={styles.buttonContainer}>
						<PressableButton
							onPress={() => {
								Alert.alert("Testing Go to next page");
							}}
							disabled={!isEmailValid || !isFirstNameValid || !isLastNameValid}
						>
							Next
						</PressableButton>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		);
    
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	scrollContainer: {
		flexGrow: 1,
		alignItems: "center",
	},
	logoContainer: {
		paddingTop: 50,
		width: "100%",
		alignItems: "center",
	},
	logo: {
		resizeMode: "contain",
		height: 100,
		width: "75%",
	},
	title: {
		padding: 50,
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
	},
	inputContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		marginTop: 10,
		marginBottom: 10,
	},
	input: {
		height: 40,
		borderRadius: 8,
		borderWidth: 1,
		padding: 10,
		fontSize: 16,
		borderColor: "#333333",
		width: "90%",
	},
	inputHeader: {
		fontSize: 20,
		fontWeight: "bold",
		paddingBottom: 10,
		alignContent: "flex-start",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		width: "90%",
	},
	buttonContainer: {
		width: "80%",
		paddingBottom: 40,
        paddingTop: 50
	},
    spacer: {
        flex:2
    }
});


export default Onboarding;