import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

import Onboarding from "./screens/Onboarding";
import Home from "./screens/Home";
import Profile from "./screens/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from automatically hiding

        // Check if onboarding is completed in AsyncStorage
    AsyncStorage.getItem("isLogin")
      .then((value) => {
        setIsLogin(value === "true"); // Convert string value to boolean
        console.log("Onboarding status:", value);
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
						<Stack.Screen
							name="Home"
							component={Home}
							options={{
								headerShown: true,
								headerBackVisible: false
							}}
						/>
						<Stack.Screen name="Profile" component={Profile} />
					</Stack.Navigator>
				</NavigationContainer>
				<StatusBar style="auto" />
			</>
		)
	);
}
