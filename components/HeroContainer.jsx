import { React, useState } from "react";
import { View, Text, StyleSheet, Image, Platform, } from "react-native";
import { Input, Icon } from "react-native-elements";
import { PRIMARY_GREEN_COLOR, PRIMARY_YELLOW_COLOR, OFF_WHITE_COLOR,} from "../utils/colors";
import { useSelector, useDispatch } from "react-redux";
import { setSearchPhrase } from "../state/actions";
import { debounce } from "lodash";

// Define the debounce delay
const debounceDelay = 500;
// Define the debounced search function
const debouncedSearch = debounce((text, dispatch) => {
    dispatch(setSearchPhrase(text.trim()));
}, debounceDelay);

export default function HeroContainer() {
	//const [searchPhrase, setSearchPhrase] = useState("");
	const searchText = useSelector((state) => state.profile.search);
	const dispatch = useDispatch();

	const handleTextChange = (text) => {
		debouncedSearch(text, dispatch);
	};

	return (
        <View style={styles.heroContainer}>
            <Text style={styles.littleLemonTitle}>Little Lemon</Text>
            <View style={styles.heroDetail}>
                <View style={styles.heroInfo}>
                    <Text style={styles.cityTitle}>Chicago</Text>
                    <Text style={styles.infoSection}>
                        We are a family owned Mediterranean restaurant, focused on
                        traditional recipes served with a modern twist.
                    </Text>
                </View>
                <View style={styles.heroImageContainer}>
                    <Image
                        source={require("../images/hero_image.png")}
                        style={styles.heroImage}
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Input
                    leftIcon={<Icon name="search" type="font-awesome" />}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.inputField}
                    value={searchText}
                    onChangeText={(text) => dispatch(setSearchPhrase(text.trim()))}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder={"Type your email"}
                />
            </View>
        </View>
	);
}

const styles = StyleSheet.create({
	heroContainer: {
        // flex: Platform.select({
        //     ios: 0.8,
        //     android: 1.05
        // }),


		backgroundColor: PRIMARY_GREEN_COLOR,
		padding: 20,
	},
	littleLemonTitle: {
		color: PRIMARY_YELLOW_COLOR,
		fontSize: 30,
		fontWeight: "bold",
	},
	cityTitle: {
		color: OFF_WHITE_COLOR,
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 0,
		paddingHorizontal: 2,
	},
	infoSection: {
		paddingVertical: 20,
		color: OFF_WHITE_COLOR,
		fontSize: 15,
	},
	heroDetail: {
		flexDirection: "row",
		alignContent: "center",
		justifyContent: "center",
	},
	heroInfo: {
		paddingHorizontal: 35,
		width: "70%",
	},
	heroImageContainer: {
		marginRight: 30,
		paddingTop: 10,
	},
	heroImage: {
		resizeMode: "cover",
		height: 150,
		width: 150,
		padding: 20,
		borderRadius: 20,
	},
	inputContainer: {
		marginBottom: -15,
		marginTop: 10,
	},
	input: {
		alignContent: "center",
		justifyContent: "center",
	},
	inputField: {
		height: 50,
		backgroundColor: OFF_WHITE_COLOR,
		borderRadius: 8,
		borderWidth: 1,
		paddingHorizontal: 10,
		marginHorizontal: -15,
	},
});