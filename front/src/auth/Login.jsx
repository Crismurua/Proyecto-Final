import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import s from "../styles/login.module.css";
import diferent from "../images/diferent.webp";
import { useDispatch, useSelector } from "react-redux";
import { loadCart } from "../Redux/actions/shopCart";
import { setCurrentUser } from "../Redux/actions/users";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usersReducer.currentUser);

  const handleLogin = () => {
    if (email !== null && password !== null) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          auth.currentUser.getIdTokenResult().then((user) => {
            dispatch(
              setCurrentUser({
                ...auth.currentUser,
                role: user.claims.role || "user",
              })
            );
            auth.currentUser.emailVerified === false
              ? history("/verification")
              : history("/");
          });
        })
        .catch((err) => alert(err));
    }
  };

  const provider = new GoogleAuthProvider();

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch(loadCart(auth.currentUser?.uid));
        history("/");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className={s.container}>
      <div className={s.wraper}>
        <div className={s.login}>
          <div className={s.specs}>
            <h2 className={s.login_title}>Welcome Back</h2>
            <p>Please enter your details.</p>
            <div>
              <div className={s.input_container}>
                <input
                  className={s.input_text}
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                />
              </div>
              <div className={s.input_container}>
                <input
                  className={s.input_text}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  type={"password"}
                />
              </div>
              <div>
                <div className={s.check}>
                  <input
                    className={s.check_input}
                    type="checkbox"
                    id="remember"
                  />
                  <label className={s.check_label} htmlFor="remember">
                    Remember for 30 days
                  </label>
                </div>
                <button className={s.forgot_btn}>Forgot password</button>
              </div>
              <div className={s.sign_btn_container}>
                <button onClick={handleLogin} className={s.sign_login}>
                  SIGN IN
                </button>
                <button onClick={handleGoogle} className={s.login_google}>
                  Sign in with Google
                </button>
              </div>
              <div className={s.register}>
                <p>Don't have an account?</p>
                <button>
                  <Link to="/register">SIGN UP</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={s.image}>
          <img src={diferent} alt="img" />
        </div>
      </div>
    </div>
  );
}
