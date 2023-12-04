import AsyncStorage from "@react-native-async-storage/async-storage";

export const PRIMARY_GREEN_COLOR = "#495E57";
export const PRIMARY_YELLOW_COLOR = "#F4CE14";
export const SECONDARY_DARK_COLOR = "#EE9972";
export const SECONDARY_LIGHT_COLOR = "#FBDABB";
export const HIGHLIGHT_DARK_COLOR = "#333333";
export const HIGHLIGHT_LIGHT_COLOR = "#EEFFEE";
export const LIGHT_GRAY_COLOR = "#777777";
export const OFF_WHITE_COLOR = "#FEFFFE";

export const KEY_FIRST_NAME = "firstName";
export const KEY_LAST_NAME = "lastName";
export const KEY_EMAIL = "email";
export const KEY_PHONE = "phone";
export const KEY_ISLOGIN = "isLogin";
export const KEY_IMAGE_URI = "imageUri";
export const KEY_OFFERS = "offers";
export const KEY_NEWSLETTER = "newsletter";

export const validateEmail = (email) => {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};

export const validateName = (name) => {
	// Check if the first name is empty
	if (name.trim() === "") {
		return false;
	}

	// Check if the first name contains only string characters
	const stringRegex = /^[a-zA-Z]+$/; // Regular expression to match only string characters
	if (!stringRegex.test(name)) {
		return false;
	}

	return true;
};

export const isValidPhoneNumber = (phoneNumber) => {
	const phoneRegex =
		/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

	return phoneRegex.test(phoneNumber);
}

export const saveChanges = (key, value) => {
	if (value) {
		console.log("Saving value to AsyncStorage:", value);
		AsyncStorage.setItem(key, value);
	} else {
		console.log("No value found");
		AsyncStorage.removeItem(key);
	}
	//console.log("Image saved to AsyncStorage.");
};

export const getAllAsyncStorageItems = async () => {
	try {
		const keys = await AsyncStorage.getAllKeys();
		const items = await AsyncStorage.multiGet(keys);
		const data = {};

		items.forEach(([key, value]) => {
			data[key] = value;
		});

		return data;
	} catch (error) {
		console.log("Error retrieving AsyncStorage items:", error);
		return null;
	}
};