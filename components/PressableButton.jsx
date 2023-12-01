import React, { useState } from "react";
import { StyleSheet, Text, Pressable, Platform } from "react-native";

const PressableButton = ({ onPress, children, disabled }) => {
const [isPressed, setIsPressed] = useState(false);

const handlePressIn = () => {
	if (Platform.OS === "ios" && !disabled) {
		setIsPressed(true);
	}
};

const handlePressOut = () => {
	if (Platform.OS === "ios" && !disabled) {
		setIsPressed(false);
	}
};

const buttonStyles = [
	styles.button,
	isPressed && Platform.OS === "ios" && !disabled && styles.buttonPressed,
	disabled && styles.disabled,
];

	return (
		<Pressable
			style={buttonStyles}
			onPress={onPress}
			disabled={disabled}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			android_ripple={{ color: "#F4CE14" }}
		>
			<Text style={styles.buttonText}>{children}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#495E57",
		padding: 10,
		justifyContent: "center",
		borderRadius: 10,
		flexDirection: "row",
	},
	buttonPressed: {
		backgroundColor: "#F4CE14",
	},
	disabled: {
		backgroundColor: "#777777",
		opacity: 0.5,
	},
	buttonText: {
		fontSize: 16,
		textAlign: "center",
		color: "#EEFFEE",
	},
});

export default PressableButton;
