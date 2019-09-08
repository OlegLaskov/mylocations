const intitialState = {};
export default (state = intitialState, action) => {
    switch(action.type){
        case 'LOAD_DATA':
            return action.payload;
        case 'SAVE_DATA':
            return action.payload;
        default:
            return state;
    }
}
