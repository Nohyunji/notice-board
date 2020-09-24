const BOARDLIST = "LIST/BOARDLIST";

const initialState = { list: true };

export const onListRequest = (list) => (dispatch) => {
  dispatch({
    type: BOARDLIST,
    list: list,
  });
};

export const BoardList = function (state = initialState, action) {
  switch (action.type) {
    case BOARDLIST:
      return {
        list: action.list,
      };

    default:
      return state;
  }
};
