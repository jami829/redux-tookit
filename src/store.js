import { createStore } from "redux";
import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import ToDo from "./components/ToDo";
/*
! toolkit 적용하여 바로 아래에 ceateAction 리팩토링을 할 것임.

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

/*
! 바로 아래에 createReducer로 리팩토링

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
*/

//! createReducer
// 1. state를 mutate하기 쉽게 만들어준다. (기존 reducers는 mutate를 하지 못했다.새로운 state를 만들어야 했다.) 즉, 배열에 push를 하여 기존 배열의 값을 변형시킬 수 있게 해준다.
// 2. state의 mutate 유무에 따른 return 여부
//   - mutate를 했다면 return X
//   - mutate를 하지 않았다면 return O
// 3. 더이상 switch가 필요하지않으나 위의 reducer함수와 정확하게 동일한 기능을 한다.
// 4. createReducer(intial_state, 타입에 따른 action 실행 조건을 담은 객체)


const reducer = createReducer([], {
  // action이 addToDo일 때 파라미터에 state와 action을 넘기고, {}안에서 무엇인가를 하게 할 것임. 기존 reducer와 같이 "type이 무엇일 때 어떤걸 한다" 와 동일
  [addToDo]: (state, action) => {  // 리턴 X : redux의 reducer에서 return을 하려면 반드시 새로운 state를 return해야한다. 따라서 내가 변형한 값을 리턴하지 말아야하는 주의가 필요하다. 
    state.push({ text: action.payload, id: Date.now() });  // 그렇다면 어떻게 여기선 mutate가 가능한것일까? redux-toolkit이 immer 안에서 작동해서 그렇다는데, 여기서 우리가 변형을 했다하여도, 여기서 toolkit과 immer가 이 정보만 가져가는 것일 뿐이고 그 후에 위에서 내가 기본 reducer에서 새로운 state를 만들었던 것처럼 toolkit과 immer가 대신 해준다. 결국 여기서 내가 push로 state를 변형시키지만 결국 새로운 state가 되는 것.
  },                                                       // 따라서, mutate를 했다면 절대 return 하지 말것. 하면 오류남.
  [deleteToDo]: (state, action) =>  // 리턴 O 
    state.filter(toDo => toDo.id !== action.payload)
})
/* 
! configureStore로 리팩토링
const store = createStore(reducer);
 */
const store = configureStore({ reducer })


export const actionCreators = {
  addToDo,
  deleteToDo
}

export default store;
