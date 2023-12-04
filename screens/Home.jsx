import { React, useEffect } from "react";
import { View, Text, BackHandler } from "react-native";
import PressableButton from "../components/PressableButton";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    // useEffect(() => {
    //     try {
    //         AsyncStorage.clear();
    //     } catch (error) {
    //         console.erroor(error);
    //     }
    // })

    useEffect(() => {
        const backAction = () => {
            // Prevent default behavior of the back button
            BackHandler.exitApp(); 
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // Clean up the event listener when component unmounts
    }, []);

    const navigation = useNavigation();

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Home</Text>
			<PressableButton
				onPress={async () => {

					// Navigate to the home screen
					navigation.navigate("Profile");
				}}
			>
				Next
			</PressableButton>
		</View>
	);
}
