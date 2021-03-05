import React, { Component } from "react";
import "./LoginPage.css";
import UserCredentials from "../../constants/userCredentials.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const toasterConfig = { autoClose: 4000 };

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      emailId: "",
      passWord: "",
      formErrors: {},
    };

    this.initialState = this.state;
    toast.configure();
  }

  //   handleFormValidation() {
  //     const { emailId, passWord } = this.state;
  //     let formErrors = {};
  //     let formIsValid = true;

  //     if (!passWord) {
  //       formIsValid = false;
  //       formErrors["passWordErr"] = "Password is required.";
  //     } else if (!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(passWord)) {
  //       formIsValid = false;
  //       formErrors["passWordErr"] = "Invalid Password.";
  //     }

  //     this.setState({ formErrors: formErrors });
  //     return formIsValid;
  //   }

  handleChange = (e) => {
    let formErrors = {};
    let formIsValid = true;

    const { name, value } = e.target;
    //Email
    if (name === "emailId") {
      if (!value) {
        formIsValid = false;
        formErrors["emailIdErr"] = "Email id is required.";
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        formIsValid = false;
        formErrors["emailIdErr"] = "Invalid email id.";
      }
    } else if (name === "passWord") {
      if (!value) {
        formIsValid = false;
        formErrors["passWordErr"] = "Password is required.";
      } else if (!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value)) {
        formIsValid = false;
        formErrors["passWordErr"] = "Invalid Password.";
      }
    }
    this.setState({ formErrors: formErrors, [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("pppppp", this.state.emailId, this.state.passWord);
    if (
      this.state.emailId === UserCredentials.username &&
      this.state.passWord === UserCredentials.password
    ) {
      console.log("abcdre", e);
      this.props.history.push("/HomePage");
      this.setState({ login: !this.state.login });
    } else {
      // this.setState({invalidCredentials: this.state.invalidCredentials})
      toast.error("Invalid user ID or password", toasterConfig);
    }
  };

  handleContinue = () => {
    console.log("ppppp", this.props.history);
    if (this.state.login === true) {
    } else {
      this.props.history.push("/");
    }
  };

  render() {
    const { emailIdErr, passWordErr } = this.state.formErrors;
    const { login } = this.state;
    return (
      <div>
        <section id="login-sec" className="form-section">
          <div className="container-fluid">
            <div className="row bg">
              <div className="col-8 logo-line">
                <img
                  className="img-fluid line-img"
                  src="../image/image-line.png"
                  alt="green-logo"
                ></img>
              </div>
              <div className="col-4 form-wrapper">
                <div className="row form-wrap">
                  <div className="col-2"></div>
                  <div className="col-8">
                    <img
                      className="img-fluid pl-4 logo-img"
                      src="../image/flashNew.png"
                      alt="flash.ai.logo"
                    ></img>
                    <form onSubmit={this.handleSubmit}>
                      <div>
                        <label
                          className="form-group email-wrap"
                          htmlFor="emailId"
                        >
                          User ID
                        </label>
                        <input
                          type="emailId"
                          name="emailId"
                          value={this.state.emailId}
                          onChange={this.handleChange}
                          placeholder="Enter your user ID."
                          className={emailIdErr ? " showError" : ""}
                        />
                        {emailIdErr && (
                          <small style={{ color: "red" }}>{emailIdErr}</small>
                        )}
                      </div>
                      <div>
                        <label
                          className="form-group pass-wrap"
                          htmlFor="passWord"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="passWord"
                          value={this.state.passWord}
                          onChange={this.handleChange}
                          placeholder="************"
                          className={passWordErr ? " showError" : ""}
                        />
                        {passWordErr && (
                          <small style={{ color: "red" }}>{passWordErr}</small>
                        )}
                      </div>
                      <button
                        class="btn btn-login"
                        onClick={() => {
                          this.handleContinue();
                        }}
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default LoginForm;
