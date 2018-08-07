import * as type from '../actions/ActionTypes';

const initialState = {
    number: 0
};

const number = ( state = initialState, action) =>{
    switch (action.type) {
        case type.INCREMENT:
            return{
                number: state.number + 1
            };
        case type.DECREMENT:
            return{
                number: state.number -1
            }
        default:
            return state;
    }
}

export default number;