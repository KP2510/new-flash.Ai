import React,{useEffect} from "react";
import "./SSAnalytics.css";
import { useHistory } from "react-router-dom";
import {  Link } from "react-router-dom";

const SSAnalytics = () => {
    const history = useHistory();

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
    const routeToDhi = () =>{
        window.open('http://ipsolution.southindia.cloudapp.azure.com:8080/Dhi-d3/#/');
    }
    const routeToCred = () =>{
        window.open('http://ipsolution.southindia.cloudapp.azure.com:8080/Dhi-d3/#/login');
    }
    const routeToCaps = () =>{
        window.open(' http://ipsolution.southindia.cloudapp.azure.com:8080/TOMS/#/login');
    }

    const myDivToFocus = React.createRef();
    const myDivToFocus1 = React.createRef();
    const myDivToFocus2 = React.createRef();
    const handleOnClick = (event) => {
      if (myDivToFocus.current) {
        myDivToFocus.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    };
  
    const handleOnClickSecond = (event) => {
      if (myDivToFocus1.current) {
        myDivToFocus1.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    };
    const handleOnClickThird = (event) => {
      if (myDivToFocus2.current) {
        myDivToFocus2.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    };

  return (
    <div>
      <nav class="navbar fixed-top" id="main-nav">
        <div className="container-fluid">
          <div class="float-right">
          <Link to="/HomePage">
            <img
              className="img-fluid flash-ai-logo"
              src="../image/flashailogo2.svg"
              alt=""
            ></img>
            </Link>
          </div>
          <div class="d-flex wrapper-user">
            <img
              className="img-fluid user-icon mt-2"
              src="../image/user-circle-solid.svg"
              alt=""
            ></img>
            <div className="user-profile">
              <a className="user-name">Hello Brillio</a>
              <a className="user-logout">Logout</a>
            </div>
          </div>
        </div>
      </nav>

      <section class="card-section" id="card-sec">
        <div class="row">
          <div class="col text-center ord-threeSS">
            Self Service Analytics Transformation
          </div>
        </div>
        <img
          class="img-fluid line-img-landing-two"
          src="image/image-line.svg"
          alt=""
        />
        <div class="card-inner container">
          <div class="row">
            <div class="col-4 wrapper-left">
              <div class="d-flex logo-text-first">
                <div class="logo-image">
                  <img
                    class="logo-business"
                    src="image/supply.svg"
                    alt="flashailogo"
                  ></img>
                </div>
                <a
                  
                  class="btn align-self-end logo-text-supplychain"
                  onClick={handleOnClick}
                >
                  DHI
                </a>
              </div>

              <div class="d-flex logo-text">
                <div class="logo-image">
                  <img
                    class="logo-business"
                    src="image/revinew.svg"
                    alt="flashailogo"
                  ></img>
                </div>
                <a class="btn align-self-end logo-text-revenue"
                onClick={handleOnClickSecond}>
                  CRED
                </a>
              </div>

              <div class="d-flex logo-text">
                <div class="logo-image">
                  <img
                    class="logo-business"
                    src="image/personalization.svg"
                    alt="flashailogo"
                  ></img>
                </div>
                <a
                  onClick={handleOnClickThird}
                  class="btn align-self-end logo-text-personalization"
                >
                 CaPS
                </a>
              </div>
            </div>

            <div class="col-8 wrapper-card" ref={myDivToFocus}>
              <div class="card card-wrap">
                <div class="card-body card-main-big">
                  <img
                    class="card-img-top img-fluid card-images"
                    src="image/image@1.png"
                    alt=""
                  ></img>
                  <h4 class="card-title card-title-big">DHI</h4>
                  <p class="card-text card-title-big-text">
                    Dhi is an NLP-driven enterprise information discovery
                    solution that provides answers to business users through
                    meaningful data stories and proactive alerts.{" "}
                  </p>
                  <a  onClick={routeToDhi} class="readmore" >
                    View Demo
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="row" ref={myDivToFocus1}>
            <div class="col-8 offset-4 wrapper-card">
              <div class="card card-wrap">
                <img
                  class="card-img-top img-fluid card-images"
                  src="image/image@1.png"
                  alt=""
                ></img>
                <div class="card-body card-main-big">
                  <h4 class="card-title card-title-big">Consolidate retain eliminate develop</h4>
                  <p class="card-text card-title-big-text">
                    Report Rationalization with advanced BI tools for decisive
                    business strategy and growth
                  </p>
                  <a onClick={routeToCred} class="readmore" >
                    View Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row" ref={myDivToFocus2}>
            <div class="col-8 offset-4 wrapper-card">
              <div class="card card-wrap">
                <img
                  class="card-img-top img-fluid card-images"
                  src="image/image@1.png"
                  alt=""
                ></img>
                <div class="card-body card-main-big">
                  <h4 class="card-title card-title-big">
                  Campaign Performance Solutions
                  </h4>
                  <p class="card-text card-title-big-text">
                    Campaign Performance Solutions (CaPS) - Managing
                    personalized campaigns at scale and at speed
                  </p>
                  <a  onClick={routeToCaps} class="readmore" >
                    View Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SSAnalytics;
