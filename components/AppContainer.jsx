import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProfileButton from "../components/ProfileButton";
import LogoHeaderTitle from "../components/LogoHeaderTitle";
import Onboarding from "../screens/Onboarding";
import Home from "../screens/Home";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();

export default function AppContainer() {
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from automatically hiding

		// Check if onboarding is completed in AsyncStorage
		AsyncStorage.getItem("isLogin")
			.then((value) => {
				setIsLogin(value === "true"); // Convert string value to boolean
			})
			.catch((error) => {
				console.log("Error retrieving onboarding status:", error);
			})
			.finally(() => {
				SplashScreen.hideAsync(); // Hide the splash screen after your custom loading logic is complete
			});
	}, []);

	return (
		!isLogin != null && (
			<>
				<NavigationContainer>
					<Stack.Navigator>
						{!isLogin && (
							<Stack.Screen name="Onboarding" component={Onboarding} />
						)}
						{/* <Stack.Screen
							name="Home"
							component={Home}
							options={{
								headerShown: true,
								headerBackVisible: false,
								headerTitle: LogoHeaderTitle,
								headerRight: () => <ProfileButton />,
								headerTitleAlign: "center",
							}}
						/> */}
						<Stack.Screen
							name="Profile"
							component={Profile}
							options={{
								headerTitle: LogoHeaderTitle,
								headerRight: () => (
									<ProfileButton/>
								),
								headerTitleAlign: "center",
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
				<StatusBar style="auto" />
			</>
		)
	);
}

