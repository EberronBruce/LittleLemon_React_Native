import {
	View,
	Image,
	StyleSheet,
} from "react-native";

export default function LogoHeaderTitle() {
	return (
		<View style={styles.titleContainer}>
			<Image
				source={require("../images/logo.png")}
				style={styles.navigationTitle}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	navigationTitle: {
		width: 150,
		height: 45,
		resizeMode: "contain",
	},
	titleContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
});
