import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import "./BoardWrite.css";

//apis
import { getBoardInsert } from "../../apis/board";

//utils
import { currentDate } from "../../utils/date";

let BoardWrite = (props) => {
  const [boardInsert, setBoartInsert] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      title: "",
      date: "",
      text: "",
    }
  );

  //title변경
  const contentTitle = (e) => {
    const title = e.target.value;

    setBoartInsert({
      title: title,
    });
  };

  //content text변경
  const contentText = (e) => {
    const text = e.target.value;
    const date = currentDate();

    setBoartInsert({
      date: date,
      text: text,
      name: props.match.params.userName,
    });
  };

  //게시글 업로드
  const contentUplode = () => {
    if (boardInsert.title === "") {
      return;
    } else {
      (async () => {
        let res = await getBoardInsert(boardInsert);

        try {
          setBoartInsert({
            name: "",
            title: "",
            date: "",
            text: "",
          });

          props.onListRequest(!props.BoardList.list);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  };

  return (
    <div id="BoardWrite">
      <div className="view-wrap">
        <div className="title">
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            onChange={contentTitle}
          ></input>
        </div>
        <div className="userInfo">
          <div>작성자 : {props.match.params.userName}</div>
          <div>작성일 : {currentDate()}</div>
        </div>
        <div className="content">
          <textarea
            cols="50"
            rows="10"
            placeholder="내용을 입력해주세요."
            onChange={contentText}
          ></textarea>
        </div>
      </div>

      <div className="btn-wrap">
        <div className="delete">
          <Link to="/"> DELETE</Link>
        </div>
        <div className="complete" onClick={contentUplode}>
          <Link to="/"> COMPLETE</Link>
        </div>
      </div>
    </div>
  );
};

export default BoardWrite;
