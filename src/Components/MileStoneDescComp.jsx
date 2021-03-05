import React, { useState, useEffect, Fragment } from "react";
import { Card, Row } from "react-bootstrap";
import moment from 'moment';

import {
  Select,
  Button,
  } from "antd";
import "./TopBar/TopBarStyle.css";
import classes from "./MileStoneDescComp.module.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { download } from "../ExportAsCsv";
import { DownloadOutlined } from "@ant-design/icons";

const { Option } = Select;

//card1
const MileStoneDescriptionOne = ({
  mileStones,
  onClickEvent,
  connectApi,
  isLoading,
  sourceConnecting,
  sourceConnected,
  failed
}) => {
  console.log(onClickEvent, mileStones);
  const [sourceSystem, setSourceSystem] = useState("");
  function handleChange(value) {
    console.log(`selected ${value}`);
    console.log("sourceSystem", sourceSystem);
    setSourceSystem(value);
  }

  const invokeFunction = () => {
    connectApi(mileStones.id, sourceSystem);
  };
  useEffect(() => {
    console.log("abcdef", isLoading);
    console.log("xyzzzzz", sourceConnecting);
  }, [isLoading, sourceConnecting, sourceConnected]);
  return (
    <Fragment>
      <Card className="arrow_box">
        <p className="infoMessage">Establish connection with source system</p>
        {isLoading ? (
          <div className={classes.loadingContainer}>
            <Spinner animation="border" />
          </div>
        ) : null}
        {/* style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "flex-start"}} */}
        <Card.Body style={{ display: "flex" }}>
          <Row>
            <Card.Text className="dropdownHeader">
            Select source system

            </Card.Text>
            {/* <Button size="sm">Some Button</Button> */}
            <Select
              defaultValue="Select the Source System"
              className="dropdownSelection"
              onChange={handleChange}
            >
              <Option value="onPremiseSql">On- premise SQL Server</Option>
              <Option value="Azure-SQLDB">Azure Sql</Option>
              <Option value="AzureSynapse">Azure Synapse</Option>
              <Option value="blobCsv">Azure Blob - CSV</Option>
              <Option value="blobJson">Azure Blob - JSON</Option>
              <Option value="blobParquet">Azure Blob - Parquet</Option>
              <Option disabled value="onPremiseTeradata">On-premise Teradata</Option>
              <Option disabled value="onPremiseHDFS">On-premise HDFS</Option>
            </Select>
            <button className="goButton" onClick={() => invokeFunction()}>
              Go
            </button>
          </Row>
        </Card.Body>
      </Card>
      <div className="messageClass">
        {sourceConnecting ? (
          <div className="the-source-is-connec">
            <p>The Source is connecting</p>
          </div>
        ) : null}
        {sourceConnected ? (
          <div className="the-source-is-connec">
            <p>The Source is connected</p>
          </div>
        ) : null}
        {failed? (
          <div className="failed">
            <p>Failed to connect... Please try again!</p>
          </div>
        ) : null}

        <button
          className="nextButton"
          onClick={(e) => onClickEvent(mileStones.id, e)}
          disabled={!mileStones.connected}
        >
          Next
        </button>
        <hr className="nextLine"></hr>
      </div>
    </Fragment>
  );
};

//card 2
const MileStrongDescriptionTwo = ({
  mileStones,
  onClickEvent,
  sourceSystem,
  apiResponse,
  isLoading,
  loading,
  connectApi,
  sourceConnecting,
  onClickBackEvent,
  runConnected,
}) => {
  console.log("sourceSystemrrrrrrrrrr", sourceSystem);
  console.log("hhhhhhhhh", mileStones);

  const genrateExcel = () => {
    // axios({
    //   method: "get",
    //   url: "https://next.json-generator.com/api/json/get/NyjtsjISF",
    // })
    console.log("sourceSystemmmmmmmmmmmmmmmmmmmmmmmm",sourceSystem);
    var responseDate = moment().format('MM/DD/YYYY');
    if(sourceSystem === "onPremiseSql"||sourceSystem === "Azure-SQLDB"){

      axios({
        method: "get",
        url: "https://flashai.azurewebsites.net/api/profiling/generate-profiling-report",
      })
      .then(
        function (response) {
          console.log(response);
          download("csv", "QualitativeReport"+ responseDate, response.data.usp_RDBMSProfData);
          download("csv", "QualitativeReport1"+ responseDate, response.data.usp_RDBMSProfSystem);
        
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else if(sourceSystem === "blobCsv"|| sourceSystem === "blobJson"|| sourceSystem === "blobParquet"){
      axios({
        method: "get",
        url: "https://flashai.azurewebsites.net/api/profiling/generate-blob-profiling-report",
      })
      .then(
        function (response) {
          console.log(response);
          download("csv", "QualitativeReport"+ responseDate,  response.data.usp_BlobProfData);
        },
        (error) => {
          console.log(error);
        }
      );
    }
   else if(sourceSystem === "AzureSynapse"){

      axios({
        method: "get",
        url: "https://flashai.azurewebsites.net/api/profiling/generate-synapse-report",
      })
      .then(
        function (response) {
          console.log(response);
          download("csv", "synapse 1"+ responseDate, response.data.usp_RDBMSProfSystem);
          download("csv", "synapse 2"+ responseDate, response.data.usp_RDBMSProfdata);
        
        },
        (error) => {
          console.log(error);
        }
      );
    }
   
  };
  const [objectCount, setObjectCount] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);

  const [dbCount, setDbCount] = useState([]);
  const [dbtableHeader, setDbtableHeader] = useState([]);

  // const [connected, setConnected] =  useState(mileStones.connected);

  useEffect(() => {
    // getData();
  }, [sourceConnecting, runConnected]);

  const getData = () => {
    let columnArray = [];
    let dbcolumnArray = [];
    connectApi(mileStones.id, sourceSystem, (responseData) => {
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

  return (
    <Fragment>
      <Card className="arrow_box2">
        <p className="infoMessage">Understand the qualitative and quantitative profile of your data before migration</p>
        <h2 id="planningTitle">Quantitative profile</h2>
        <button
          className="runButton"
          onClick={(e) => {
            // connectApi(mileStones.id, sourceSystem);
            getData();
          }}
          // onClick={() => getData()}
        >
          Start profiling
        </button>
        {mileStones.connected && <h3 id="title">Count of database</h3>}
        <table id="employee">
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
        
        {mileStones.connected && <h3 id="title">Database Summary</h3>}
        <table id="employee">
          <thead>
            <tr>{renderdbCountHeader()}</tr>
          </thead>
          <tbody>{renderDbCountBody()}</tbody>
        </table>
       
        {isLoading ? (
          <div className={classes.loadingContainer}>
            <Spinner animation="border" />
          </div>
        ) : null}
        {/* style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "flex-start"}} */}
        <Card.Body>
          {/* <Button size="sm">Some Button</Button> */}
          <div className="generateDiv">
            <Button
              className="genrateReportButton"
              onClick={(e) => genrateExcel()}
              disabled={!mileStones.connected}
              // icon={<DownloadOutlined />}
              loading={loading}
            >
              <DownloadOutlined />
              Qualitative Report
            </Button>
          </div>
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
        {sourceConnecting ? (
          <div className="the-source-is-connec">
            <p>Profiling processing...</p>
          </div>
        ) : null}
        {runConnected ? (
          <div className="the-source-is-connec">
            <p>Profiling completed</p>
          </div>
        ) : null}
        <button
          className="nextButton"
          onClick={(e) => onClickEvent(mileStones.id, e)}
          disabled={!mileStones.connected}
        >
          Next
        </button>
        <hr className="nextLine"></hr>
      </div>
    </Fragment>
  );
};

//card 3


//card 4


//card 5

// export default MileStoneDescription;
export {
  MileStrongDescriptionTwo,
  MileStoneDescriptionOne,
};
