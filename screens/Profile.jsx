import { React, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';
import PressableButton from "../components/PressableButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { receiveImage } from "../state/actions";
import { useNavigation } from "@react-navigation/native";
import {
    PRIMARY_GREEN_COLOR,
	HIGHLIGHT_DARK_COLOR,
	HIGHLIGHT_LIGHT_COLOR,
	PRIMARY_YELLOW_COLOR,
	SECONDARY_LIGHT_COLOR,
	SECONDARY_DARK_COLOR,
    LIGHT_GRAY_COLOR,
    OFF_WHITE_COLOR,
	validateEmail,
	validateName,
    KEY_ISLOGIN,
    KEY_FIRST_NAME,
    KEY_LAST_NAME,
    KEY_EMAIL,
    KEY_PHONE,
    KEY_IMAGE_URI,
    saveChanges,
    isValidPhoneNumber,
    KEY_OFFERS,
    KEY_NEWSLETTER
} from "../utils";
import {inputStyles } from "../Styles.js";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AvatarContainer from "../components/AvatarContainer";
import ContactForm from '../components/ContactForm.jsx';



const getAllAsyncStorageItems = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);
        const data = {};

        items.forEach(([key, value]) => {
            data[key] = value;
        })

        return data;
        
    } catch (error) {
        console.log("Error retrieving AsyncStorage items:", error);
		return null;
    }
}


export default function Profile() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isOrderChecked, setIsOrderChecked] = useState(false);
    const [isNewsletterChecked, setIsNewsletterChecked] = useState(false);
    const [imageUri, setImageUri] = useState(null);
	const dispatch = useDispatch();
	const navigation = useNavigation();

    const isEmailValid = validateEmail(email);
    const isFirstNameValid = validateName(firstName);
    const isLastNameValid = validateName(lastName);


    useEffect(() => {
        getAllAsyncStorageItems()
        .then((data) => {
            setFirstName(data[KEY_FIRST_NAME] ?? "");
            setLastName(data[KEY_LAST_NAME] ?? "");
            setEmail(data[KEY_EMAIL] ?? "");
            setPhone(data[KEY_PHONE] ?? "");
            setIsNewsletterChecked(JSON.parse(data[KEY_NEWSLETTER] ?? "false"));
            setIsOrderChecked(JSON.parse(data[KEY_OFFERS] ?? "false"));
        })
        .catch((error) => {
            console.log("Error retrieving AsyncStorage items:", error);
        });
    
	}, []);

    const onSaveImageChanges = () => {
		saveChanges(KEY_IMAGE_URI, imageUri);
		dispatch(receiveImage(imageUri));
	};

    const onSaveProfileChanges = () => {
        if (validateEmail(email)) {saveChanges(KEY_EMAIL, email);} 
        if (validateName(firstName)) {saveChanges(KEY_FIRST_NAME, firstName);} 
        if (validateName(lastName)) {saveChanges(KEY_LAST_NAME, lastName);}
        if (isValidPhoneNumber(phone)) {saveChanges(KEY_PHONE, phone);}
        saveChanges(KEY_OFFERS, JSON.stringify(isOrderChecked));
        saveChanges(KEY_NEWSLETTER, JSON.stringify(isNewsletterChecked));
    }

    const onSaveChanges = () => {
		onSaveImageChanges(); // Call the onSaveProfileChanges prop function from the Profile component
        onSaveProfileChanges();
	};

	const Logout = async () => {
		    // Clear all AsyncStorage items
		try {
			await AsyncStorage.clear();
			console.log("AsyncStorage cleared");
			navigation.popToTop();
		} catch (error) {
			console.log("Error clearing AsyncStorage:", error);
		}

		navigation.reset({
			index: 0,
			routes: [{ name: "Onboarding" }],
		});
	}


    const isDataLoaded = firstName.length > 0 && lastName.length > 0;    

	return (
		<KeyboardAwareScrollView
			contentContainerStyle={styles.container}
			keyboardShouldPersistTaps="handled"
		>
			<Text style={styles.title}>Personal Information</Text>
			{isDataLoaded ? (
				<AvatarContainer
					firstName={firstName}
					lastName={lastName}
					imageUri={imageUri}
					setImageUri={setImageUri}
					onSaveProfileChanges={onSaveImageChanges}
				/>
			) : (
				<ActivityIndicator />
			)}
			<ContactForm
				firstName={firstName}
				setFirstName={setFirstName}
				lastName={lastName}
				setLastName={setLastName}
				email={email}
				setEmail={setEmail}
				phone={phone}
				setPhone={setPhone}
				onSaveProfileChanges={onSaveProfileChanges}
			/>
			<View style={styles.emailNotificationsContainer}>
				<Text style={styles.title}>Email Notifications</Text>
				<CheckBox
					title="Order statues"
					checked={isOrderChecked}
					onPress={() => setIsOrderChecked(!isOrderChecked)}
					containerStyle={{
						backgroundColor: "transparent",
						borderColor: "transparent",
						padding: 0,
					}}
					checkedColor={PRIMARY_GREEN_COLOR}
					uncheckedColor={PRIMARY_GREEN_COLOR}
				/>
				<CheckBox
					title="Newsletter"
					checked={isNewsletterChecked}
					onPress={() => setIsNewsletterChecked(!isNewsletterChecked)}
					containerStyle={{
						backgroundColor: "transparent",
						borderColor: "transparent",
						padding: 0,
					}}
					checkedColor={PRIMARY_GREEN_COLOR}
					uncheckedColor={PRIMARY_GREEN_COLOR}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<View style={styles.saveDiscardContainer}>
					<PressableButton
						onPress={onSaveChanges}
						fontWeight="bold"
						borderWidth={2}
                        borderColor={LIGHT_GRAY_COLOR}
					>
						Save changes
					</PressableButton>
				</View>
				<View style={styles.logoutContainer}>
					<PressableButton
						onPress={Logout}
						backgroundColor={PRIMARY_YELLOW_COLOR}
						pressedColor={PRIMARY_YELLOW_COLOR}
						textColor={HIGHLIGHT_DARK_COLOR}
						fontWeight="bold"
						borderWidth={2}
						borderColor={HIGHLIGHT_DARK_COLOR}
					>
						Log out
					</PressableButton>
				</View>
			</View>
		</KeyboardAwareScrollView>
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
	emailNotificationsContainer: {
		paddingTop: 20,
		paddingHorizontal: 10,
	},
	checkbox: {
		backgroundColor: "green",
		borderWidth: 0,
	},
	checkedIcon: {
		color: "white",
	},
	buttonContainer: {
		padding: 20,
	},
	logoutContainer: {
        paddingTop: 20,
	},
    saveDiscardContainer: {
        paddingBottom: 20,
    }

});