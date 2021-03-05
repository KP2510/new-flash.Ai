import React, { useState,useEffect } from "react";
import "./NewLanding.css";
import { useHistory } from "react-router-dom";
import { PlayCircleTwoTone , StopTwoTone  } from '@ant-design/icons';
import { Tooltip} from "antd";

const NewLandingPage = (props) => {
  const history = useHistory();
  const [selected, setSelected] = useState(0);


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // handleDataLake = () => {
  //   this.props.history.push("/DataMigration");
  // };

  // clickme = () =>{
  //   this.props.history.push("/DataMigration");
  // }

  // scrollWin () {
  //   window.scrollBy(0, 500);
  // }

  const routeToPages = () => {
    window.open('https://flashaisc360.azurewebsites.net/');
  };
  const routeToRevenue = () => {
    history.push(`/RevenueAssurence`);
  };
  const routeToPersonalisation = () => {
    history.push(`/Personalization`);
  };

  const routeToSelfService = () => {
    history.push(`/SelfServiceAnalytics`);
  };

  const routeToDataMigration = () => {
    history.push(`/EnterpriseDS`);
  };

  const routeToMlScale = () => {
    history.push(`/MLScalePage`);
  };

  var counter = 1;
  setInterval(function () {
    document.getElementById("radio" + counter).checked = true;
    counter++;
    if (counter > 4) {
      counter = 1;
    }
  }, 3000);
  

  const styles = {
    fontFamily: "Menlo-Regular, Menlo, monospace",
    fontSize: 14,
    lineHeight: "10px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const myDivToFocus = React.createRef();
  const myDivToFocus1 = React.createRef();
  const myDivToFocus2 = React.createRef();
  const myDivToFocusBusiness = React.createRef();
  const myDivToFocusTechnical= React.createRef();
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
  const handleOnClickThird = (event) => {
    if (myDivToFocus2.current) {
      myDivToFocus2.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const handleBusinessSolutions  = (event) => {
    setSelected(0);
  if (myDivToFocusBusiness.current) {
    myDivToFocusBusiness.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }
};

const handleTechnicalSolutions  = (event) => {
  setSelected(1);
  if (myDivToFocusTechnical.current) {
    myDivToFocusTechnical.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }
};

const startTheServices = () =>{
  window.open('http://cloudswitch.eastus.cloudapp.azure.com/flashai/start/apps/');
}

const stopTheServices = () =>{
  window.open('http://cloudswitch.eastus.cloudapp.azure.com/flashai/stop/apps/');
}

  return (
    <div>
      <nav class="navbar fixed-top" id="main-nav">
        <div className="container-fluid">
          <div class="float-right">
            <img
              className="img-fluid flash-ai-logo"
              src="../image/flashailogo2.svg"
              alt=""
            ></img>
          </div>
          <div class="d-flex wrapper-user1">
            <img
              className="img-fluid user-icon mt-2"
              src="../image/user-circle-solid.svg"
              alt=""
            ></img>
            <div className="user-profile">
              <a className="user-name">Hello Brillio</a>
              <a className="user-logout">Logout</a>
              <div class="startTheServices" onClick={startTheServices}><Tooltip title="Start the services" placement="right"> <PlayCircleTwoTone  twoToneColor="#52c41a" /></Tooltip> </div>
              <div class="stopTheServices" onClick={stopTheServices}> <Tooltip title="Stop the services" placement="right"> <StopTwoTone  twoToneColor="#eb2f96" /></Tooltip> </div>
            </div>
          </div>
        </div>
      </nav>

      <section className="carousel" id="carousal-sec">
        <div className="container-fluid1">
          <div className="heading-sec">
            Innovate With Purpose.
            <div className="down-heading">
              Unlocking business performance with Design, Data and Insights
            </div>
          </div>
          <div className="word-flip">
            <ul class="flip4">
              <li>With Reliability</li>
              <li>With Scalability</li>
              <li>With Speed</li>
              <li>Crafting Experience</li>
            </ul>
          </div>

          <img
            class="img-fluid line-img-landing"
            src="image/image-line.svg"
            alt=""
          />

          <div className="crousal slider">
            <div class="skew slides">
              <input type="radio" name="radio-btn" id="radio1" />
              <input type="radio" name="radio-btn" id="radio2" />
              <input type="radio" name="radio-btn" id="radio3" />
              <input type="radio" name="radio-btn" id="radio4" />

              <div class="slide">
                <img
                  class="img-fluid bg-img"
                  src="image/imageSlide4.jpg"
                  alt=""
                ></img>
              </div>
              <div class="slide first">
                <img
                  class=" img-fluid bg-img "
                  src="image/imageSlide3.jpg"
                  alt=""
                ></img>
              </div>

              <div class="slide">
                <img
                  class="img-fluid bg-img"
                  src="image/imageSlide2.jpg"
                  alt=""
                ></img>
              </div>

              <div class="slide">
                <img
                  class="img-fluid bg-img"
                  src="image/imageSlide1.jpg"
                  alt=""
                ></img>
              </div>

            </div>
          </div>
        </div>
      </section>
      
      <section id="scroll-menu">
        <div class="row-hl">
          {/* <div class="col text-center order-one">
            <img class="img-fluid vline" src="image/vbutton.svg" alt="" />
            <span class="arrow-down">&#8595;</span>
          </div> */}
          <div class="col text-center order-two">
            brillio|One flash.ai ™ builds scalable high ROI analytics platforms
            powering business through technology solutions to enable faster time
            from concept to implementation, and improve trust on data
          </div>
          <div class="col text-center order-three">
            <button
            onClick={handleBusinessSolutions}
              // onClick={() => setSelected(0)}
              className="btn btn-business"
              type="submit"
            >
              Business Solutions
            </button>
            <button
             onClick={handleTechnicalSolutions}
              // onClick={() => setSelected(1)}
              class="btn btn-tech"
              type="submit"
            >
              Technology Solutions
            </button>
          </div>

        </div>
      </section>

      {selected === 0 && (
        <div className="businesssolution" ref={myDivToFocusBusiness}>
          <div class="col text-center ord-three">
            Drive KPI through Business Solutions.
          </div>

          <section class="card-section" id="card-sec">
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
                    <button
                      onClick={handleOnClick}
                      class="btn align-self-end logo-text-supplychain"
                    >
                      Supply Chain SC360
                  </button>
                  </div>

                  <div class="d-flex logo-text">
                    <div class="logo-image">
                      <img
                        class="logo-business"
                        src="image/revinew.svg"
                        alt="flashailogo"
                      ></img>
                    </div>
                    <button
                      onClick={handleOnClickSecond}
                      class="btn align-self-end logo-text-revenue"
                    >
                      Revenue Assurance
                  </button>
                  </div>

                  <div class="d-flex logo-text">
                    <div class="logo-image">
                      <img
                        class="logo-business"
                        src="image/personalization.svg"
                        alt="flashailogo"
                      ></img>
                    </div>
                    <button
                      onClick={handleOnClickThird}
                      class="btn align-self-end logo-text-personalization"
                    >
                      Personalization
                  </button>
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
                      <h4 class="card-title card-title-big-landing">
                        Supply Chain SC360
                    </h4>
                      <p class="card-text card-title-big-text-landing">
                        A one stop 360 degree Supply Chain decision management
                        solution to enable personalized delivery of insights and
                        improved visibility powered by Machine learning , advanced
                        analytics and Business Intelligence tools.
                    </p>
                      <a onClick={routeToPages} class="readmore-landing">
                        View Details
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
                      src="image/newRevenue.jpg"
                      alt=""
                    ></img>
                    <div class="card-body card-main-big">
                      <h4 class="card-title card-title-big-landing">Revenue Assurance</h4>
                      <p class="card-text card-title-big-text-landing">
                        Assertively synthesize mission-critical resources through
                      <br />
                      diverse relationships. Dramatically disseminate compelling
                      <br />
                      technologies before virtual.
                    </p>
                      <a onClick={routeToRevenue} class="readmore-landing">
                        View Details
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
                      src="image/newPersonlization.jpg"
                      alt=""
                    ></img>
                    <div class="card-body card-main-big">
                      <h4 class="card-title card-title-big-landing">Personalization</h4>
                      <p class="card-text card-title-big-text-landing">
                        Assertively synthesize mission-critical resources through
                      <br />
                      diverse relationships. Dramatically disseminate compelling
                      <br />
                      technologies before virtual.
                    </p>
                      <a onClick={routeToPersonalisation} class="readmore-landing">
                        View Details
                    </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {selected === 1 && (
        <div className="Technologysolution"  ref={myDivToFocusTechnical}>
          <div class="col text-center ord-three">
            Empower Business Solution through Technology.
         </div>
          <section class="card-section" id="card-sec">
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
                    <button
                      onClick={handleOnClick}
                      class="btn align-self-end logo-text-supplychain"
                    >
                      Enterprise Data Solutions
                  </button>
                  </div>

                  <div class="d-flex logo-text">
                    <div class="logo-image">
                      <img
                        class="logo-business"
                        src="image/revinew.svg"
                        alt="flashailogo"
                      ></img>
                    </div>
                    <button
                      onClick={handleOnClickSecond}
                      class="btn align-self-end logo-text-revenue"
                    >
                      Self Service Analytics
                  </button>
                  </div>

                  <div class="d-flex logo-text">
                    <div class="logo-image">
                      <img
                        class="logo-business"
                        src="image/personalization.svg"
                        alt="flashailogo"
                      ></img>
                    </div>
                    <button
                      onClick={handleOnClickThird}
                      class="btn align-self-end logo-text-personalization"
                    >
                      ML@Scale
                  </button>
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
                      <h4 class="card-title card-title-big-landing">
                        Enterprise Data Solutions
                    </h4>
                      <p class="card-text card-title-big-text-landing">
                        Accelerate enterprise data solutions to enable quick ROI
                        with a faster time-to-value product-led agile approach.
                        The Ready-made open source solutions helps industries to
                        integrate or migrate their existing solution with cloud
                        environment faster while ensuring data security, lineage,
                        quality and governance at each scale
                    </p>
                      <a onClick={routeToDataMigration} class="readmore-landing">
                        View Details
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
                      <h4 class="card-title card-title-big-landing">
                        Self-Serve Analytics
                    </h4>
                      <p class="card-text card-title-big-text-landing">
                        Empower business users to perform their day-to-day
                        analytics tasks independently and enable them to take
                        accurate decision , defining strategy , business
                        priorities , roadmap by leveraging the business insights
                        and data science models approach. tomer a better shopping
                        experience by showing
                    </p>
                      <a onClick={routeToSelfService} class="readmore-landing">
                        View Details
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
                      src="image/newML.jpg"
                      alt=""
                    ></img>
                    <div class="card-body card-main-big">
                      <h4 class="card-title card-title-big-landing">ML@Scale</h4>
                      <p class="card-text card-title-big-text-landing">
                        Enables industries to adopt numerous trained data science
                        models & ML algorithm approaches for the need for
                        accuracy, scalability and interpretability of any business
                        problem.
                    </p>
                      <a onClick={routeToMlScale} class="readmore-landing">
                        View Details
                    </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <section id="technology-details">
        <div class="container tech-cotainer">
          <div class="row text-center">
            <div class="col">
              <div class="info-header">
                <h1 class="text-heading top-heading">
                  Explore Success Stories
                </h1>
                <p class="lead down-heading">View Case Studies</p>
              </div>
            </div>
          </div>

          <div class="row card-wrapper">
            <img
              class="img-fluid card-bg-line"
              src="image/image-line.svg"
              alt=""
            ></img>
            <div class="col">
              <div class="card card-main">
                <div class="card-body card-body-small">
                  <img
                    src="image/cardimage.png"
                    alt=""
                    class="img-fluid img-card"
                  ></img>
                  <h3 class="title-card">Automate disease discovery</h3>
                  <h5 class="text-muted title-card-sub">
                    Helping leading pharma client automate disease discovery
                    with artificial intelligence.
                  </h5>
                  <a class="view-details" href="#">
                    View Details
                  </a>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card card-main">
                <div class="card-body card-body-small">
                  <img
                    src="image/cardimage.png"
                    alt=""
                    class="img-fluid img-card"
                  ></img>
                  <h3 class="title-card">Automate disease discovery</h3>
                  <h5 class="text-muted title-card-sub">
                    Helping leading pharma client automate disease discovery
                    with artificial intelligence.
                  </h5>
                  <a class="view-details" href="#">
                    View Details
                  </a>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card card-main">
                <div class="card-body card-body-small">
                  <img
                    src="image/cardimage.png"
                    alt=""
                    class="img-fluid img-card"
                  ></img>
                  <h3 class="title-card">Automate disease discovery</h3>
                  <h5 class="text-muted title-card-sub">
                    Helping leading pharma client automate disease discovery
                    with artificial intelligence.
                  </h5>
                  <a class="view-details" href="#">
                    View Details
                  </a>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card card-main">
                <div class="card-body card-body-small">
                  <img
                    src="image/cardimage.png"
                    alt=""
                    class="img-fluid img-card"
                  ></img>
                  <h3 class="title-card">Automate disease discovery</h3>
                  <h5 class="text-muted title-card-sub">
                    Helping leading pharma client automate disease discovery
                    with artificial intelligence.
                  </h5>
                  <a class="view-details" href="#">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row text-center">
            <div class="col">
              <div class="info-footer">
                <span class="arrow-top">&#8593;</span>
                <p>
                  <a class="lead back-to-top" href="#">
                    Back to Top
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewLandingPage;