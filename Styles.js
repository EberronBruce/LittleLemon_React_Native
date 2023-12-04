import {StyleSheet} from "react-native";

export const onboardingStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	scrollContainer: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	logoContainer: {
		paddingTop: 20,
		width: "100%",
		alignItems: "center",
	},
	logo: {
		resizeMode: "contain",
		height: 100,
		width: "70%",
	},
	title: {
		padding: 50,
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
	},

	buttonContainer: {
		width: "80%",
		paddingBottom: 40,
		paddingTop: 50,
	},
	spacer: {
		flex: 2,
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
});

export const inputStyles = StyleSheet.create({
	inputContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		marginTop: 10,
		marginBottom: 2,
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
		fontSize: 12,
		fontWeight: "bold",
		paddingBottom: 8,
		alignContent: "flex-start",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		width: "90%",
	},
});
