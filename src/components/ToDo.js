import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//! store.js에서 createSlice로 변경된 코드의 영향으로 아래의 코드도 맞게 변경 + 25번 줄 dispatch부분도 맞게 변경!
// import { actionCreators } from "../store";
import { remove } from "../store";

function ToDo({ text, onBtnClick, id }) {  // Home.js와 동일한 이유로 객체로 감싸주는 것.
  return (
    <li>
      <Link to={`/${id}`}>
        {text}
      </Link>
      <button onClick={onBtnClick}>삭제</button>
    </li>
  );
}

//! ownProps에 집중해보기!! 유용하게 쓰일 것!
function mapDispatchToProp(dispatch, ownProps) {
  // console.log("ownProps", ownProps) // 생성된 text, id가 담겨져 있음. 이 놈들이 ToDo 컴포넌트에 props로 전달이 될 것임.
  return {
    // 파라미터에 아무것도 안넣어도 됨. 왜냐하면 이미 ownProps에 id가 담겨져있기 때문
    // 대신 store.js로부터 내려오는 actionCreators.deleteTodo를 사용하려면 id를 넣어주어야 함. 
    // 다행이도 ownProps에 id가 담겨져있음. 이걸 바로 사용할 것이고 간단하게 코드구현이 가능해짐.
    // onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id))
    onBtnClick: () => dispatch(remove(ownProps.id))
  };
}

export default connect(null, mapDispatchToProp)(ToDo);