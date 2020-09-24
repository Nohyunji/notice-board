import BoardView from "../components/BoardView";

import { connect } from "react-redux";

import { onUserInfo } from "../store/modules/Header";
import { onListRequest } from "../store/modules/BoardList";

const mapStateToProps = ({ Header, BoardList }) => {
  return {
    BoardView: Header,
    BoardList: BoardList,
  };
};

const BoardViewContainer = connect(mapStateToProps, {
  onUserInfo,
  onListRequest,
})(BoardView);

export default BoardViewContainer;
