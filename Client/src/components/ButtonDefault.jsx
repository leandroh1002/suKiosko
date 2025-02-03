import React from 'react'
import { useSelector } from 'react-redux';
import styles from "../components/styles/ButtonDefault.module.sass"

function ButtonDefault({props , type}) {
  const userLoggedInfo = useSelector(state => state.UserLogued);


  return (
    <button type={type} value={userLoggedInfo.idPeople} className={styles.butttonDefault}
    // "inline-flex text-white mx-4 bg-[#050b1a] bg-gradient-to-r from-[#050b1a] to-[#000dff] border-0 py-2 px-6 focus:outline-none hover:bg-[#ca7d10] rounded text-lg"
    >{props}</button>
  )
}

export default ButtonDefault