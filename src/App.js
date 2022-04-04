import React, { useState, useEffect } from "react";
import axios from "axios";
import SignIn from "./pages/login/SignIn";
import SignUp from "./pages/login/SignUp";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import { createApi } from 'unsplash-js';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./App.module.scss";

const api = createApi({
  accessKey: "Fou8lmf7FdTPuoejQhUKi_kxzfmeQ3hcUGoWuTjgnA8"
});

function App() {
  //user是否有值来判断是否登录
  // const [user, setUser] = useState(null);

  // 检查是否登陆过
  // useEffect(() => {
  //   const loggedUserJson = window.localStorage.getItem("loggedUser");
  //   if (loggedUserJson) {
  //     const user = JSON.parse(loggedUserJson);
  //     setUser(user);
  //     noteService.setToken(user.token);
  //   }
  // }, []);
  const [imgInfo,setImgInfo]=useState('')
  useEffect(() => {
    api.search.getPhotos({
    'query':'nature',
    'page':1,
    'per_page':10,             
    }).then((res)=>{
      let i =Math.floor(Math.random()*10)
      let imgInfo=res?.response?.results[i]
      setImgInfo(imgInfo)
      console.log(imgInfo)
    }).catch((err)=>{
      console.log(err)
    })
  }, []);

  return (
    <BrowserRouter>
    <div className={styles.appWrapper}>
      <div className={styles.header}>
        <Navbar imgInfo={imgInfo}/>
      </div>
      <div className={styles.content} >
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
