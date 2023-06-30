import axios from "axios";
import { useEffect } from "react";
import FacebookLogin from "react-facebook-login";

const baseURL = "http://localhost:8000";
const drfClientId = process.env.REACT_APP_DRF_CLIENT_ID;
const drfClientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;
const facebookClientId = process.env.REACT_APP_FACEBOOK_APP_ID;

const handleFacebookLogin = (response) => {


  axios
    .post(`${baseURL}/auth/convert-token`, {
      token: response.accessToken,
      backend: "facebook",
      grant_type: "convert_token",
      client_id: drfClientId,
      client_secret: drfClientSecret,
    })
    .then((res) => {
      console.log(res)
      const { access_token, refresh_token } = res.data;
      console.log({ access_token, refresh_token });
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    })
    .catch((err) => {
      console.log("Error Facebook login", err);
    });
};

const Facebook = () => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: facebookClientId,
        cookie  : true,
        xfbml  : true,
        version: "v13.0",
      });
    };

    // Load the Facebook SDK asynchronously
    (function (d, s, id) {
      var js,fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s);
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <div className="App">
      <FacebookLogin
  appId={facebookClientId}
  fields="name,email,picture"
  callback={handleFacebookLogin}
  textButton="LOGIN WITH Facebook"
/>

    </div>
  );
};

export default Facebook;
