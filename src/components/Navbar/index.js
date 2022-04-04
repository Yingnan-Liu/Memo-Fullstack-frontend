import React from "react";
import styles from "./index.module.scss";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signOut } from "../../reducers/loginAction";

function Index({ imgInfo }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const{urls,alt_description}=imgInfo

  const handleSignOut = () => {
    dispatch(signOut());
    history.push("/signin");
  };
  return (
    <div className={styles.imgWrapper}>
      <img className={styles.headerImg} src={urls?.raw}   alt={alt_description}></img>
      <div className={styles.buttonArea}>
        {user ? (
          <>
            <div>`Hello,${user.username}`</div>
            <Button className={styles.button} type="text" onClick={handleSignOut}>退出</Button>
          </>
        ) : (
          <>
            <Button className={styles.button} type="text">
              <Link to="/signin">登录</Link>
            </Button>
            <Button className={styles.button} type="text">
              <Link to="/signup">注册</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Index;
