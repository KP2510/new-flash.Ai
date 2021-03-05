import React, { useState, useEffect, Fragment } from "react";
import { Card } from "react-bootstrap";
import moment from 'moment';
import {
  Button,
  } from "antd";
import "./TopBar/TopBarStyle.css";
import classes from "./MileStoneDescComp.module.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { download } from "../ExportAsCsv";
import { DownloadOutlined } from "@ant-design/icons";

const MileStrongDescriptionFive = ({
    mileStones,
    connectApi,
    apiResponse,
    destinationSystem,
    isloading,
    destinationRun,
    runConnected,
    loading,
    onClickBackEvent
  }) => {
    const [objectCount, setObjectCount] = useState([]);
    const [tableHeader, setTableHeader] = useState([]);
  
    const [dbCount, setDbCount] = useState([]);
    const [dbtableHeader, setDbtableHeader] = useState([]);
  
    const getData = () => {
      let columnArray = [];
      let dbcolumnArray = [];
      connectApi(mileStones.id, destinationSystem, (responseData) => {
        const response = responseData;
        console.log(response, "Bingo one");
        console.log(responseData, "Bingo");
        if (response) {
          if (
            response.data.usp_RDBMSProfDBCnt &&
            response.data.usp_RDBMSProfDBCnt.length > 0
          ) {
            let firstElement = response.data.usp_RDBMSProfDBCnt[0];
  
            for (let key in firstElement) {
              columnArray.push(key);
            }
          }
          if (
            response.data.usp_RDBMSProfDBList &&
            response.data.usp_RDBMSProfDBList.length > 0
          ) {
            let firstElement = response.data.usp_RDBMSProfDBList[0];
  
            for (let key in firstElement) {
              dbcolumnArray.push(key);
            }
          }
          setObjectCount(response.data.usp_RDBMSProfDBCnt);
          setTableHeader(columnArray);
          setDbCount(response.data.usp_RDBMSProfDBList);
          setDbtableHeader(dbcolumnArray);
  
          apiResponse(mileStones.id, {});
        }
      });
    };
  
    useEffect(() => {}, [isloading]);
  
    const renderHeader = () => {
      // let headerElement = ['id', 'name', 'email', 'phone']
      return tableHeader.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>;
      });
    };
  
    const renderdbCountHeader = () => {
      // let headerElement = ['id', 'name', 'email', 'phone']
      return dbtableHeader.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>;
      });
    };
  
    const renderBody = () => {
      return (
        objectCount &&
        objectCount.map((element, index) => {
          let col = Object.keys(element);
          return (
            <tr key={element.id}>
              {col.map((val, index) => {
                return <td key={index}>{element[col[index]]}</td>;
              })}
            </tr>
          );
        })
      );
    };
    const renderDbCountBody = () => {
      return (
        dbCount &&
        dbCount.map((element, index) => {
          let col = Object.keys(element);
          return (
            <tr key={element.id}>
              {col.map((val, index) => {
                return <td key={index}>{element[col[index]]}</td>;
              })}
            </tr>
          );
        })
      );
    };
    const genrateExcel = () => {
  
      var responseDate = moment().format('MM/DD/YYYY');
      axios({
        method: "get",
        url: "https://flashai.azurewebsites.net/api/validation/reconciliation-download",
        
        // url: "https://next.json-generator.com/api/json/get/VyDCM2TBK",
      }).then(
        function (response) {
          console.log(response);
          download("csv", "RDBMSReconMetadata "+ responseDate, response.data.usp_RDBMSProfSystem);
          download("csv", "RDBMSReconCardinality "+ responseDate, response.data.usp_RDBMSReconCardinality);
          download("csv", "RDBMSReconDataDefinition "+ responseDate, response.data.usp_RDBMSReconDataDefinition);
          download("csv", "RDBMSReconDistributionAndPattern "+ responseDate, response.data.usp_RDBMSReconDistributionAndPattern);
        },
        (error) => {
          console.log(error);
        }
      );
    };
  
    return (
      <Fragment>
        <Card className="arrow_box5">
          <p className="infoMessage">
          Validation and reconciliation of migrated data between source and destination
          </p>
          {/* style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "flex-start"}} */}
          {isloading ? (
            <div className={classes.loadingContainer}>
              <Spinner animation="border" />
            </div>
          ) : null}
          <button
            className="runValidation"
            onClick={(e) => {
              // connectApi(mileStones.id, sourceSystem);
              getData();
            }}
            // onClick={() => getData()}
          >
            Run Validation
          </button>
          {mileStones.connected && <h3 id="title">Database Summary</h3>}
  
          <table id="employee">
            <thead>
              <tr>{renderHeader()}</tr>
            </thead>
            <tbody>{renderBody()}</tbody>
          </table>
          {mileStones.connected && <h3 id="title">Count of database</h3>}
          <table id="employee">
            <thead>
              <tr>{renderdbCountHeader()}</tr>
            </thead>
            <tbody>{renderDbCountBody()}</tbody>
          </table>
          <Card.Body>
            <div className="generateDiv">
              <Button
                className="genrateReportButton"
                onClick={(e) => genrateExcel()}
                disabled={!mileStones.connected}
                // icon={<DownloadOutlined />}
                loading={loading}
              >
                <DownloadOutlined />
                Validation Report
              </Button>
            </div>
            {/* <button onClick={e => onClickEvent(mileStones.id, e)}  disabled={!mileStones.connected}>Next</button> */}
          </Card.Body>
        </Card>
        <div className="messageClass">
        {/* <div className="someThingclass">
      <hr className="backLine"></hr>
      <button
          className="backButton"
          onClick={(e) => onClickBackEvent(mileStones.id, e)}
        >
          Back
        </button>
        </div> */}
          {destinationRun ? (
            <div className="the-source-is-connec">
              <p>Validation processing...</p>
            </div>
          ) : null}
          {runConnected ? (
            <div className="the-source-is-connec">
              <p>Validation completed</p>
            </div>
          ) : null}
        </div>
      </Fragment>
    );
  };

  export default MileStrongDescriptionFive;