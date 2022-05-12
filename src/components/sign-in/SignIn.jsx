import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { addDocument, signIn } from "../../firebase/services";
import "./sign-in.scss";
import { fbSignIn, ggSignIn, signUp } from "../../firebase/services";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";

import { Form, Formik } from "formik";
import TextField from "../../formik/TextField";

import { validateSignIn } from "../../formik/validate";

import { AuthContext } from "../../context/AuthProvider";

const SignIn = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      navigate("/");
    }
  }, [user]);

  const handleSignIn = async (values) => {
    try {
      await signIn(values.email, values.password);
      navigate("/");
    } catch {
      alert("Incorrect account or password!");
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validateSignIn}
      onSubmit={(values) => {
        handleSignIn(values);
      }}
    >
      {(formik) => (
        <div className="sign-in">
          <div className="sign-in__content">
            <div className="sign-in__content__logo">
              <div className="sign-in__content__logo__image">
                <i className="bi bi-film"></i>
                Exxmon
              </div>

              <p className="welcome">Welcome to movie paradise</p>
            </div>
            <Form className="sign-in__content__form">
              <TextField
                placeholder="Email"
                type="email"
                icon="bi bi-envelope"
                name="email"
              />
              <TextField
                placeholder="Password"
                type="password"
                icon="bi bi-lock"
                name="password"
              />
              {console.log(formik.errors)}
              <button type="submit">sign in</button>
            </Form>
            <div className="sign-in__content__media">
              <div className="account">
                <p>
                  Create account? <Link to="/sign-up">Sign up</Link>
                </p>
              </div>
              <div className="btns">
                <p className="other-sign-in">or Connect width Social Media</p>
                <button className="facebook" onClick={fbSignIn}>
                  <i className="bi bi-facebook"></i>Sign In Width Facebook
                </button>
                <button className="google" onClick={ggSignIn}>
                  <i className="bi bi-google"></i>Sign In Width Google
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default SignIn;
