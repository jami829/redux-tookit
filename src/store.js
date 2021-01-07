import { createStore } from "redux";
import { createAction } from "@reduxjs/toolkit";
/*
toolkit 적용하여 바로 아래에 리팩토링을 할 것임.

 const ADD = "ADD";
const DELETE = "DELETE";

// action creator
const addToDo = text => {
  return {
    type: ADD,
    text
  };
};
const deleteToDo = id => {
  return {
    type: DELETE,
    id
  };
};
*/
// toolkit 적용
// 위에서 type을 변수로 담아둔 것을 지웠기 때문에 아래 reducer함수에서 case부분을 수정할 것임.
const addToDo = createAction("ADD")  // function 임. 그리고 이 함수는 내가 action에 무엇을 보냈던 간에 항상 payload를 같이 담아 보냄.
const deleteToDo = createAction("DELETE")

const reducer = (state = [], action) => {


  switch (action.type) {
    // case ADD:
    case addToDo.type: // string
      // console.log(action)
      // return [{ text: action.text, id: Date.now() }, ...state];
      return [{ text: action.payload, id: Date.now() }, ...state];
    // case DELETE:
    case deleteToDo.type:
      // return state.filter(toDo => toDo.id !== action.id);
      console.log(action)
      return state.filter(toDo => toDo.id !== action.payload);
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  deleteToDo
}

export default store;
