export const dataLoaded = (data) => {
    return {
        type: 'LOAD_DATA',
        payload: data
    };
};

export const dataSaved = (data) => {
    return {
        type: 'SAVE_DATA',
        payload: data
    };
};

export const addItem = (item) => {
    return {
        type: 'ADD_ITEM',
        payload: item
    }
}
export const editItem = (item) => {
    return {
        type: 'EDIT_ITEM',
        payload: item
    }
}
export const removeItem = (item) => {
    return {
        type: 'REMOVE_ITEM',
        payload: item
    }
}
export const view = (item) => {
    return {
        type: 'VIEWING',
        payload: item
    }
}
export const setGroupByCategory = () => {
    return {
        type: 'GROUP_BY_CATEGORY'
    }
}
export const setCategoryFilter = (filter) => {
    return {
        type: 'CATEGORY_FILTER',
        payload: filter
    }
}
