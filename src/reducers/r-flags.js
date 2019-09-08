const initialState = {
    adding: false,
    editing: false,
    removing: false,
    viewing: false,
    groupByCategory: false,
    categoryFilter: []
};
export default (state = initialState, action) => {
    switch(action.type){
        case 'ADD_ITEM':
            return {
                ...state,
                adding: action.payload
            };
        case 'EDIT_ITEM':
            return {
                ...state,
                editing: action.payload
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                removing: action.payload
            };
        case 'VIEWING':
            return {
                ...state,
                viewing: action.payload
            };
        case 'SAVE_DATA':
            return {
                ...state,
                adding: false,
                editing: false,
                removing: false
            };
        case 'GROUP_BY_CATEGORY':
            return {
                ...state,
                groupByCategory: !state.groupByCategory
            };
        case 'CATEGORY_FILTER':
            return {
                ...state,
                categoryFilter: action.payload
            };
        default:
            return state;
    }
}
