import * as SQLite from "expo-sqlite";


export const db = SQLite.openDatabase("little_lemon");

export const createTable = async () => {
    try {
        await db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price INTEGER, image TEXT, category TEXT)"
            );
        });
    } catch (error) {
        console.error("Error creating table:", error);
    }
    }

    const deleteMenuItems = async () => {
        try {
            await db.transaction((tx) => {
                tx.executeSql("DELETE FROM menu");
            })
        } catch (error) {
            console.error("Error in delete menu", error);
        }
    }

export const fetchAllMenuItems = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM menu", [], (_, { rows }) => {
                const menuItems = rows._array;
                resolve(menuItems);
            }, (_, error) => {
                reject(error);
            });
        });
    })
}

export const insertMenuItems = (menuItems) => {
    try {
        db.transaction((tx) => {
            menuItems.forEach((menuItem) => {
                tx.executeSql(
                    "INSERT INTO menu (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)",
                    [menuItem.name, menuItem.description, menuItem.price, menuItem.image, menuItem.category]
                );
            });
        });
    } catch (error) {
        console.error("Error in insertMenu menu", error);
    }
}

export const fetchAllCategories = () => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT category FROM menu",
				[],
				(_, { rows }) => {
					const menuItems = rows._array;
					resolve(menuItems);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};

export const fetchAllMenuItemsByCategories = (categories, searchText) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM menu WHERE category IN (${categories
                    .map(() => "?")
                    .join(",")})`,
                categories,
                (_, { rows }) => {
                    const menuItems = rows._array;
                    resolve(menuItems);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
}

export const fetchAllMenuItemsByCategoriesAndSearch = (categories, searchText) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM menu WHERE category IN (${categories
                    .map(() => "?")
                    .join(",")}) AND name LIKE '%' || ? || '%'`,
                [...categories, searchText], // categories,
                (_, { rows }) => {
                    const menuItems = rows._array;
                    resolve(menuItems);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
}

export const fetchAllMenuItemsBySearch = (searchText) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`SELECT * FROM menu WHERE name LIKE '%' || ? || '%'`,
				[searchText],
				(_, { rows }) => {
					const menuItems = rows._array;
					resolve(menuItems);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
};