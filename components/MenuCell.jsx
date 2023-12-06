import { React, useState } from "react";
import { View, Text, StyleSheet,Image } from "react-native";
import { LIGHT_GRAY_COLOR,} from "../utils/colors";
import loading from '../images/logo_grey.png'

export default function MenuCell({title, description, price, imageSrc}) {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        console.log("Failed to load image")
        setImageError(true);
    };


	return (
		<View style={styles.cellContainer}>
			<View style={styles.cellInformation}>
				<Text style={styles.cellTitle}>{title}</Text>
				<Text
					numberOfLines={2}
					ellipsizeMode="tail"
					style={styles.cellDescription}
				>
					{description}
				</Text>
				<Text style={styles.cellPrice}>${price}</Text>
			</View>
			<View style={styles.cellImageContainer}>
				{!imageError ? (
					<Image
						source={{ uri: imageSrc }}
						defaultSource={loading}
						onError={handleImageError}
						style={styles.cellImage}
					/>
				) : (
					<Image
						source={loading}
						style={styles.cellErrorImage}
					/>
				)}
			</View>
		</View>
	);
}


const styles = StyleSheet.create({
	cellContainer: {
		flex: 1,
		flexDirection: "row",
		padding: 10,
		judtifyContent: "space-between",
		marginTop: 10,
	},
	cellInformation: {
		width: "70%",
		paddingRight: 10,
	},
	cellImageContainer: {
		justifyContent: "flex-end",
		alignItems: "flex-end",
		width: "30%",
	},
	cellImage: {
		resizeMode: "cover",
		height: 100,
		width: 100,
	},
	cellErrorImage: {
		resizeMode: "contain",
		height: 100,
		width: 100,
	},
	cellTitle: {
		fontWeight: "bold",
		fontSize: 16,
		paddingBottom: 5,
		marginTop: -10,
	},
	cellDescription: {
		marginRight: 10,
		color: LIGHT_GRAY_COLOR,
	},
	cellPrice: {
		marginTop: 10,
		fontWeight: "bold",
		fontSize: 16,
		color: LIGHT_GRAY_COLOR,
	},
	loadingContainer: {
		width: 80,
		height: 80,
		marginRight: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	hiddenImage: {
		opacity: 0,
	},
});