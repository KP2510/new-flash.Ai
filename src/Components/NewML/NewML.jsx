import React,{useEffect} from "react";
import "./NewML.css";
import { useHistory } from "react-router-dom";
import {  Link } from "react-router-dom";

const MLScaleComponent = () => {
  const history = useHistory();
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const routeToshelfScanner = () => {
    window.open(
      "http://minerva.centralus.cloudapp.azure.com:8080/shelfscanner/"
    );
  };
  const routeToStyleScanner = () => {
    window.open(
      "http://ipsolution.southindia.cloudapp.azure.com:8080/brillioip/styleScanner.html"
    );
  };
  const routeToEnterpriseKG = () => {
    window.open(
      "http://ipsolution.southindia.cloudapp.azure.com:8080/EKG-demo/#/investmentsolutions"
    );
  };

  const routeToTextSummarizer = () => {
    window.open(
      "http://ipsolution.southindia.cloudapp.azure.com:8080/summarizer/#/"
    );
  };
  const routeToArtemis = () => {
    window.open(
      "https://powerbi.microsoft.com/en-us/landing/signin/?ru=https%3A%2F%2Fapp.powerbi.com%2F%3Froute%3Dgroups%252f0818eaa2-913d-4dcd-9ad1-0ed7747c3b34%252freports%252f1bf6e834-318e-4bb3-a698-eb8368b0021b%253fctid%253d3882b70d-a91e-468c-9928-820358bfbd73%26ctid%3D3882b70d-a91e-468c-9928-820358bfbd73%26noSignUpCheck%3D1"
    );
  };

  const myDivToFocus = React.createRef();
  const myDivToFocus1 = React.createRef();
  const myDivToFocus2 = React.createRef();
  const myDivToFocus3 = React.createRef();
  const myDivToFocus4 = React.createRef();
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
  const handleOnClickFour = (event) => {
    if (myDivToFocus3.current) {
      myDivToFocus3.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };
  const handleOnClickFive = (event) => {
    if (myDivToFocus4.current) {
      myDivToFocus4.current.scrollIntoView({
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
          <div class="col text-center ord-threeML">
            ML@Scale
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
                  Shelf Scanner
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
                <a
                  class="btn align-self-end logo-text-revenue"
                  onClick={handleOnClickSecond}
                >
                  Style Scanner
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
                  Enterprise Knowledge Graph
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
              <a
                class="btn align-self-end logo-text-revenue"
                onClick={handleOnClickFour}
              >
                Text Summarizer
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
              <a
                class="btn align-self-end logo-text-revenue"
                onClick={handleOnClickFive}
              >
                Artemis
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
                  <h4 class="card-title card-title-big">Shelf Scanner</h4>
                  <p class="card-text card-title-big-text">
                    Tracking shelf health through the power of image recognition
                  </p>
                  <a onClick={routeToshelfScanner} class="readmore">
                    View Demo
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="row" ref={myDivToFocus1}>
            <div class="col-8 offset-4 wrapper-card wrapper-card-two">
              <div class="card card-wrap">
                <img
                  class="card-img-top img-fluid card-images"
                  src="image/image@1.png"
                  alt=""
                ></img>
                <div class="card-body card-main-big">
                  <h4 class="card-title card-title-big">Style Scanner</h4>
                  <p class="card-text card-title-big-text">
                    Style scanner provides customer a better shopping experience
                    by showing relevant styles based on visual search and
                    recommendations
                  </p>
                  <a onClick={routeToStyleScanner} class="readmore">
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
                    Enterprise Knowledge Graph
                  </h4>
                  <p class="card-text card-title-big-text">
                    Gallery of organization’s knowledge assets, content, and
                    data that leverages a data model to describe the people,
                    places, and things of any specific industry and how they are
                    related.
                  </p>
                  <a onClick={routeToEnterpriseKG} class="readmore">
                    View Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row" ref={myDivToFocus3}>
            <div class="col-8 offset-4 wrapper-card">
              <div class="card card-wrap">
                <img
                  class="card-img-top img-fluid card-images"
                  src="image/image@1.png"
                  alt=""
                ></img>
                <div class="card-body card-main-big">
                  <h4 class="card-title card-title-big">Text Summarizer</h4>
                  <p class="card-text card-title-big-text">
                    Coherent and fluent text summary tool having only the main
                    points outlined in the document with help of Machine
                    Learning & NLP engine.
                  </p>
                  <a onClick={routeToTextSummarizer} class="readmore">
                    View Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row" ref={myDivToFocus4}>
            <div class="col-8 offset-4 wrapper-card">
              <div class="card card-wrap">
                <img
                  class="card-img-top img-fluid card-images"
                  src="image/image@1.png"
                  alt=""
                ></img>
                <div class="card-body card-main-big">
                  <h4 class="card-title card-title-big">Artemis</h4>
                  <p class="card-text card-title-big-text">
                    Through Aspect based sentiment analysis identify risks
                    before they become threats
                  </p>
                  <a onClick={routeToArtemis} class="readmore">
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
export default MLScaleComponent;
