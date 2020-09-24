const USERINFO = "VIEW/USERINFO";

const initialState = { name: localStorage.name };

export const onUserInfo = (name) => (dispatch) => {
  dispatch({
    type: USERINFO,
    name: name,
  });
};

export const Header = function (state = initialState, action) {
  switch (action.type) {
    case USERINFO:
      return {
        name: action.name,
      };

    default:
      return state;
  }
};
