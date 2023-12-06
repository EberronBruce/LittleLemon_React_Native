import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SECONDARY_DARK_COLOR, PILL_GRAY_COLOR } from "../utils/colors";

const PillButton = ({children}) => {
	const [isToggled, setIsToggled] = useState(false);

	const handleToggle = () => {
		setIsToggled(!isToggled);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.button, isToggled ? styles.buttonActive : null]}
				onPress={handleToggle}
			>
				<Text
					style={[
						styles.buttonText,
						isToggled ? styles.buttonTextActive : null,
					]}
				>
					{children}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: "flex-start",
		flexDirection: "row",
		flexWrap: "wrap",
		marginHorizontal: 4,
	},
	button: {
		backgroundColor: PILL_GRAY_COLOR,
		borderRadius: 20,
		paddingVertical: 8,
		paddingHorizontal: 16,
		marginRight: 8,
	},
	buttonActive: {
		backgroundColor: SECONDARY_DARK_COLOR,
	},
	buttonText: {
		color: "#333",
		fontSize: 16,
	},
	buttonTextActive: {
		color: "#fff",
	},
});

export default PillButton;
