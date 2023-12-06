import React, { useState } from "react";
import { StyleSheet, Text, Pressable, Platform } from "react-native";
import { HIGHLIGHT_LIGHT_COLOR, LIGHT_GRAY_COLOR, PRIMARY_GREEN_COLOR, PRIMARY_YELLOW_COLOR } from "../utils/colors";

const PressableButton = ({
	onPress,
	children,
	disabled,
	backgroundColor = PRIMARY_GREEN_COLOR,
	pressedColor = PRIMARY_YELLOW_COLOR,
	disabledColor = LIGHT_GRAY_COLOR,
	textColor = HIGHLIGHT_LIGHT_COLOR,
	fontWeight = "medium",
	borderWidth = 0,
	borderColor = "black",
}) => {
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
		{ backgroundColor, borderWidth, borderColor },
		isPressed &&
			Platform.OS === "ios" &&
			!disabled && { backgroundColor: pressedColor },
		disabled && { backgroundColor: disabledColor, opacity: 0.5 },
	];

	const textStyles = [styles.buttonText, { color: textColor, fontWeight }];

	return (
		<Pressable
			style={buttonStyles}
			onPress={onPress}
			disabled={disabled}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			android_ripple={{ color: pressedColor }}
		>
			<Text style={textStyles}>{children}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		padding: 10,
		justifyContent: "center",
		borderRadius: 10,
		flexDirection: "row",
	},
	buttonText: {
		fontSize: 16,
		textAlign: "center",
	},
});

export default PressableButton;
