// export default () => "Home";
import React, { useState } from "react";
import { connect } from "react-redux";
import ToDo from "../components/ToDo";
//! store.js에서 createSlice로 변경된 코드의 영향으로 아래의 코드도 맞게 변경 + 59번 줄 dispatch부분도 맞게 변경!
// import { actionCreators } from "../store";
import { add } from "../store";

function Home({ toDos, addToDo }) {  // todos: mapStateToProp, addToDo: mapDispatchToProp && 객체로 감싸주는 이유는 props 객체 안에 "일부"로 map~~함수로"추가" toDos와 addToDo를 가져오는 것이기 때문
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);

  }
  function onSubmit(e) {
    e.preventDefault();
    console.log(text) // state가 onChange로 인해 변경된 값.
    addToDo(text)  // 하단 mapDispatchToProp에서 전달되어진 dispatch. 여기서 dispatch가 실행이 되고, 이것이 store.js에 있는 reducer 함수로 전달이 될 것임.
    setText(""); // 제출 후 다시 인풋값 빈칸으로 초기화

  }

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map(toDo => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}
//? store와 component를 connect하는 방법!!!
// connet===Extracting Data with mapStateToProps
// 따라서 아래 함수는 function mapStateToProps(state, ownProps)  state: store에서 가져옴, onwProps: Home으로 보내는 props에 추가될 수 있도록 connect 함수가 허용
// 즉 , 여기서 내가 무엇을 return 해도 component의 prop에 추가 될 것임.
//! 따라서 Home의 props는 react-router로부터 받은 props들이 있고, connect 함수에서 리턴된 값도 포함되어 있음.
//! 또한, 이 function을 connect로 이용하여 store로부터 state를 Home으로 가져다 줄 것임. 이것 역시 home에게 props로 포함되어 전달될 것임.

// 그리고, 기본적으로 function 이름은 mapStateToProps이어야 한다고 공식문서에 나와있음.
/// 정의 : Redux state로부터 Home(component)에 prop으로써 전달한다는것 ===> todo를 render할 수 있다는 것.
function mapStateToProps(state, ownProps) {
  // console.log("mapStateToProps", state, ownProps)
  // 현재는 state를 가져오고 싶으니 store에 저장된 state만 return 하도록 하자. 그렇게 되면 사실상 ownprops 파라미터는 제거해도 무방.
  // return { state }; 혹은
  return { toDos: state };////
}

function mapDispatchToProps(dispatch, ownProps) {
  // console.log("dispatch", dispatch)
  // return { dispatch } // 이제 Home()의 파라미터에 dispatch를 사용할 수 있음. 이 한 줄을 props로 전달하기 때문. 아랫줄로 리팩토링
  return {
    // addToDo: (text) => dispatch(actionCreators.addToDo(text)) // 이 한 줄을 props로 전달하기 때문. 아랫줄로 리팩토링
    addToDo: (text) => dispatch(add(text)) // 이 한 줄을 props로 전달하기 때문. 아랫줄로 리팩토링
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
/*
만약 mapStateToProps는 필요없고 mapDispatchToProps만 필요하다면 아래와 같이 하면된다.
export default connect(null, mapDispatchToProps)(Home);
 */


/*
connect : components들을 store에 연결시켜줌. & connect는 두가지의 argument를 가진다.
1. mapStateToProps: = getState,  store에 저장된 state를 store.getStore하여 component에 전달
2. mapDistpatchToProps: = dispatch,  store.dispatch 어떻게 하면 component가 dispatch 동작도 할 수 있을지에 대해 살펴볼꺼야.

*/