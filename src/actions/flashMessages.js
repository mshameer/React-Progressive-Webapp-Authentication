// import { v4 } from "node-uuid";

export const ADD_FLASH_MESSAGE = "ADD_FLASH_MESSAGE";
export const DELETE_FLASH_MESSAGE = "DELETE_FLASH_MESSAGE";

// FlashMessage Action creator:
// addFlashMessage({"type": "success", "text": "...."})

export const addFlashMessage = (message) => ({
    type: ADD_FLASH_MESSAGE,
    message: {
        id: 444,
        ...message
    }
});

export const deleteFlashMessage = (id) => ({
    type: DELETE_FLASH_MESSAGE,
    id
});
