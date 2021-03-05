import React,{useEffect} from "react";
import "./EnterPriseDS.css";
import { useHistory } from "react-router-dom";
import {  Link } from "react-router-dom";


const EnterpriseDS = () => {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const routeToDataMigration = () => {
    history.push(`/DataMigration`);
  };

  const routeToDash= () => {
    history.push(`/Dash`);
  };

  const myDivToFocus = React.createRef();
  const myDivToFocus1 = React.createRef();

  const handleOnClick = (event) => {
    //.current is verification that your element has rendered
    if (myDivToFocus.current) {
      myDivToFocus.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const handleOnClickSecond = (event) => {
    //.current is verification that your element has rendered
    if (myDivToFocus1.current) {
      myDivToFocus1.current.scrollIntoView({
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
          <div class="col text-center ord-threeDS">
          Enterprise Data Solutions
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
                  Data Migration
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
                onClick={handleOnClickSecond} >
                  DASH
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
                  <h4 class="card-title card-title-big">Data Migration</h4>
                  <p class="card-text card-title-big-text">
                    Accelerate enterprise data solutions to enable quick ROI
                    with a faster time-to-value product-led agile approach. The
                    Ready-made open source solutions helps industries to
                    integrate or migrate their existing solution with cloud
                    environment faster while ensuring data security , lineage ,
                    quality and governance at each scale.
                  </p>
                  <a onClick={routeToDataMigration} class="readmore">
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
                  <h4 class="card-title card-title-big">Data and analytics strategic hormonisation</h4>
                  <p class="card-text card-title-big-text">
                    Report Rationalization with advanced BI tools for decisive
                    business strategy and growth
                  </p>
                  <a onClick={routeToDash} class="readmore" >
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
export default EnterpriseDS;
