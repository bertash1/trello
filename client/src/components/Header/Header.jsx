import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import "./style.sass"

const Header = ({ theme }) => {
  const headerClassName = classNames(["header", { [`header_${theme}`]: true }])
  const logoClassName = classNames([
    "header__logo",
    { [`header__logo_${theme}`]: true },
  ])

  return (
    <header className={headerClassName}>
      <span className={logoClassName}>Custom Trello</span>
    </header>
  )
}

Header.propTypes = {
  theme: PropTypes.string,
}

export default Header
