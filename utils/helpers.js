import AsyncStorage from "@react-native-async-storage/async-storage";

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