import React, { Fragment } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Col from 'react-bootstrap/Col';
import logo from '../../images/FlashLogo.svg'
import Spinner from 'react-bootstrap/Spinner'
import newLogo from "../../images/newLogo.png"
import { Modal, Button,Input  } from 'antd';

import {
  MileStoneDescriptionOne,
  MileStrongDescriptionTwo,
  MileStrongDescriptionFive,
} from "../MileStoneDescComp";
import MileStrongDescriptionThree from "../MileStoneThree"
import MileStrongDescriptionFour from "../MileStoneFour"
import { Card, Row, Container } from "react-bootstrap";
import axios from 'axios';

import srcUrl from "../../data";

class TopBar extends React.Component {
  //static
  //constrcutor

  //render
  //coponne will Mount
  //componne twil lupdate
  //component wil unmount
  constructor(props) {
    super(props);
    this.state = {
      sourceSystem:"",
      destinationSystem:"",
      LoadType:"",
      isLoading:false,
      sourceConnected:false,
      runConnected:false,
      sourceConnecting:false,
      destinationRun:false,
      destinationConnecting:false,
      failed:false,
      loadConnecting:false,
      loadConnected:false,
      milestones: [
        {
          id: 1,
          src: require("../../images/Discovery.png"), 
          milestone: "Discovery",
          hide: false,
          connected: false,
          showDiv: true,
        },
        {
          id: 2,
          src: require("../../images/Profiling.png"),
          milestone: "Profiling",
          hide: true,
          connected: false,
          showDiv: false,
        },
        {
          id: 3,
          src: require("../../images/Planning.png"),
          milestone: "Planning & Estimation",
          hide: true,
          connected: false,
          showDiv: false,
        },
        {
          id: 4,
          src: require("../../images/TS1.png"), 
          milestone: "Execution",
          hide: true,
          connected: false,
          showDiv: false,
        },
        {
          id: 5,
          src: require("../../images/TS1.png"), 
          milestone: "Validation",
          hide: true,
          connected: false,
          showDiv: false,
        },
      ],
      loading: false,
      visible: true,
      popUpTextfiled:null,
      responseData: undefined,
      validationResponse:undefined
    };
    this.publish = this.publish.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClickGo = this.onClickGo.bind(this);
  }

  componentDidMount() {}

  onClickDestination = (id,destinationSystem,callBackFunction) =>{
    this.setState({isloading:true, destinationConnecting : true, sourceConnected: false,runConnected:false})
    if(id===4){
    axios({
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/posts',
      data:JSON.stringify({
            title: destinationSystem
          })
      })
        .then((response) => {
          console.log(response);
          this.setState({isloading : false, destinationConnecting:false, sourceConnected:true})
  
        },
        error =>{
      console.log(error);
      }
      );
    }
    else if(id===5){
      this.setState({destinationRun:true})
      axios({
        method: 'post',
        url: 'https://next.json-generator.com/api/json/get/NJkAe9aHt',
      data:JSON.stringify({
            title: destinationSystem 
          })
      })
        .then((response) => {
          console.log(response, "this is response");
          this.setState({responseData: response, isloading : false,destinationRun:false, runConnected:true}, () => callBackFunction(this.state.responseData))
        },
        error =>{
      console.log(error);
      }
      );
    }
    const milestoneCopy = [...this.state.milestones];
    milestoneCopy[id - 1].connected = true;
    this.setState({ destinationSystem:destinationSystem});
  }

  onClickLoadType = (id,LoadType) => {
    this.setState({isloading:true,loadConnecting : true, loadConnected: false, sourceConnected:false})
      axios({
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/posts',
      data:JSON.stringify({
            title: LoadType
          })
      })
        .then((response) => {
          console.log(response);
          this.setState({isloading : false, loadConnecting:false, loadConnected:true})
  
        },
        error =>{
      console.log(error);
      }
      );

      const milestoneCopy = [...this.state.milestones];
    milestoneCopy[id - 1].connected = true;
    this.setState({ mileStone: milestoneCopy,LoadType:LoadType});

  }

  onClickGo = (id, sourceSystem, callBackFunction) => {
    const _this = this;
    this.setState({isLoading : true,sourceConnecting : true,sourceConnected: false,runConnected:false, failed:false})
    if(id===1){
    // axios({
    //   method: 'post',
    //   url: 'http://flashai.eastus.cloudapp.azure.com:4000/run-script',
    // data:JSON.stringify({
    //       projectName: sourceSystem
    //     })
    // })
    
    // axios({
    //   method: 'post',
    //   url: "http://flashai.eastus.cloudapp.azure.com:4000/api/connect",
    //   connectionType: sourceSystem
    //   })
      axios({
        method: 'get',
        url: "http://flashai.eastus.cloudapp.azure.com:4000/connect"
        })

      .then(response => {
        axios({
          method: 'get',
          // url: `http://flashai.eastus.cloudapp.azure.com:4000/check-job-status?runId=${response.runId}`,
          url: `http://flashai.eastus.cloudapp.azure.com:4000/run`,
          })

          .then(response =>{
            console.log('resposeee', response)
            if (response.data.status === 'PENDING' || response.data.status === 'RUNNING') {
              var timer;
    
                    timer = setInterval(async function () {
                      // response = await axios.get(`http://flashai.eastus.cloudapp.azure.com:4000/check-job-status?runId=${response.runId}`);
                      response = await axios.get(`http://flashai.eastus.cloudapp.azure.com:4000/run`);
                     console.log("Scuess status is " + response);
                     if (response.data.status === "SUCCESS"){
                      console.log("responseiiiiiiiiiiii",response);
                      // clearTimeout(timer);
                      clearInterval(timer);
                          console.log(response);
                          console.log("thisssssssss",this);
                          this.setState({isLoading : false, sourceConnecting:false, sourceConnected:true})
                    }
                    else if(response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
                      clearInterval(timer);
                      this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
                    }
                    }, 10000);                                    
                  }
                else if (response.data.status === "SUCCESS"){
                  clearTimeout(timer);
                      console.log(response);
                      _this.setState({isLoading : false, sourceConnecting:false, sourceConnected:true})
                }
                else if (response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
                // .then(response => {
                      console.log(response);
                      this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
                    // })

                    // .catch(() => {
                    //   console.log(resp);
                    //   if(error.response.status === 400){
                    //     this.setState({isLoading:false,sourceConnecting : false,failed:true})
                    //   }
                    //   });
                   
                }
              });
          })

      .catch((error) => {
        if(error.response.status === 400){
          this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
        }
        });
  }
  else if(id===2){
    axios({
      method: 'get',
      url: "http://flashai.eastus.cloudapp.azure.com:4000/connect"
      })
  
    .then(response => {
      axios({
        method: 'get',
        // url: `http://flashai.eastus.cloudapp.azure.com:4000/check-job-status?runId=${response.runId}`,
        url: `http://flashai.eastus.cloudapp.azure.com:4000/run`,
        })
  
        .then(response =>{
          console.log('resposeee', response)
          if (response.data.status === 'PENDING' || response.data.status === 'RUNNING') {
            var timer;
  
                  timer = setInterval(async function () {
                    // response = await axios.get(`http://flashai.eastus.cloudapp.azure.com:4000/check-job-status?runId=${response.runId}`);
                    response = await axios.get(`http://flashai.eastus.cloudapp.azure.com:4000/run`);
                   console.log("Scuess status is " + response);
                   if (response.data.status === "SUCCESS"){
                    console.log("responseiiiiiiiiiiii",response);
                    // clearTimeout(timer);
                    clearInterval(timer);
                    axios({
                      url: "http://flashai.eastus.cloudapp.azure.com:4000/api/profiling/generate-profiling-preview-report",
                      })
                      .then(response => {
                        console.log(response);
                        this.setState({isLoading : false, sourceConnecting:false, sourceConnected:true})
                      })
                  }
                  else if(response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
                    clearInterval(timer);
                    this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
                  }
                  }, 10000);                                    
                }
              else if (response.data.status === "SUCCESS"){
                clearTimeout(timer);
                axios({
                  url: "http://flashai.eastus.cloudapp.azure.com:4000/api/profiling/generate-profiling-preview-report",
                  })
                  .then(response => {
                    console.log(response);
                    this.setState({responseData: response, isLoading : false,sourceConnecting:false, runConnected:true}, () => callBackFunction(this.state.responseData))
                  })
              }
              else if (response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
              // .then(response => {
                    console.log(response);
                    this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
                  // })
  
                  // .catch(() => {
                  //   console.log(resp);
                  //   if(error.response.status === 400){
                  //     this.setState({isLoading:false,sourceConnecting : false,failed:true})
                  //   }
                  //   });
                 
              }
            });
        })
  
    .catch((error) => {
      if(error.response.status === 400){
        this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
      }
      });
  } 
    const milestoneCopy = [...this.state.milestones];
    milestoneCopy[id - 1].connected = true;
    this.setState({ mileStone: milestoneCopy,sourceSystem :sourceSystem});
  };



    onClickRunButton = (id, e) => {
    const milestoneCopy = [...this.state.milestones];
    milestoneCopy[id - 1].connected = true;
    this.setState({ mileStone: milestoneCopy });
    
    {console.log("piiiiiiiiiiiiop",this.state)}
  };

  onClickEvent = (id, e) => {
    const milestoneCopy = [...this.state.milestones];
    milestoneCopy[id].hide = false;
    milestoneCopy[id - 1].showDiv = false;
    milestoneCopy[id].showDiv = true;
    console.log(milestoneCopy);
    this.setState({ mileStone: milestoneCopy });
  };

  //render card 1
  renderOne = (obj) => {
    return (
      <Container
        style={{
          alignItem: "center",
          justifyContent: "center",
          width: "80%",
          marginTop: "15px",
        }}
      >
        <MileStoneDescriptionOne
          mileStones={obj}
          isLoading={this.state.isLoading}
          sourceConnecting = {this.state.sourceConnecting}
          sourceConnected = {this.state.sourceConnected}
          connectApi={this.onClickGo}
          onClickEvent={this.onClickEvent}
          failed={this.state.failed}
        />
      </Container>
    );
  };

  //render card 2
  renderTwo = (obj,sourceSystem) => {
    console.log(this.state.responseData, " this is response data");
    return (
      <Container
        style={{
          alignItem: "center",
          justifyContent: "center",
          width: "80%",
          marginTop: "15px",
        }}
      >
        <MileStrongDescriptionTwo
          mileStones={obj}
          connectApi={this.onClickGo}
          isLoading={this.state.isLoading}
          sourceSystem = {sourceSystem}
          onClickEvent={this.onClickEvent}
          apiResponse = {this.onClickRunButton}
          sourceConnecting = {this.state.sourceConnecting}
          runConnected = {this.state.runConnected}
          successResponse = {this.state.responseData}
        />
        
      </Container>
    );
  };

  //render card 3
  renderThree = (obj) => {
    return (
      <Container
      style={{
        alignItem: "center",
        justifyContent: "center",
        width: "80%",
        marginTop: "15px",
      }}
      >
        <MileStrongDescriptionThree
          mileStones={obj}
          connectApi={this.onClickGo}
          onClickEvent={this.onClickEvent}
          successResponse = {this.state.responseData}
          />
      </Container>
    );
  };

  //render card 4
  renderFour = (obj) => {
    return (
      <Container
        style={{
          alignItem: "center",
          justifyContent: "center",
          width: "80%",
          marginTop: "15px",
        }}
      >
        <MileStrongDescriptionFour
          mileStones={obj}
          isloading={this.state.isloading}
          connectApi={this.onClickDestination}
          connectLoadApi={this.onClickLoadType}
          onClickEvent={this.onClickEvent}
          destinationConnecting = {this.state.destinationConnecting}
          loadConnecting={this.state.loadConnecting}
          loadConnected={this.state.loadConnected}
          sourceConnected = {this.state.sourceConnected}
        />
      </Container>
    );
  };

  //render card 5
  renderFive = (obj,destinationSystem) => {
    return (
      <Container
        style={{
          alignItem: "center",
          justifyContent: "center",
          width: "80%",
          marginTop: "15px",
        }}
      >
        <MileStrongDescriptionFive
          mileStones={obj}
          onClickEvent={this.onClickEvent}
          connectApi={this.onClickDestination}
          apiResponse = {this.onClickRunButton}
          isloading={this.state.isloading}
          destinationSystem={destinationSystem}
          successValidationResponse={this.state.validationResponse}
          destinationRun = {this.state.destinationRun}
          runConnected = {this.state.runConnected}
        />
      </Container>
    );
  };
  
  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };

  handleOk = () => {
    this.setState({ loading: true });
    console.log("text",this.state.popUpTextfiled );
    axios.post('http://flashai.eastus.cloudapp.azure.com:4000/create-project', {
      "projectName": this.state.popUpTextfiled
    })
    .then(function (response) {
      console.log(response);
    })

    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 10);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  publish() {
    console.log( this.state.popUpTextfiled );
  }
  
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }


  render() {    
    const { visible, loading } = this.state;
    const { milestones,sourceSystem} = this.state;
    const {mileStones,destinationSystem} =this.state;
    const progressBars = this.state.milestones.map((item) => {
      const classnames = ["progressBardivs"];
      if (item.hide === false) {
        classnames.push("visitedProgressBar");
      }
      if (item.showDiv) {
        classnames.push("activeProgressBar");
      }
      return <div className={classnames.join(" ")}></div>;
    });
    return (

      <Fragment>
        {/* <Button type="primary" onClick={this.showModal}>
          Project Name
        </Button> */}
       <Modal className="projectInputField"
          visible={visible}
          title="Project Name"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          
          <Input name="popUpTextfiled" placeholder="Please enter the Project name" value={ this.state.popUpTextfiled } 
          required onChange={ this.handleChange }  />
        </Modal>
        {/* {this.state.isLoading ? <div className="loadingContainer"><Spinner animation="border" /></div> : null } */}
           <Container className="topHeader" fluid="lg">
  <Row>
    <Col xs={4}><img src={newLogo} alt="newLogo" style={{width:"100%"}} /></Col>

    <Col className="progressBarContainer" xs={6}>    
{progressBars}
{/* <div className="progressBardivs"></div>
<div className="progressBardivs"></div>
<div className="progressBardivs"></div>
<div className="progressBardivs"></div>
<div className="progressBardivs"></div> */}
</Col>

  </Row>
</Container>

        <Row className="imageRow" style={{ justifyContent: "center" }}>
          {milestones.map((obj) => {
            return (
              <div>
                <Card
                  key={obj.id}
                  style={{ flexFlow: "row", border: "none" }}
                  className="container"
                >
                  <Card.Img
                    src={obj.src}
                    style={{
                      opacity: obj.hide ? 0.3 : 1,
                    }}
                  />
                  <Card.ImgOverlay>
                    <Card.Subtitle
                    
                    >
                      {obj.milestone}
                    </Card.Subtitle>
                  </Card.ImgOverlay>
                <div className="custarrow"></div>
                </Card>
              </div>
            );
          })}
        </Row>
        <Row>
          {milestones.map((obj) => {
            if (obj.id === 1 && obj.showDiv) {
              return this.renderOne(obj);
            } else if (obj.id === 2 && obj.showDiv) {
              return this.renderTwo(obj,sourceSystem);
            } else if (obj.id === 3 && obj.showDiv) {
              return this.renderThree(obj);
            } else if (obj.id === 4 && obj.showDiv) {
              return this.renderFour(obj);
            } else if (obj.id === 5 && obj.showDiv) {
              return this.renderFive(obj,destinationSystem);
            }
          })}
        </Row>
      </Fragment>
    );
  }
}

export default TopBar;
