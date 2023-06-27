import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const baseURL = "http://localhost:8000";

const handleFacebookLogin = (response) => {
  axios
    .post(`${baseURL}/auth/convert-token/`, {
      access_token: response.accessToken,
    })
    .then((res) => {
      const { access_token, refresh_token } = res.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    })
    .catch((err) => {
      console.log("Error Facebook login", err);
    });
};

const Facebook = () => {
  return (
    <div className="App">
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email"
        callback={handleFacebookLogin}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.isDisabled}
            type="button"
            className="login-with-facebook-btn"
          >
            Sign in with Facebook
          </button>
        )}
      />
    </div>
  );
};

export default Facebook;
