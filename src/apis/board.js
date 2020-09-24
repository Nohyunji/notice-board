import axios from "axios";

//List 요청
export const getBoardList = async (page, list) => {
  console.log(page, list);

  let result = await axios({
    method: "GET",
    url: `http://localhost:8000/list?page=${page}&list=${list}`,
    headers: {},
  });

  return result;
};

//게시글 작성
export const getBoardInsert = async (user) => {
  let result = await axios({
    method: "POST",
    url: "http://localhost:8000/insert",
    data: user,
    headers: {},
  });

  return result;
};

//BoardView 요청
export const getBoardView = async (id) => {
  let result = await axios({
    method: "GET",
    url: `http://localhost:8000/view?id=${id}`,
    headers: {},
  });

  return result;
};

//BoardView 수정
export const getBoardFix = async (userInfo) => {
  let result = await axios({
    method: "POST",
    url: `http://localhost:8000/view/update?id=${userInfo.id}`,
    data: userInfo,
    headers: {},
  });

  return result;
};

//BoardView 삭제
export const getBoardDelete = async (id) => {
  let result = await axios({
    method: "POST",
    url: `http://localhost:8000/view/delete?id=${id}`,
    headers: {},
  });

  return result;
};

//댓글 리스트
export const getBoardCommentList = async (id) => {
  let result = await axios({
    method: "GET",
    url: `http://localhost:8000/view/comment?id=${id}`,
    headers: {},
  });

  return result;
};

//댓글작성
export const getBoardComment = async (name, comment, id) => {
  let result = await axios({
    method: "POST",
    url: `http://localhost:8000/view/comment`,
    data: { name: name, comment: comment, id: id },
    headers: {},
  });

  return result;
};

//댓글수정
export const getBoardCommentUpdate = async (id, comment) => {
  let result = await axios({
    method: "POST",
    url: `http://localhost:8000/view/comment/update`,
    data: { id: id, comment: comment },
    headers: {},
  });

  return result;
};

//댓글삭제
export const getBoardCommentDelete = async (id) => {
  let result = await axios({
    method: "POST",
    url: `http://localhost:8000/view/comment/delete`,
    data: { id: id },
    headers: {},
  });

  return result;
};
