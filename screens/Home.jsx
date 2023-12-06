import { React, useEffect, useState } from "react";
import { View, BackHandler, StyleSheet, ActivityIndicator, FlatList, Dimensions, } from "react-native";
import { LIGHT_GRAY_COLOR } from "../utils/colors";
import { MENU_URL, IMAGE_URL } from "../utils/urls.js";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchAllMenuItems,
	insertMenuItems,
	createTable,
	fetchAllCategories,
	fetchAllMenuItemsByCategories,
	fetchAllMenuItemsByCategoriesAndSearch,
	fetchAllMenuItemsBySearch,
} from "../utils/database";

import HeroContainer from "../components/HeroContainer.jsx";
import CategoryContainer from "../components/CategoryContainer.jsx";
import MenuCell from "../components/MenuCell.jsx";

// Get the screen height
const windowHeight = Dimensions.get("window").height;	


export default function Home() {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [categories, setCategories] = useState([]);
	const selectedCategories = useSelector((state) => state.profile.categories);
	const searchText = useSelector((state) => state.profile.search);

	const fectchMenu = async () => {
		try {
            var dbMenuItems = await fetchAllMenuItems();
            if (dbMenuItems.length === 0) {
                const response = await fetch(MENU_URL);
                const json = await response.json();
                const menuItems = json.menu;
                insertMenuItems(menuItems)
                dbMenuItems = await fetchAllMenuItems();
            }		
			const dataCategories = await fetchAllCategories();
			const categorySet = new Set(dataCategories.map((item) => item.category));
			const categoryArray = Array.from(categorySet);
			setData(dbMenuItems);
			setCategories(categoryArray);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleJustSearchText = () => {
		try {
			const dbMenuItems = fetchAllMenuItemsBySearch(searchText);
			setData(dbMenuItems);
		} catch (error) {
			console.error(error);
			
		}
	}

	const updateMenuItems = async () => {
		try {
			if (selectedCategories.length === 0) {
				if (searchText === "") {
					const dbMenuItems = await fetchAllMenuItems();
					setData(dbMenuItems);
					return;
				}
				const dbMenuItems = await fetchAllMenuItemsBySearch(searchText);
				setData(dbMenuItems);
				return;
			}
			const dbMenuItems = await fetchAllMenuItemsByCategoriesAndSearch(
				selectedCategories,
				searchText
			);
			console.log("***** break *****")
			console.log(dbMenuItems);
			setData(dbMenuItems);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
        createTable();
		fectchMenu();
	}, []);

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
	}, [])

	useEffect(() => {
		updateMenuItems();	
	}, [selectedCategories, searchText]);

	const renderItem = ({ item }) => (
		<MenuCell
			title={item.name}
			description={item.description}
			price={item.price}
			imageSrc={IMAGE_URL(item.image)}
		/>
	);

	return (
		
		<View style={styles.container}>
			<HeroContainer />
			<CategoryContainer categories={categories}/>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.listContainer}>
					<FlatList
						data={data}
						keyExtractor={(item) => item.id}
						renderItem={renderItem}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        maxHeight: windowHeight,
		justifyContent: "flex-start",
	},
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
    listContainer: {
        flex: 1,
    }

});