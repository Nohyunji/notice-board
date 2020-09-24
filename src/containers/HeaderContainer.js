import Header from "../components/Header";

import { connect } from "react-redux";

import { onUserInfo } from "../store/modules/Header";

const mapStateToProps = ({ Header }) => {
  return {
    Header: Header,
  };
};
const HeaderContainer = connect(mapStateToProps, {
  onUserInfo,
})(Header);

export default HeaderContainer;
