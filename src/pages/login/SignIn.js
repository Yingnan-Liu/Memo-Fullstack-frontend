import React from 'react'
import { useState } from 'react';

import LoginForm from '../../components/LoginForm';


const Index=()=> {
    //user是否有值来判断是否登录
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
    // 登录
  const handleLoginSubmit = async (values) => {
    const { username, password } = values;
    console.log(username, password);
    
  };
  return (
    <LoginForm handleSubmit={handleLoginSubmit} />
  )
}
export default Index