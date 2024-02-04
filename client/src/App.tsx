import React, { FC, useContext, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm"
import { Context } from ".";
import { observer } from "mobx-react-lite";



const App:  FC = () => {
  const {store} = useContext(Context)
    useEffect(() => {
      if(localStorage.getItem('token')) {
        console.log("here")
        store.checkAuth()
      }
    },[])

    if(store.isLoading) {
      return(
        <div><h1>Загрузка...</h1></div>
      )
    }

    if(!store.isAuth) {
      return (
      <div>
        <h1>АВИРИЗУЙТЕСЬ</h1>
        <LoginForm/>
      </div>
      )
    }

  return (
    <div>
      <h1>Пользователь авторизован {store.user.email}</h1> 
      <button onClick={() => store.logout()}>Выйти</button>
    </div>
  );
}

export default observer(App);
