import React, { Fragment } from "react";
import Col from 'react-bootstrap/Col';
import newLogo from "../../images/newLogo.png"
import { Modal, Button,Input  } from 'antd';

import {  Link } from "react-router-dom";

import {
  MileStoneDescriptionOne,
  MileStrongDescriptionTwo,
} from "../MileStoneDescComp";
import MileStrongDescriptionThree from "../MileStoneThree"
import MileStrongDescriptionFour from "../MileStoneFour"
import MileStrongDescriptionFive from "../MileStoneFive"
import { Card, Row, Container } from "react-bootstrap";
import axios from 'axios';
import { withRouter } from 'react-router-dom'

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
      destinationFailed:false,
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
      validationResponse:undefined,
      projectNameValidation:false,
    };
    this.publish = this.publish.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClickGo = this.onClickGo.bind(this);
    this.onClickDestination =this.onClickDestination.bind(this);
  }

  componentDidMount() {}

  onClickDestination = (id,destinationSystem,callBackFunction) =>{
    const _this = this;
    this.setState({isloading:true, destinationConnecting : true, sourceConnected: false,runConnected:false,destinationFailed:false})
    if(id===4){
    // axios({
    //     method: 'post',
    //     url: 'https://jsonplaceholder.typicode.com/posts',
    //   data:JSON.stringify({
    //         title: destinationSystem
    //       })
    //   })
    //     .then((response) => {
    //       console.log(response);
    //       _this.setState({isloading : false, destinationConnecting:false, sourceConnected:true})
  
    //     },
    //     error =>{
    //   console.log(error);
    //   if(error.response.status === 400){

    //     this.setState({isLoading:false,destinationConnecting : false,destinationFailed:true})
    //   }
    //   }
    //   );
    axios({
      method: 'post',
      url: 'https://flashai.azurewebsites.net/api/connect',
    data:{
      connectionType: destinationSystem
        }
    })

      .then(response => {
        const runIdValue = response.data.data.run_id;
        axios({
          method: 'get',
          url: `https://flashai.azurewebsites.net/check-job-status?runId=${response.data.data.run_id}`,
          // url: `https://flashai.azurewebsites.net/run`,
          })

          .then(response =>{
            console.log('resposeee', response)
            if (response.data.status === 'PENDING' || response.data.status === 'RUNNING') {
              var timer;
    
                    timer = setInterval(async function () {
                      response = await axios.get(`https://flashai.azurewebsites.net/check-job-status?runId=${runIdValue}`);
                      // response = await axios.get(`https://flashai.azurewebsites.net/run`);
                     console.log("Scuess status is " + response);
                     if (response.data.status === "SUCCESS"){
                      console.log("responseiiiiiiiiiiii",response);
                      // clearTimeout(timer);
                      clearInterval(timer);
                          console.log(response);
                          console.log("thisssssssss",this);
                          _this.setState({isloading : false, destinationConnecting:false, sourceConnected:true})
                          const milestoneCopy = [..._this.state.milestones];
                          milestoneCopy[id - 1].connected = true;
                          _this.setState({ destinationSystem:destinationSystem});
                    }
                    else if(response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
                      clearInterval(timer);
                      _this.setState({isLoading:false,destinationConnecting : false,destinationFailed:true})
                    }
                    }, 10000);                                    
                  }
                else if (response.data.status === "SUCCESS"){
                  clearTimeout(timer);
                      console.log(response);
                      _this.setState({isloading : false, destinationConnecting:false, sourceConnected:true})
                      const milestoneCopy = [..._this.state.milestones];
                          milestoneCopy[id - 1].connected = true;
                          _this.setState({ destinationSystem:destinationSystem});
                }
                else if (response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
                // .then(response => {
                      console.log(response);
                      _this.setState({isLoading:false,destinationConnecting : false,destinationFailed:true})
                  
                }
              });
          })

      .catch((error) => {
        if(error.response.status === 400){
            _this.setState({isLoading:false,destinationConnecting : false,destinationFailed:true})
        }
        });
    }
    else if(id===5){
      _this.setState({destinationRun:true,loading:true})
      axios({
        method: "post",
        url: "https://flashai.azurewebsites.net/run-script",
        // url: `https://flashai.azurewebsites.net/connect`,
        data: {
          jobName: "sys_validation",
        },
      })
        .then((validation_Response) => {
          console.log("validation_Response",validation_Response)
          const ProfilerunIdValue = validation_Response.data.data.run_id;
          axios({
            method: "get",
            url: `https://flashai.azurewebsites.net/check-job-status?runId=${ProfilerunIdValue}`,
            // url: `https://flashai.azurewebsites.net/run`,
          }).then((validation_runId_Response) => {
            console.log("resposeee", validation_runId_Response);
            if (
              validation_runId_Response.data.status === "PENDING" ||
              validation_runId_Response.data.status === "RUNNING"
            ) {
              var timer;
      
              timer = setInterval(async function () {
                validation_runId_Response = await axios.get(
                  `https://flashai.azurewebsites.net/check-job-status?runId=${ProfilerunIdValue}`
                );
                // response = await axios.get(`https://flashai.azurewebsites.net/run`);
                console.log("Scuess status is " + validation_runId_Response);
                if (validation_runId_Response.data.status === "SUCCESS") {
                  console.log("responseiiiiiiiiiiii", validation_runId_Response);
                  // clearTimeout(timer);
                  axios({
                    url:
                      "https://flashai.azurewebsites.net/api/validation/sys-validation",
                  }).then((validation_Api_Response) => {
                    console.log(validation_Api_Response);
                    _this.setState(
                      {
                        responseData: validation_Api_Response,
                        isloading: false,
                        destinationRun: false,
                        runConnected: true,
                      },
                      () => callBackFunction(_this.state.responseData)
                    );
                    clearInterval(timer);
      
                    axios({
                      method: "post",
                      url: "https://flashai.azurewebsites.net/run-script",
                      data: {
                        jobName: "data_validation",
                      },
                    })
                      .then((dataValidation_Response) => {
                        const validation_runId_value =
                          dataValidation_Response.data.data.run_id;
                        axios({
                          method: "get",
                          url: `https://flashai.azurewebsites.net/check-job-status?runId=${validation_runId_value}`,
                        }).then((dataValidation_RunId_Response) => {
                          console.log("resposeee", dataValidation_RunId_Response);
                          if (
                            dataValidation_RunId_Response.data.status === "PENDING" ||
                            dataValidation_RunId_Response.data.status === "RUNNING"
                          ) {
                            var validationTimer;
      
                            validationTimer = setInterval(async function () {
                              dataValidation_RunId_Response = await axios.get(
                                `https://flashai.azurewebsites.net/check-job-status?runId=${validation_runId_value}`
                              );
                              console.log(
                                "Scuess status is " + dataValidation_RunId_Response
                              );
                              if (
                                dataValidation_RunId_Response.data.status ===
                                "SUCCESS"
                              ) {
                                console.log(
                                  "responseiiiiiiiiiiii",
                                  dataValidation_RunId_Response
                                );
                                axios({
                                  url:
                                    "https://flashai.azurewebsites.net/api/validation/data-validation",
                                }).then((dataValidation_Api_Response) => {
                                  console.log(dataValidation_Api_Response);
                                  // _this.setState({responseData: response, isLoading : false,sourceConnecting:false, runConnected:true}, () => callBackFunction(_this.state.responseData))
                                  clearInterval(validationTimer);
      
                                  axios({
                                    method: "post",
                                    url:
                                      "https://flashai.azurewebsites.net/run-script",
                                    data: {
                                      jobName: "sys_recon",
                                    },
                                  })
                                    .then((sysRecon_Response) => {
                                      const sysRecon_runId_value =
                                        sysRecon_Response.data.data.run_id;
                                      axios({
                                        method: "get",
                                        url: `https://flashai.azurewebsites.net/check-job-status?runId=${sysRecon_runId_value}`,
                                      }).then((sysRecon_RunId_Response) => {
                                        console.log(
                                          "resposeee",
                                          sysRecon_RunId_Response
                                        );
                                        if (
                                          sysRecon_RunId_Response.data.status ===
                                            "PENDING" ||
                                          sysRecon_RunId_Response.data.status ===
                                            "RUNNING"
                                        ) {
                                          var sysReconTimer;
      
                                          sysReconTimer = setInterval(
                                            async function () {
                                              sysRecon_RunId_Response = await axios.get(
                                                `https://flashai.azurewebsites.net/check-job-status?runId=${sysRecon_runId_value}`
                                              );
                                              console.log(
                                                "Scuess status is " +
                                                  sysRecon_RunId_Response
                                              );
                                              if (
                                                sysRecon_RunId_Response.data
                                                  .status === "SUCCESS"
                                              ) {
                                                console.log(
                                                  "responseiiiiiiiiiiii",
                                                  sysRecon_RunId_Response
                                                );
                                                axios({
                                                  url:
                                                    "https://flashai.azurewebsites.net/api/validation/reconciliation-preview",
                                                }).then(
                                                  (sysRecon_RunId_API_Response) => {
                                                    console.log(
                                                      sysRecon_RunId_API_Response
                                                    );
                                                    // _this.setState({responseData: response, isLoading : false,sourceConnecting:false, runConnected:true}, () => callBackFunction(_this.state.responseData))
                                                    clearInterval(sysReconTimer);
      
                                                    axios({
                                                      method: "post",
                                                      url:
                                                        "https://flashai.azurewebsites.net/run-script",
                                                      data: {
                                                        jobName: "data_recon",
                                                      },
                                                    })
                                                      .then((data_Recon_response) => {
                                                        const dataRecon_runId_value =
                                                          data_Recon_response.data
                                                            .data.run_id;
                                                        axios({
                                                          method: "get",
                                                          url: `https://flashai.azurewebsites.net/check-job-status?runId=${dataRecon_runId_value}`,
                                                        }).then(
                                                          (
                                                            data_Recon_runId_response
                                                          ) => {
                                                            console.log(
                                                              "resposeee",
                                                              data_Recon_runId_response
                                                            );
                                                            if (
                                                              data_Recon_runId_response
                                                                .data.status ===
                                                                "PENDING" ||
                                                              data_Recon_runId_response
                                                                .data.status ===
                                                                "RUNNING"
                                                            ) {
                                                              var dataReconTimer;
      
                                                              dataReconTimer = setInterval(
                                                                async function () {
                                                                  data_Recon_runId_response = await axios.get(
                                                                    `https://flashai.azurewebsites.net/check-job-status?runId=${dataRecon_runId_value}`
                                                                  );
                                                                  if (
                                                                    data_Recon_runId_response
                                                                      .data.status ===
                                                                    "SUCCESS"
                                                                  ) {
                                                                    console.log(
                                                                      "responseiiiiiiiiiiii",
                                                                      data_Recon_runId_response
                                                                      );
                                                                      clearInterval(
                                                                        dataReconTimer
                                                                      );
                                                                      _this.setState({loading:false})
                                                                      } else if (
                                                                    data_Recon_runId_response
                                                                      .data.status ===
                                                                      "SKIPPED" ||
                                                                    data_Recon_runId_response
                                                                      .data.status ===
                                                                      "INTERNAL_ERROR" ||
                                                                    data_Recon_runId_response
                                                                      .data.status ===
                                                                      "CANCELED" ||
                                                                    data_Recon_runId_response
                                                                      .data.status ===
                                                                      "FAILED"
                                                                  ) {
                                                                    clearInterval(
                                                                      dataReconTimer
                                                                    );
                                                                    _this.setState({loading:false})
                                                                    //   _this.setState({isLoading:false,sourceConnecting : false,failed:true})
                                                                  }
                                                                },
                                                                10000
                                                              );
                                                            } else if (
                                                              data_Recon_runId_response
                                                                .data.status ===
                                                              "SUCCESS"
                                                            ) {
                                                              clearTimeout(
                                                                dataReconTimer
                                                              );
                                                              _this.setState({loading:false})
                                                               } else if (
                                                              data_Recon_runId_response
                                                                .data.status ===
                                                                "SKIPPED" ||
                                                              data_Recon_runId_response
                                                                .data.status ===
                                                                "INTERNAL_ERROR" ||
                                                              data_Recon_runId_response
                                                                .data.status ===
                                                                "CANCELED" ||
                                                              data_Recon_runId_response
                                                                .data.status ===
                                                                "FAILED"
                                                            ) {
                                                              console.log(
                                                                data_Recon_runId_response
                                                              );
                                                              _this.setState({loading:false})
                                                              //   _this.setState({isLoading:false,sourceConnecting : false,failed:true})
                                                            }
                                                          }
                                                        );
                                                      })
      
                                                      .catch((error) => {
                                                        if (
                                                          error.data_Recon_response
                                                            .status === 400
                                                        ) {
                                                          _this.setState({loading:false})
                                                          //   this.setState({isLoading:false,sourceConnecting : false,failed:true})
                                                        }
                                                      });
                                                  }
                                                );
                                              } else if (
                                                sysRecon_RunId_Response.data
                                                  .status === "SKIPPED" ||
                                                sysRecon_RunId_Response.data
                                                  .status === "INTERNAL_ERROR" ||
                                                sysRecon_RunId_Response.data
                                                  .status === "CANCELED" ||
                                                sysRecon_RunId_Response.data
                                                  .status === "FAILED"
                                              ) {
                                                clearInterval(sysReconTimer);
                                                //   _this.setState({isLoading:false,sourceConnecting : false,failed:true})
                                              }
                                            },
                                            10000
                                          );
                                        } else if (
                                          sysRecon_RunId_Response.data.status ===
                                          "SUCCESS"
                                        ) {
                                          clearTimeout(sysReconTimer);
                                          axios({
                                            url:
                                              "https://flashai.azurewebsites.net/api/validation/reconciliation-preview",
                                          }).then((sysRecon_RunId_API_Response) => {
                                            console.log(sysRecon_RunId_API_Response);
                                            //   _this.setState({responseData: response, isLoading : false,sourceConnecting:false, runConnected:true}, () => callBackFunction(this.state.responseData))
                                          });
                                        } else if (
                                          sysRecon_RunId_Response.data.status ===
                                            "SKIPPED" ||
                                          sysRecon_RunId_Response.data.status ===
                                            "INTERNAL_ERROR" ||
                                          sysRecon_RunId_Response.data.status ===
                                            "CANCELED" ||
                                          sysRecon_RunId_Response.data.status ===
                                            "FAILED"
                                        ) {
                                          console.log(sysRecon_RunId_Response);
                                          //   _this.setState({isLoading:false,sourceConnecting : false,failed:true})
                                        }
                                      });
                                    })
      
                                    .catch((error) => {
                                      if (error.sysRecon_Response.status === 400) {
                                        //   this.setState({isLoading:false,sourceConnecting : false,failed:true})
                                      }
                                    });
                                });
                              } else if (
                                dataValidation_RunId_Response.data.status ===
                                  "SKIPPED" ||
                                dataValidation_RunId_Response.data.status ===
                                  "INTERNAL_ERROR" ||
                                dataValidation_RunId_Response.data.status ===
                                  "CANCELED" ||
                                dataValidation_RunId_Response.data.status === "FAILED"
                              ) {
                                clearInterval(validationTimer);
                                //   _this.setState({isLoading:false,sourceConnecting : false,failed:true})
                              }
                            }, 10000);
                          } else if (
                            dataValidation_RunId_Response.data.status === "SUCCESS"
                          ) {
                            clearTimeout(validationTimer);
                            axios({
                              url:
                                "https://flashai.azurewebsites.net/api/validation/data-validation",
                            }).then((dataValidation_Api_Response) => {
                              console.log(dataValidation_Api_Response);
                              //   _this.setState({responseData: response, isLoading : false,sourceConnecting:false, runConnected:true}, () => callBackFunction(this.state.responseData))
                            });
                          } else if (
                            dataValidation_RunId_Response.data.status === "SKIPPED" ||
                            dataValidation_RunId_Response.data.status ===
                              "INTERNAL_ERROR" ||
                            dataValidation_RunId_Response.data.status ===
                              "CANCELED" ||
                            dataValidation_RunId_Response.data.status === "FAILED"
                          ) {
                            console.log(dataValidation_RunId_Response);
                            //   _this.setState({isLoading:false,sourceConnecting : false,failed:true})
                          }
                        });
                      })
      
                      .catch((error) => {
                        if (error.dataValidation_Response.status === 400) {
                          //   this.setState({isLoading:false,sourceConnecting : false,failed:true})
                        }
                      });
                  });
                } else if (
                  validation_runId_Response.data.status === "SKIPPED" ||
                  validation_runId_Response.data.status === "INTERNAL_ERROR" ||
                  validation_runId_Response.data.status === "CANCELED" ||
                  validation_runId_Response.data.status === "FAILED"
                ) {
                  clearInterval(timer);
                  _this.setState({
                    isLoading: false,
                    sourceConnecting: false,
                    failed: true,
                  });
                }
              }, 10000);
            } else if (validation_runId_Response.data.status === "SUCCESS") {
              clearTimeout(timer);
              axios({
                url:
                  "https://flashai.azurewebsites.net/api/validation/sys-validation",
              }).then((validation_Api_Response) => {
                console.log(validation_Api_Response);
                _this.setState(
                  {
                    responseData: validation_Api_Response,
                    isloading: false,
                    destinationRun: false,
                    runConnected: true,
                  },
                  () => callBackFunction(_this.state.responseData)
                );
                      });
            } else if (
              validation_runId_Response.data.status === "SKIPPED" ||
              validation_runId_Response.data.status === "INTERNAL_ERROR" ||
              validation_runId_Response.data.status === "CANCELED" ||
              validation_runId_Response.data.status === "FAILED"
            ) {
              // .then(response => {
              // console.log(skippedResponse);
              _this.setState({
                isLoading: false,
                sourceConnecting: false,
                failed: true,
                loading:false
              });
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
          console.log("errorvalidation",error)
          // if (error.validation_Response.status === 400) {
             if (error.response.status === 400) {
            _this.setState({
              isLoading: false,
              sourceConnecting: false,
              failed: true,
              loading:false
            });
          }
        });
      
    }
  }

  onClickLoadType = (id,LoadType) => {
    this.setState({sourceConnected:false})

  }

  onClickGo = (id, sourceSystem, callBackFunction) => {
    const _this = this;
    _this.setState({isLoading : true,sourceConnecting : true,sourceConnected: false,runConnected:false, failed:false})
    if(id===1){
//       axios({
//         method: 'post',
//         url: 'https://jsonplaceholder.typicode.com/posts',
//       data:JSON.stringify({
//             projectName: sourceSystem
//           })
//       })
//   .then((response) => {
//     console.log(response);
//     this.setState({isLoading : false, sourceConnecting:false, sourceConnected:true})

//   },
//   error =>{
// console.log(error);
// console.log(error.response.status,"ooooooooooop");
// if(error.response.status === 400){

//   this.setState({isLoading:false,sourceConnecting : false,failed:true})
// }
// }
// );
    axios({
      method: 'post',
      url: 'https://flashai.azurewebsites.net/api/connect',
    data:{
      connectionType: sourceSystem
        }
    })
    
    // axios({
    //   method: 'post',
    //   url: "https://flashai.azurewebsites.net/api/connect",
    //   data:JSON.stringify({​​​​​
    //     connectionType: sourceSystem
    //   }​​​​​)
    //   })
      // axios({
      //   method: 'get',
      //   url: "https://flashai.azurewebsites.net/connect"
      //   })

      .then(response => {
        const runIdValue = response.data.data.run_id;
        axios({
          method: 'get',
          url: `https://flashai.azurewebsites.net/check-job-status?runId=${response.data.data.run_id}`,
          // url: `https://flashai.azurewebsites.net/run`,
          })

          .then(response =>{
            console.log('resposeee', response)
            if (response.data.status === 'PENDING' || response.data.status === 'RUNNING') {
              var timer;
    
                    timer = setInterval(async function () {
                      response = await axios.get(`https://flashai.azurewebsites.net/check-job-status?runId=${runIdValue}`);
                      // response = await axios.get(`https://flashai.azurewebsites.net/run`);
                     console.log("Scuess status is " + response);
                     if (response.data.status === "SUCCESS"){
                      console.log("responseiiiiiiiiiiii",response);
                      // clearTimeout(timer);
                      clearInterval(timer);
                          console.log(response);
                          console.log("thisssssssss",this);
                          _this.setState({isLoading : false, sourceConnecting:false, sourceConnected:true})
                          const milestoneCopy = [..._this.state.milestones];
                          milestoneCopy[id - 1].connected = true;
                          _this.setState({ mileStone: milestoneCopy,sourceSystem :sourceSystem});
                    }
                    else if(response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
                      clearInterval(timer);
                      _this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
                    }
                    }, 10000);                                    
                  }
                else if (response.data.status === "SUCCESS"){
                  clearTimeout(timer);
                      console.log(response);
                      _this.setState({isLoading : false, sourceConnecting:false, sourceConnected:true})
                      const milestoneCopy = [..._this.state.milestones];
                      milestoneCopy[id - 1].connected = true;
                      _this.setState({ mileStone: milestoneCopy,sourceSystem :sourceSystem});
                }
                else if (response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
                // .then(response => {
                      console.log(response);
                      _this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
                  
                }
              });
          })

      .catch((error) => {
        if(error.response.status === 400){
          _this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
        }
        });
  }
  else if(id===2){
    _this.setState({loading:true})
    //   axios({
    //   method: 'post',
    //   url: 'https://next.json-generator.com/api/json/get/NyjtsjISF',
    // data:JSON.stringify({
    //       title: sourceSystem 
    //     })
    // })
    // //  axios.post('https://flashai.azurewebsites.net/api/connect', {
    // //   jobName: "sys_profile"
    // // })
    //   .then((response) => {
    //     console.log(response, "this is response");
    //     this.setState({responseData: response, isLoading : false,sourceConnecting:false, runConnected:true}, () => callBackFunction(this.state.responseData))
    //   },
    //   error =>{
    // console.log(error);
    // }
    // );
    if(sourceSystem === "onPremiseSql"|| sourceSystem === "Azure-SQLDB"){
    axios({
      method: 'post',
      url: "https://flashai.azurewebsites.net/run-script",
      // url: `https://flashai.azurewebsites.net/connect`,
      data:{
        jobName: 'sys_profile'
          }
      })
      
  
    .then(response => {
      const ProfilerunIdValue = response.data.data.run_id;
      axios({
        method: 'get',
        url: `https://flashai.azurewebsites.net/check-job-status?runId=${ProfilerunIdValue}`,
        // url: `https://flashai.azurewebsites.net/run`,
        })
  
        .then(response =>{
          console.log('resposeee', response)
          if (response.data.status === 'PENDING' || response.data.status === 'RUNNING') {
            var timer;
  
                  timer = setInterval(async function () {
                    response = await axios.get(`https://flashai.azurewebsites.net/check-job-status?runId=${ProfilerunIdValue}`);
                    // response = await axios.get(`https://flashai.azurewebsites.net/run`);
                   console.log("Scuess status is " + response);
                   if (response.data.status === "SUCCESS"){
                    console.log("responseiiiiiiiiiiii",response);
                    // clearTimeout(timer);
                    axios({
                      url: "https://flashai.azurewebsites.net/api/profiling/generate-profiling-preview-report",
                    })
                    .then(response => {
                      console.log(response);
                      _this.setState({responseData: response, isLoading : false,sourceConnecting:false, runConnected:true}, () => callBackFunction(_this.state.responseData))
                      clearInterval(timer);
  
                      
                      axios({
                          method: 'post',
                          url: "https://flashai.azurewebsites.net/run-script",
                          // url: `https://flashai.azurewebsites.net/connect`,
                          data:{
                            jobName: 'data_profile'
                              }
                          })
                          
                      
                        .then(response => {
                          const ProfilesqlIdValue = response.data.data.run_id;
                          axios({
                            method: 'get',
                            url: `https://flashai.azurewebsites.net/check-job-status?runId=${ProfilesqlIdValue}`,
                              })
                      
                            .then(response =>{
                              console.log('resposeee', response)
                              if (response.data.status === 'PENDING' || response.data.status === 'RUNNING') {
                                var timer;
                      
                                      timer = setInterval(async function () {
                                        response = await axios.get(`https://flashai.azurewebsites.net/check-job-status?runId=${ProfilesqlIdValue}`);
                                        console.log("Scuess status is " + response);
                                       if (response.data.status === "SUCCESS"){
                                        console.log("responseiiiiiiiiiiii",response);
                                        clearTimeout(timer);
                                       _this.setState({loading: false})   
                                       const milestoneCopy = [..._this.state.milestones];
                                       milestoneCopy[id - 1].connected = true;
                                      _this.setState({ mileStone: milestoneCopy,sourceSystem :sourceSystem});                                    
                                      }
                                      else if(response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
                                        clearInterval(timer);
                                        console.log("response man man",response)
                                       _this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
                                      }
                                      }, 10000);                                    
                                    }
                                  else if (response.data.status === "SUCCESS"){
                                    clearTimeout(timer);
                                   
                                     _this.setState({loading: false})
                                     const milestoneCopy = [..._this.state.milestones];
                                     milestoneCopy[id - 1].connected = true;
                                     _this.setState({ mileStone: milestoneCopy,sourceSystem :sourceSystem});
                                      
                                  }
                                  else if (response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
                                       console.log(response,"this is the main problem man");
                                        _this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
                                      }
                                });
                            })
                    })
                  }
                  else if(response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
                    console.log("main problem with response",response)
                    clearInterval(timer);
                    _this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
                  }
                  }, 10000);                                    
                }
              else if (response.data.status === "SUCCESS"){
                clearTimeout(timer);
                axios({
                  url: "https://flashai.azurewebsites.net/api/profiling/generate-profiling-preview-report",
                  })
                  .then(response => {
                    console.log(response);
                    _this.setState({responseData: response, isLoading : false,sourceConnecting:false,loading: false, runConnected:true}, () => callBackFunction(this.state.responseData))
                  })
              }
              else if (response.data.status === "SKIPPED" || response.status === 500 ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
              // .then(response => {
                    console.log(response, "this is the main errror");
                    _this.setState({isLoading:false,sourceConnecting : false,loading: false,failed:true}) 
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
        _this.setState({isLoading:false,sourceConnecting : false,failed:true,loading: false}) 
      }
      });
    }
        
    else if(sourceSystem === "blobCsv"|| sourceSystem === "blobJson"|| sourceSystem === "blobParquet"){
      axios({
        method: 'post',
        url: "https://flashai.azurewebsites.net/run-script",
        // url: `https://flashai.azurewebsites.net/connect`,
        data:{
          jobName: 'blob_sys_profile',
            }
        })
    
      .then(response => {
        const ProfilerunIdValue = response.data.data.run_id;
        axios({
          method: 'get',
          url: `https://flashai.azurewebsites.net/check-job-status?runId=${ProfilerunIdValue}`,
          // url: `https://flashai.azurewebsites.net/run`,
          })
    
          .then(response =>{
            console.log('resposeee', response)
            if (response.data.status === 'PENDING' || response.data.status === 'RUNNING') {
              var timer;
    
                    timer = setInterval(async function () {
                      response = await axios.get(`https://flashai.azurewebsites.net/check-job-status?runId=${ProfilerunIdValue}`);
                      // response = await axios.get(`https://flashai.azurewebsites.net/run`);
                     console.log("Scuess status is " + response);
                     if (response.data.status === "SUCCESS"){
                      console.log("responseiiiiiiiiiiii",response);
                      // clearTimeout(timer);
                      axios({
                        url: "https://flashai.azurewebsites.net/api/blob/generate-blob-profiling-preview",
                      })
                      .then(response => {
                        console.log(response);
                        _this.setState({responseData: response, isLoading : false,sourceConnecting:false, runConnected:true}, () => callBackFunction(_this.state.responseData))
                        clearInterval(timer);
    
                        
        axios({
            method: 'post',
            url: "https://flashai.azurewebsites.net/run-script",
            data:{
              jobName: 'blob_data_profile',
                }
            })
        
          .then(response => {
            const ProfilerunIdValue = response.data.data.run_id;
            axios({
              method: 'get',
              url: `https://flashai.azurewebsites.net/check-job-status?runId=${ProfilerunIdValue}`,
              })
        
              .then(response =>{
                console.log('resposeee', response)
                if (response.data.status === 'PENDING' || response.data.status === 'RUNNING') {
                  var timer;
        
                        timer = setInterval(async function () {
                          response = await axios.get(`https://flashai.azurewebsites.net/check-job-status?runId=${ProfilerunIdValue}`);
                         console.log("Scuess status is " + response);
                         if (response.data.status === "SUCCESS"){
                          clearTimeout(timer);
                          const milestoneCopy = [..._this.state.milestones];
                          milestoneCopy[id - 1].connected = true;
                          _this.setState({ mileStone: milestoneCopy,sourceSystem :sourceSystem});
                          //_this.setState({responseData: response, isLoading : false,sourceConnecting:false, runConnected:true})
                        }
                        else if(response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
                          clearInterval(timer);
                         // _this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
                        }
                        }, 10000);                                    
                      }
                    else if (response.data.status === "SUCCESS"){
                      clearTimeout(timer);
                          console.log(response);
                          const milestoneCopy = [..._this.state.milestones];
                          milestoneCopy[id - 1].connected = true;
                          _this.setState({ mileStone: milestoneCopy,sourceSystem :sourceSystem});
                         // _this.setState({responseData: response, isLoading : false,sourceConnecting:false, runConnected:true})
                       
                    }
                    else if (response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
                          console.log(response);
                          // _this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
                                        
                    }
                  });
              })
                      })
                    }
                    else if(response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
                      clearInterval(timer);
                      _this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
                    }
                    }, 10000);                                    
                  }
                else if (response.data.status === "SUCCESS"){
                  clearTimeout(timer);
                  axios({
                    url: "https://flashai.azurewebsites.net/api/blob/generate-blob-profiling-preview",
                    })
                    .then(response => {
                      console.log(response);
                      _this.setState({responseData: response, isLoading : false,sourceConnecting:false, runConnected:true}, () => callBackFunction(_this.state.responseData))
                    })
                }
                else if (response.data.status === "SKIPPED" ||response.data.status === "INTERNAL_ERROR" || response.data.status ==="CANCELED" || response.data.status ==="FAILED"){
                // .then(response => {
                      console.log(response);
                      _this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
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
          _this.setState({isLoading:false,sourceConnecting : false,failed:true}) 
        }
        });    
    }

    else if(sourceSystem === "AzureSynapse"){
       axios({
      method: 'get',
      
      url: "https://flashai.azurewebsites.net/api/profiling/generate-synapse-preview",
     })
    
      .then((response) => {
        console.log(response, "this is response");
        this.setState({responseData: response, loading:false,isLoading : false,sourceConnecting:false, runConnected:true}, () => callBackFunction(this.state.responseData))
        const milestoneCopy = [..._this.state.milestones];
        milestoneCopy[id - 1].connected = true;
        this.setState({ mileStone: milestoneCopy,sourceSystem :sourceSystem});
      },
      error =>{
    console.log(error);
    }
    );
      
    } 
    
  } 
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

  onClickBackEvent = (id, e) =>{
    const milestoneCopy = [...this.state.milestones];
    milestoneCopy[id-1].hide = true;
    milestoneCopy[id-1].showDiv = false;
    milestoneCopy[id-2].showDiv = true;
    this.setState({ mileStone: milestoneCopy });  
  }

  //render card 1
  renderOne = (obj) => {
    return (
      <Container
        style={{
          alignItem: "center",
          justifyContent: "center",
          width: "80%",
          marginTop: "-35px",
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
          marginTop: "-35px",
        }}
      >
        <MileStrongDescriptionTwo
          mileStones={obj}
          connectApi={this.onClickGo}
          isLoading={this.state.isLoading}
          loading= {this.state.loading}
          sourceSystem = {sourceSystem}
          onClickEvent={this.onClickEvent}
          apiResponse = {this.onClickRunButton}
          onClickBackEvent = {this.onClickBackEvent}
          sourceConnecting = {this.state.sourceConnecting}
          runConnected = {this.state.runConnected}
          successResponse = {this.state.responseData}
        />
        
      </Container>
    );
  };

  //render card 3
  renderThree = (obj,sourceSystem,popUpData) => {
    return (
      <Container
      style={{
        alignItem: "center",
        justifyContent: "center",
        width: "80%",
        marginTop: "-35px",
      }}
      >
        <MileStrongDescriptionThree
          mileStones={obj}
          connectApi={this.onClickRunButton}
          sourceSystem={sourceSystem}
          onClickEvent={this.onClickEvent}
          onClickBackEvent = {this.onClickBackEvent}
          successResponse = {this.state.responseData}
          popUpData ={this.state.popUpTextfiled}
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
          marginTop: "-35px",
        }}
      >
        <MileStrongDescriptionFour
          mileStones={obj}
          isloading={this.state.isloading}
          connectApi={this.onClickDestination}
          connectLoadApi={this.onClickLoadType}
          onClickEvent={this.onClickEvent}
          onClickBackEvent = {this.onClickBackEvent}
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
          marginTop: "-35px",
        }}
      >
        <MileStrongDescriptionFive
          mileStones={obj}
          onClickEvent={this.onClickEvent}
          connectApi={this.onClickDestination}
          apiResponse = {this.onClickRunButton}
          onClickBackEvent = {this.onClickBackEvent}
          isloading={this.state.isloading}
          loading= {this.state.loading}
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
    axios.post('https://flashai.azurewebsites.net/create-project', {
      "projectName": this.state.popUpTextfiled
    })
    // .then(function (response) {
    //   console.log(response);
    // })
    
        .then((response) => {
          console.log(response);
          if(response.data.error === false){
            this.setState({loading: false, visible: false})
          }
        })
        .catch((error) => {
          console.log("errorvalidation",error)
          if (error.response.status === 400) {
            
            this.setState({ loading: false, visible: true,projectNameValidation:true });
          }
        });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  publish() {
    console.log( "publissssssss",this.state.popUpTextfiled );
  }
  
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }


  render() {    
    const { visible, loading,projectNameValidation } = this.state;
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
          maskClosable={false}
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
          {projectNameValidation ? (
          <div className="projectNameerror">
            <p>Project name already exists</p>
          </div>
        ) : null}
        
        </Modal>
        {/* {this.state.isLoading ? <div className="loadingContainer"><Spinner animation="border" /></div> : null } */}
           <Container className="topHeader" fluid="lg">
  <Row>
    <Col xs={4} ><Link to="/HomePage"><img src={newLogo} alt="newLogo" style={{width:"100%"}} /></Link></Col>

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
              return this.renderThree(obj,sourceSystem);
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
