let initialState = {
    isModalOpen: false,
    characters: [],
    selectedCharacter: null,
}

export default (state = initialState, action) => {
    let newState

    switch (action.type) {
        case 'SAVE_PREPARED_DATA':
            newState = Object.assign({}, state)
            newState.characters = action.payload

            return newState

        case 'TOGGLE_MODAL':
            newState = Object.assign({}, state)
            newState.isModalOpen = action.bool

            return newState

        case "SET_SELECTED_CHARACTER":
            newState = Object.assign({}, state)
            newState.selectedCharacter = action.payload

            return newState

        default:
            return state
    }
}


