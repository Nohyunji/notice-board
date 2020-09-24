import React, { useState, useRef, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

import "./BoardView.css";

//apis
import {
  getBoardView,
  getBoardFix,
  getBoardDelete,
  getBoardComment,
  getBoardCommentList,
  getBoardCommentUpdate,
  getBoardCommentDelete,
} from "../../apis/board";

let BoardView = (props) => {
  const [boardFix, setBoardFix] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      date: "",
      title: "",
      text: "",
      id: 0,
      comment: [],
    }
  );

  const [contentFix, setContentFix] = useState(true);
  const [contentComment, setContentComment] = useState("");

  const [commentFix, setCommentFix] = useState(true);
  const [selectId, setSelectId] = useState({
    id: "",
    comment: "",
  });

  //게시글 보기
  useEffect(() => {
    (async () => {
      let res = await getBoardView(props.match.params.id);

      try {
        setBoardFix(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [props.match.params.id]);

  //댓글 리스트
  useEffect(() => {
    (async () => {
      let res = await getBoardCommentList(props.match.params.id);

      try {
        setBoardFix({
          comment: res.data,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [props.BoardList.list]);

  //게시글 수정
  const onFix = () => {
    setContentFix(!contentFix);

    (async () => {
      let res = await getBoardFix(boardFix);

      try {
        console.log("onFix : ", res);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  //게시글 삭제
  const onDelete = () => {
    (async () => {
      let res = await getBoardDelete(props.match.params.id);

      try {
        props.onListRequest(!props.BoardList.list);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const BoardTitle = (e) => {
    setBoardFix({
      title: e.target.value,
    });
  };

  const BoardTextarea = (e) => {
    setBoardFix({
      text: e.target.value,
    });
  };

  //댓글작성
  const onComment = () => {
    if (contentComment === "") {
      return;
    } else {
      (async () => {
        let res = await getBoardComment(
          props.BoardView.name,
          contentComment,
          boardFix.id
        );

        try {
          var copyComment = [...boardFix.comment];

          copyComment.push({
            name: props.BoardView.name,
            comment: contentComment,
          });

          setBoardFix({ comment: copyComment });
          setContentComment("");
          props.onListRequest(!props.BoardList.list);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  };

  const BoardComment = (e) => {
    setContentComment(e.target.value);
  };

  // 댓글 수정
  const commentUpdate = (data) => {
    setCommentFix(!commentFix);
    setSelectId({ id: "" });

    (async () => {
      let res = await getBoardCommentUpdate(data._id, data.comment);
      try {
        console.log("commentUpdate : ", res);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const commentChange = (e) => {
    const id = e.target.dataset.id;

    setCommentFix(!commentFix);
    setSelectId({ id: id * 1 });
  };

  const onCommenttext = (e) => {
    const id = e.target.dataset.id;

    boardFix.comment.forEach((data, index) => {
      const copyBoardComment = [...boardFix.comment];

      if (data._id === id * 1) {
        copyBoardComment[index].comment = e.target.value;

        setBoardFix({
          comment: copyBoardComment,
        });
      }
    });
  };

  // 댓글 삭제
  const commentDelete = (e) => {
    const id = e.target.dataset.id;

    (async () => {
      let res = await getBoardCommentDelete(id);
      try {
        props.onListRequest(!props.BoardList.list);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  //스크롤 하단 고정

  const focusRef = useRef(null);

  useEffect(() => {
    focusRef.current.focus();

    focusRef.current.scrollTop = focusRef.current.scrollHeight;
  }, [boardFix.comment]);

  return (
    <div id="BoardView">
      <div className="view-wrap">
        <div className="title">
          {contentFix ? (
            boardFix.title
          ) : (
            <input
              type="text"
              value={boardFix.title}
              onChange={BoardTitle}
              placeholder="제목을 입력해주세요."
            ></input>
          )}
        </div>

        <div className="userInfo">
          <div>작성자 : {boardFix.name}</div>
          <div>작성일 : {boardFix.date}</div>
        </div>

        <div className="content">
          {contentFix ? (
            <div>{boardFix.text}</div>
          ) : (
            <textarea
              cols="50"
              rows="10"
              onChange={BoardTextarea}
              value={boardFix.text}
            ></textarea>
          )}

          {contentFix ? (
            <div className="comment">
              <div className="comment-user">
                <div>{props.BoardView.name}</div>
                <div className="comment-input">
                  <input
                    placeholder="댓글을 입력해 주세요."
                    onChange={BoardComment}
                    value={contentComment}
                  ></input>
                </div>
                <div onClick={onComment}>게시</div>
              </div>

              <div className="comment-list" ref={focusRef}>
                {boardFix.comment.map((data, i) => {
                  return (
                    <div>
                      <div className="comment-info">
                        <div>{data.name}</div>
                        {data._id === selectId.id ? (
                          <input
                            value={data.comment}
                            data-id={data._id}
                            onChange={onCommenttext}
                            cols="50"
                            rows="10"
                          />
                        ) : (
                          <div>{data.comment}</div>
                        )}
                      </div>

                      {data.name === props.BoardView.name ? (
                        <div className="comment-btn">
                          {data._id === selectId.id ? (
                            <div className="complete">
                              <div
                                data-id={data._id}
                                onClick={() => commentUpdate(data)}
                              >
                                완료
                              </div>
                              <div data-id={data._id} onClick={commentDelete}>
                                삭제
                              </div>
                            </div>
                          ) : (
                            <div
                              className="change"
                              data-id={data._id}
                              onClick={commentChange}
                            >
                              수정
                            </div>
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div
        className={`btn-wrap ${
          props.BoardView.name === boardFix.name ? "" : "login"
        }`}
      >
        {props.BoardView.name === boardFix.name ? (
          <div>
            {contentFix ? (
              <div className="fix" onClick={() => setContentFix(!contentFix)}>
                FIX
              </div>
            ) : (
              <div className="complete" onClick={onFix}>
                COMPLETE
              </div>
            )}
          </div>
        ) : (
          ""
        )}

        <div className="delete">
          {contentFix ? (
            <Link to="/">CLOSE</Link>
          ) : (
            <Link to="/" onClick={onDelete}>
              DELETE
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardView;
