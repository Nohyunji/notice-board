import BoardList from "../components/BoardList";

import { connect } from "react-redux";

import { onListRequest } from "../store/modules/BoardList";

const mapStateToProps = ({ BoardList }) => {
  return {
    BoardList: BoardList,
  };
};
const BoardListContainer = connect(mapStateToProps, {
  onListRequest,
})(BoardList);

export default BoardListContainer;
