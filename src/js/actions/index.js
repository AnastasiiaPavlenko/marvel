export const savePreparedData =  fetchedResults => {
    return dispatch => {
        let generatedData = [];
            Object.entries(fetchedResults).forEach(([key, value]) => {
                generatedData.push({ name: value.name, 
                    id: value.id, 
                    description: value.description ? value.description : "No description given.", 
                    thumbnail: value.thumbnail.path, 
                    thumbnail_ext: value.thumbnail.extension,
                    stories: value.stories,
                    series: value.series,
                    events: value.events,
                })
            })
        dispatch ({
            type: 'SAVE_PREPARED_DATA', 
            payload: generatedData
        })
    }
}

export const toggleModal = bool => {
    return {
        type: 'TOGGLE_MODAL',
        bool
    }
}

export const setSelectedCharacter = selected => {
    return {
        type: "SET_SELECTED_CHARACTER",
        payload: selected
    }
}