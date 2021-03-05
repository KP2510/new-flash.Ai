import React from "react";
import "./LandingPage.css";
import Item from "antd/lib/list/Item";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageArray1: [
        require("../../images/BS1.png"), 
        require("../../images/BS2.png"),
        require("../../images/BS1.png"),
      ],
      dataArray1: [
        {
          title: "Supply Chain SC360",
          description:
            "Assertively synthesize mission-critical resources through diverse relationships. Dramatically disseminate compelling technologies before virtual.",
            details:"View Details"
        },
        {
          title: "Revenue Assurance",
          description:
            "abcdefghj",
            details:"View Details"
        },
        {
          title: "Personalization",
          description:
            "hhhhhhhhhhhhhh",
            details:"View Details"
        }
      ],
      imageArray2: [
        require("../../images/TS1.png"), 
        require("../../images/TS2.png"),
        require("../../images/TS1.png"),
      ],
      dataArray2: [
        {
          title: "Enterprise Data Solutions",
          description:
            "Assertively synthesize mission-critical resources through diverse relationships. Dramatically disseminate compelling technologies before virtual.",
            details:"View Details"
        },
        {
          title: "Self Service Analytics",
          description:
            "Assertively synthesize mission-critical resources through diverse relationships. Dramatically disseminate compelling technologies before virtual.",
            details:"View Details"
        },
        {
          title: "ML@Scale",
          description:
            "Assertively synthesize mission-critical resources through diverse relationships. Dramatically disseminate compelling technologies before virtual.",
            details:"View Details"
        }
      ]
    };
  }

  // handleDataLake = () => {
  //   this.props.history.push("/DataMigration");
  // };

  businessHeaders = (index) =>{
    console.log("abcd", index);
    const dataArrayCopy1 = [...this.state.dataArray1];
    const imageArrayCopy1 =[...this.state.imageArray1];
    if(index !== 0){
      const currentData1 = dataArrayCopy1.splice(index,1);
      dataArrayCopy1.unshift(currentData1[0]);
      const currentImage1 = imageArrayCopy1.splice(index,1);
      imageArrayCopy1.unshift(currentImage1[0]);
      this.setState({ dataArray1:dataArrayCopy1, imageArray1:imageArrayCopy1});
    }
    console.log("abcdes",this.props.history );
    // this.props.history.push("/DataMigration");
  }

  technicalHeaders = (index) =>{
    const dataArrayCopy2 = [...this.state.dataArray2];
    const imageArrayCopy2 =[...this.state.imageArray2];
    if(index !== 0){
      
      const currentData2 = dataArrayCopy2.splice(index,1);
      dataArrayCopy2.unshift(currentData2[0]);
      const currentImage2 = imageArrayCopy2.splice(index,1);
      imageArrayCopy2.unshift(currentImage2[0]);
    }
    this.setState({dataArray2:dataArrayCopy2,imageArray2:imageArrayCopy2});
  }

  // clickme = () =>{
  //   this.props.history.push("/DataMigration");
  // }

  clickToTechnicalDetails = () =>{
    console.log("Technical Solutions",this.state.dataArray2[0].title);
    if(this.state.dataArray2[0].title === "Enterprise Data Solutions"){
      this.props.history.push("/DataMigration");
    }
    else if(this.state.dataArray2[0].title === "Self Service Analytics"){
      this.props.history.push("/SelfService");
    }
    else if(this.state.dataArray2[0].title === "ML@Scale"){
      this.props.history.push("/MLscale");
    }
  }

  clickToBusinessDetails = () =>{
    console.log("Business Solutions",this.state.dataArray1[0].title);
    if(this.state.dataArray1[0].title === "Supply Chain SC360"){
      // window.location.assign('http://localhost:3001/');
      window.location.href="http://ipsolution.southindia.cloudapp.azure.com:8080/Dhi-d3/#/login";
      // window.location.assign('http://ipsolution.southindia.cloudapp.azure.com:8080/Dhi-d3/#/login');
    }
    else if(this.state.dataArray1[0].title === "Revenue Assurance"){
      this.props.history.push("/SelfService");
    }
    else if(this.state.dataArray1[0].title === "Personalization"){
      this.props.history.push("/MLscale");
    }
  }
  
  render() {
    console.log("aaaaaa",this.props);

    const imageTags1 = this.state.imageArray1.map((item,index) => {
      return (
        <div  key={index} className={"image2" +  (index === 0 ? ' cutImage' : '')}>
          <img className="rectangle-copy-1" src={item}></img>
        </div>
      );
    });
    const dataTags1 = this.state.dataArray1.map((item,index) => {
      return (
        <>
          <button key={index}
            className={"supply-chain-sc-360" +  (index !== 0 ? 'inactiveButtons' : '')}
            onClick={() => {
              this.businessHeaders(index);
            }}
          >
            {item.title}
          </button>
          <hr className={"rectangle" +  (index !== 0 ? 'inactiverectangle' : '')}></hr>
          <div>
            <p className={"assertively-synthesi" +  (index !== 0 ? 'inactiveparagraph' : '')}>{item.description}</p>
            <div><button className={"view-details" +  (index !== 0 ? 'inactiveView-Details' : '')} onClick={() => {
        this.clickToBusinessDetails();
      }}><u>View Details</u></button>
      </div>
          </div>
        </>
      );
    });
    const imageTags2 = this.state.imageArray2.map((item,index) => {
      return (
        <div  key={index} className={"image2" +  (index == 2 ? ' cutImage1' : '')}>
          <img className="rectangle-copy-1" src={item}></img>
        </div>
      );
    });
    const dataTags2 = this.state.dataArray2.map((item,index) => {
      return (
        <>
          <button key={index}
            className={"technicalButtonClicks" +  (index !== 0 ? 'inactiveTechnicalButtons' : '')}
            onClick={() => {
              this.technicalHeaders(index);
            }}
          >
            {item.title}
          </button>
          <hr className={"technicalRectangle" +  (index !== 0 ? 'inactiveTechnicalrectangle' : '')}></hr>
          <div>
            <p className={"assertively-synthesi" +  (index !== 0 ? 'inactiveparagraph' : '')}>{item.description}</p>
            <div><button className={"view-details" +  (index !== 0 ? 'inactiveView-Details' : '')} onClick={() => {
        this.clickToTechnicalDetails();
      }}><u>View Details</u></button>
      </div>
          </div>
        </>
      );
    });
    return (
      <div>
        <div className="Logo"></div>
        <div>
          <p className="header">Business Solutions</p>
          <hr className="line-3-copy-2"></hr>
        </div>
        <div className="businessSolutions">
          {imageTags1}
          <div className="group">{dataTags1}</div>
        </div>
        <div className="group-5">
          <hr className="line1"></hr>
          <hr className="line-copy-2"></hr>
          <hr className="line-copy-3"></hr>
          <hr className="line-copy"></hr>
        </div>
        <div className="hrline">
          <hr className="line-2"></hr>
        </div>
        <div className="technicalSolutionHeader">
          <p className="technical-solutions">Technical Solutions</p>
          <hr className="line-3Technical"></hr>
        </div>
        <div className="TechnicalSolutions">
          <div className="group2">
           {dataTags2}
          </div>
          {imageTags2}
        </div>
        <div className="group-6">
          <hr className="line-copy"></hr>
          <hr className="line1"></hr>
          <hr className="line-copy-2"></hr>
          <hr className="line-copy-3"></hr>
        </div>
      </div>
     
    );
  }
}

export default LandingPage;
