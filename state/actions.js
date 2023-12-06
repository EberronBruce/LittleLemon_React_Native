export const RECIEVE_IMAGE = "RECIEVIE_IMAGE";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const SEARCH_PHRASE = "SEARCH_PHRASE";

export const receiveImage = (imageUri) => {
	return {
		type: RECIEVE_IMAGE,
		payload: imageUri,
	};
}

export const addCategory = (category) => {
	return {
		type: ADD_CATEGORY,
		payload: category
	};
}

export const removeCategory = (category) => {
	return {
		type: REMOVE_CATEGORY,
		payload: category
	};
}

export const setSearchPhrase = (searchPhrase) => {
	return {
		type: SEARCH_PHRASE,
		payload: searchPhrase,
	};
};