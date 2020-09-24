import BoareWrite from "../components/BoardWrite";

import { connect } from "react-redux";

import { onListRequest } from "../store/modules/BoardList";

const mapStateToProps = ({ BoardList }) => {
  return {
    BoardList: BoardList,
  };
};
const BoareWriteContainer = connect(mapStateToProps, {
  onListRequest,
})(BoareWrite);

export default BoareWriteContainer;
