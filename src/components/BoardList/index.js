import React, { useState, useReducer, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BoardList.css";

//apis
import { getBoardList } from "../../apis/board";

let BoardList = (props) => {
  const [contentList, setContentList] = useState([]);

  const [pageList, setPageList] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      list: 10,
      page: 1,
    }
  );

  useEffect(() => {
    (async () => {
      let res = await getBoardList(pageList.page, pageList.list);

      try {
        setContentList(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [pageList, props.BoardList.list]);

  const onPageNumber = (e) => {
    setPageList({ page: Number(e.target.innerHTML) });
  };

  return (
    <div id="BoardList">
      <div className="board-wrap">
        <div className="content-title">
          <div> UserName</div>
          <div> Title</div>
          <div> Date</div>
          <div> No.</div>
        </div>

        <div className="content-wrap">
          {contentList.map((data, i) => {
            return (
              <Link to={`/view/${data.id}`} key={i}>
                <div> {data.name}</div>
                <div> {data.title}</div>
                <div> {data.date}</div>
                <div> {i}</div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="board-page">
        <div className="page-number">
          <div onClick={onPageNumber}>1</div>
          <div onClick={onPageNumber}>2</div>
          <div onClick={onPageNumber}>3</div>
          <div onClick={onPageNumber}>4</div>
          <div onClick={onPageNumber}>5</div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
