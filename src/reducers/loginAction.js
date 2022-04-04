import loginService from "../services/login";
import noteService from "../services/notes";

// 登录
export const signIn = (username,password)=>{
    return async(dispatch)=>{
        try {
            //后端返回三个数据：.send({ token, username: user.username, name: user.name }
            const user = await loginService.login({
              username,
              password,
            });
            // console.log("login return data:", user);
            noteService.setToken(user.token);    //bearer 
            // 本地存储token
            window.localStorage.setItem("loggedUser", JSON.stringify(user));
            dispatch({
                type:"SIGN_IN",
                token:user.token
            })
          } catch (err) {
            return err
          }
    }
    
}

// 注册
export const signUp=(username,password)=>{
    return async(dispatch)=>{
        try {
            //后端返回三个数据：.send({ token, username: user.username, name: user.name }
            const user = await loginService.signUp({
              username,
              password,
            });
            // console.log("login return data:", user);
            noteService.setToken(user.token);    //bearer 
            // 本地存储token
            window.localStorage.setItem("loggedUser", JSON.stringify(user));
            dispatch({
                type:"SIGN_IN",
                token:user.token
            })
          } catch (err) {
            return err
          }
    }
    
}
export const signOut=()=>{
    return (dispatch)=>{
        dispatch({
            type:"SIGN_OUT"
        })
    }
}
