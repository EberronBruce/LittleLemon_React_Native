import { React, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PressableButton from "../components/PressableButton";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PRIMARY_YELLOW_COLOR, SECONDARY_DARK_COLOR, LIGHT_GRAY_COLOR, OFF_WHITE_COLOR, } from "../utils/colors";
import { KEY_IMAGE_URI } from "../utils/storageKeys";



export default function AvatarContainer({firstName, lastName, imageUri, setImageUri, onSaveProfileChanges}) {

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(); // Request permission from the user to access the media library
        if (status !== "granted") {
            // Handle permission not granted
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            // Launch the image picker
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Specify that only images should be selectable
            allowsEditing: true, // Allow the user to crop the selected image
            aspect: [1, 1], // Set the aspect ratio of the cropped image to 1:1
            quality: 1, // Set the quality of the selected image to 1 (highest)
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri); // Save the selected image URI to the state variable
            onSaveProfileChanges();
        }
    };


    useEffect(() => {
            const loadImageFromAsyncStorage = async () => {
                try {
                    const storedImageUri = await AsyncStorage.getItem(KEY_IMAGE_URI);
                    if (storedImageUri !== null) {
                        setImageUri(storedImageUri);
                    }
                } catch (error) {
                    console.log("Error loading image from AsyncStorage:", error);
                }
            };

            loadImageFromAsyncStorage();
        }, []);


	return (
        <View style={styles.pictureInfoContainer}>
            <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>Avatar</Text>

                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarPlaceholderText}>
                            {firstName.charAt(0).toUpperCase()}
                            {lastName.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                )}
            </View>
            <View style={styles.buttonSpacing}>
                <PressableButton onPress={pickImage}>Change</PressableButton>
            </View>
            <View style={styles.buttonSpacing}>
                <PressableButton
                    onPress={async () => { setImageUri(null)}}
                    backgroundColor={OFF_WHITE_COLOR}
                    pressedColor={PRIMARY_YELLOW_COLOR}
                    textColor={LIGHT_GRAY_COLOR}
                    borderWidth={2}
                    borderColor={LIGHT_GRAY_COLOR}
                >
                    Remove
                </PressableButton>
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
        paddingBottom: 10,
        paddingTop: 10
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
		width: 80,
		height: 80,
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
	avatarPlaceholder: {
		backgroundColor: SECONDARY_DARK_COLOR,
        width: 80,
        height: 80,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
	},
	avatarPlaceholderText: {
        color: "white",
        fontSize: 30,
	},
    test: {
        borderBlockColor: "red",
    }
});
