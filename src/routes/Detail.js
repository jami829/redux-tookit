import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

function Detail({ toDo }) {  // mapStateToProp으로부터 전달된 todo인 props
  // const id = useParams();


  return (
    <>
      <h1>{toDo?.text}</h1>
      <h5>Create at: {toDo?.id}</h5>
    </>
  )
}

function mapStateToProps(state, ownProps) {
  console.log("p", ownProps)
  const {
    match: {
      params: { id }
    }
  } = ownProps;
  // console.log(id)  ===> useParams()의 값과 동일하게 나옴 또한 ownProps.match.params.id; 과도 같음
  // console.log(typeof id) ==> String
  // store의 state인 toDos 중 각 toDo에서 파라미터의 id와 같은 것을 찾는 것. 그것을 Detail컴포넌트에 prop으로 전달
  // id가 string이니 paseInt 혹은 Number() 사용
  // return { toDo: state.find(toDo => toDo.id === parseInt(id)) }  // find(): filter와 비슷하게 작동, 만족하는 값의 첫번째 값을 출력
  return { toDo: state.find(toDo => toDo.id === Number(id)) }  // find(): filter와 비슷하게 작동, 만족하는 값의 첫번째 값을 출력
}
export default connect(mapStateToProps)(Detail);
// export default Detail;