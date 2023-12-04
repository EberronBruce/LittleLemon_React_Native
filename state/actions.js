export const RECIEVE_IMAGE = "RECIEVIE_IMAGE";

export const receiveImage = (imageUri) => {
	return {
		type: RECIEVE_IMAGE,
		payload: imageUri,
	};
}

