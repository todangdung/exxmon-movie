import { Link, useNavigate } from "react-router-dom";
import { addDocument } from "../../firebase/services";
import { fbSignIn, ggSignIn, signUp } from "../../firebase/services";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";

import { Form, Formik } from "formik";
import TextField from "../../formik/TextField";

import { validateSignUp } from "../../formik/validate";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";

const SignUp = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      navigate("/");
    }
  }, [user]);

  const handleSignUp = async (values) => {
    console.log(values);
    try {
      const { user } = await signUp(values.email, values.password);

      addDocument("users", {
        displayName: values.userName,
        email: user.email,
        photoURl: user.photoURL,
        uid: user.uid,
      });

      updateProfile(auth.currentUser, {
        displayName: values.userName,
      });

      alert("Create Account Success!!");
      navigate("/sign-in");
    } catch {
      alert("Account already exists!!");
    }
  };

  return (
    <Formik
      initialValues={{
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validateSignUp}
      onSubmit={(values) => {
        handleSignUp(values);
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
                placeholder="User name"
                type="text"
                icon="bi bi-person"
                name="userName"
              />
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
              <TextField
                placeholder="Confirm password"
                type="password"
                icon="bi bi-shield-lock"
                name="confirmPassword"
              />
              <button type="submit">sign up</button>
            </Form>
            <div className="sign-in__content__media">
              <div className="account">
                <p>
                  Do you already have an account?{" "}
                  <Link to="/sign-in">Sign in</Link>
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

export default SignUp;
