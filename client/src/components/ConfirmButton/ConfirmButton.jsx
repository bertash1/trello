import React from "react"
import PropTypes from "prop-types"
import "./style.sass"

const ConfirmButton = ({ value }) => (
  <input className="add-form__submit" type="submit" value={value} />
)

ConfirmButton.propTypes = {
  value: PropTypes.string,
}

export default ConfirmButton
