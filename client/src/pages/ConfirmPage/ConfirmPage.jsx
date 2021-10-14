/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { useSelector } from "react-redux"

import Header from "../../components/StartPage/Header/Header"
import image from "../../assets/confirm.png"
import "./style.sass"

const ConfirmPage = () => {
  const email = useSelector((state) => state.userData.user.email)
  // const test = "test@gmail.com"

  return (
    <div className="confirm-page">
      <Header />
      <div className="confirm-page__container">
        <img className="confirm-page__image" alt="confirm" src={image} />
        <div className="confirm-page__info">
          <h2>Almost there...</h2>
          <p className="confirm-page__text">
            Please check your email ({email}) to confirm your account.
          </p>
          <p className="confirm-page__text">
            If {email} is not your email adress, please go back and enter the
            correct one.
          </p>
          <p className="confirm-page__text">
            If you haven't received our email in 15 minutes, please check your
            spam folder.
          </p>
          <p className="confirm-page__text">
            Still can't find it? Try searching Gmail for "in:all
            subject:(Confirm your account on Custom Trello)".
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPage
