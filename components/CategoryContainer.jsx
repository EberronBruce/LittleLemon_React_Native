import { React } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {PILL_GRAY_COLOR,} from "../utils/colors";
import PillButton from "../components/PillButton.jsx";


export default function CategoryContainer({categories}) {
	return (
		<View style={styles.categoryContainer}>
			<Text style={styles.categoryTitle}>ORDER FOR DELIVERY!</Text>
			<ScrollView horizontal style={styles.scrollViewContainer}>
				{categories.map((category) => (
					<PillButton
						key={category}
						name={category}
						onPress={() => console.log(category)}
					>
						{category[0].toUpperCase() + category.slice(1)}
					</PillButton>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	categoryContainer: {
		borderBottomColor: PILL_GRAY_COLOR,
		borderBottomWidth: 1,
        marginHorizontal: 10,
	},
	categoryTitle: {
		paddingTop: 25,
		paddingHorizontal: 20,
		fontSize: 20,
		fontWeight: "bold",
	},
	scrollViewContainer: {
		marginHorizontal: 10,
		paddingVertical: 20,
	},
});