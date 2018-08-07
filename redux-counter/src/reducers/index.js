import * as types from '../actions/ActionTypes'

const initialState = {
   counters: [
       {
            color: 'black',
            number: 0
       }
   ]
};

function counter(state= initialState, action) {
    const { counters } = state;

    switch (action.type) {
        case types.CREATE:
           return {
              counters: [
                  ...counters,
                  {
                      color: action.color,
                      number:0
                  }
              ]
           };
        case types.REMOVE:
           return {
              counters : counters.slice(0, counters.length - 1)
           };

        case types.INCREMENT:
           return {
              counters: [
                  ...counters.slice(0, action.index),                   // 0번째부터 인덱스 앞부분까지
                  {
                      ...counters[action.index],                        // 인덱스의 모든 정보들
                      number: counters[action.index].number + 1         // 인덱스의 정보 중에서 넘버에만 1 추가
                  },
                  ...counters.slice(action.index + 1, counters.length)  // 인덱스부터 끝까지
              ]
           };

        case types.DECREMENT:
           return {
               counters: [
                   ...counters.slice(0, action.index),
                   {
                       ...counters[action.index],
                       number: counters[action.index].number -1
                   },
                   ...counters.slice(action.index + 1, counters.length)
               ]
           };

        case types.SET_COLOR:
           return {
              counters : [
                  ...counters.slice(0, action.index),
                  {
                      ...counters[action.index],
                      color:action.color
                  },
                  ...counters.slice(action.index+1, counters.length)
              ]
           };

        default:
           return state;
    }
}

export default counter

