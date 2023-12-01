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
}