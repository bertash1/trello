import React from "react"
import PropTypes from "prop-types"

import Header from "./Header/Header"
import "./style.sass"
import Actions from "./Actions/Actions"

const Info = ({ email, setModalContent }) => (
  <>
    <Header email={email} />
    <span className="remove-modal__line" />
    <Actions setModalContent={setModalContent} />
  </>
)

Info.propTypes = {
  email: PropTypes.string,
  setModalContent: PropTypes.func,
}

export default Info
