import React, { useRef } from "react"
import PropTypes from "prop-types"
import { useOutsideClickHadler } from "../../../hooks/useOutsideClickHadler"

const OutsideClickHandler = ({ children, handleClose }) => {
  const wrapperRef = useRef(null)
  useOutsideClickHadler(wrapperRef, handleClose)

  return (
    <div role="none" ref={wrapperRef}>
      {children}
    </div>
  )
}

OutsideClickHandler.propTypes = {
  children: PropTypes.element,
  handleClose: PropTypes.func,
}

export default OutsideClickHandler
