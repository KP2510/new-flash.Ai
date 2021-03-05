import React, { useState, useEffect, Fragment } from "react";
import { Card, Row } from "react-bootstrap";
import moment from "moment";

import { Select, Collapse, Tabs, Radio } from "antd";
import "./TopBar/TopBarStyle.css";
import classes from "./MileStoneDescComp.module.css";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { download } from "../ExportAsCsv";
import { DownloadOutlined } from "@ant-design/icons";
import IngestionTabelData from "./IngestionTableData/IngestionTable";
import MyLoader from "../Loader";

const { Option } = Select;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

const MileStrongDescriptionFour = ({
  mileStones,
  onClickEvent,
  connectLoadApi,
  isloading,
  connectApi,
  sourceConnected,
  destinationConnecting,
  onClickBackEvent,
}) => {
  console.log(onClickEvent, mileStones);
  const [destinationSystem, setDestinationSystem] = useState("");
  const [LoadType, setLoadType] = useState("");
  const [tableData, setTableData] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [loadConnected, setLoadConnected] = useState(false);
  const [loadConnecting, setLoadConnecting] = useState(false);
  const [value, setValue] = useState({ fileLoad: "csv" });
  function handleChange(value) {
    console.log(`selected ${value}`);
    console.log("destinationSystem", destinationSystem);
    setDestinationSystem(value);
  }

  useEffect(() => {
    getDataForIngestion();
  }, []);

  const dataSource = [];
  const getDataForIngestion = async () => {
    setApiLoading(true);
    const response = await axios.get(
      "https://flashai.azurewebsites.net/api/ingestion/get-table-list"
      // "https://next.json-generator.com/api/json/get/VJ7nKTyuF"
    );
    if (response.data.tableList && response.data.tableList.length > 0) {
      setApiLoading(false);
    }
    const ingestionData = response.data.tableList;
    console.log(ingestionData, "This is the resonse");

    
    function transform(arr){

      for(let i = 0 ; i < arr.length; i++){
        let obj = arr[i];
        obj.columnAndType = [];
        for(let j = 0; j < obj.column_name.length; j++){ 
          obj.columnAndType.push({
            name: obj.column_name[j],
            type: obj.datatype[j]
          })
        }
      }
      return arr;
    }

    console.log(transform(ingestionData))


    const key = "databasename";
    const uniqueTableList = [
      ...new Map(ingestionData.map((item) => [item[key], item])).values(),
    ];

    const unique = (arr, props = []) => [
      ...new Map(
        arr.map((entry) => [props.map((k) => entry[k]).join("|"), entry])
      ).values(),
    ];
    const uniqueIngestionValues = unique(ingestionData, [
      "table_name",
      "column_name",
    ]);

    console.log(ingestionData, "trilllllio");
    console.log(uniqueIngestionValues, "trilllllio");
    console.log(uniqueTableList, "uniqueTableList");

    const updateTableArrayOne = [];
    const selectedRowData = {};
    uniqueTableList.forEach((obj) => {
      const value = {
        head: obj.databasename,
        data: ingestionData.filter(
          ({ databasename }) => obj.databasename === databasename
        ),
      };
      selectedRowData[value.head] = [];
      updateTableArrayOne.push(value);
    });

    console.log("updateTableArrayOne", updateTableArrayOne);
    setSelected(selectedRowData);
    setTableData(updateTableArrayOne);
    console.log("ppppp", dataSource);
    return dataSource;
  };

  const invokeFunction = () => {
    connectApi(mileStones.id, destinationSystem);
  };

  const genrateExcel = () => {
    var responseDate = moment().format("MM/DD/YYYY");
    axios({
      method: "get",
      url:
        "https://flashai.azurewebsites.net/api/ingestion/generate-ingestion-report",
    }).then(
      function (response) {
        console.log(response);
        download(
          "csv",
          "LineageReport" + responseDate,
          response.data.ingestionreport
        );
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const invokeLoadFunction = () => {
    connectLoadApi(mileStones.id);
    console.log("loadValueType123", loadValueType);
    console.log("ingestiondataValue", finalValue);
    console.log("radiobuttonValue", radioButtonValue);
    // const tableListReformatted1 = []
    // dataValue.forEach( listItem => {

    //   const flattenedItems = listItem.datatype.map( (datatype, index) => {

    //     return {
    //       ...listItem,
    //       column_name: listItem.column_name[index],
    //       datatype
    //     }

    //   })

    //   tableListReformatted1.push(...flattenedItems)

    // });

    function refector(dataValue) {
      dataValue.forEach(element => {
          const temp_name = [];
          const temp_type = [];
          
          element.columnAndType.forEach(elementTwo => {
            temp_name.push(JSON.parse(elementTwo).name);
            temp_type.push(JSON.parse(elementTwo).type);
          })
          element.column_name = Object.assign([], temp_name)
          element.datatype = Object.assign([], temp_type)
          temp_name.length = 0;
          temp_type.length = 0;
      });
      return dataValue
  }
   
  console.log(refector(dataValue))
  console.log("dataValue",dataValue);

    setLoadConnecting(true);
    setLoadConnected(false);
    if (loadValueType === "" || loadValueType === "full/Inceremental") {
      axios({
        method: "post",
        url:
          "https://flashai.azurewebsites.net/api/ingestion/incremental-data-table-list",
        data: {
          ingestionArray: dataValue,
        },
      }).then(
        (response) => {
          setLoadConnecting(true);
          setLoadConnected(false);
          console.log(response);
          axios({
            method: "get",
            url:
              "https://flashai.azurewebsites.net/api/ingestion/full-load-table-list",
          }).then((response) => {
            axios({
              method: "post",
              url:
                "https://flashai.azurewebsites.net/api/ingestion/run-ingestion-script",
              data: {
                jobName: "ingestion_full_load",
              },
            }).then((response) => {
              const runIdValue = response.data.data.run_id;
              axios({
                method: "get",
                url: `https://flashai.azurewebsites.net/check-job-status?runId=${response.data.data.run_id}`,
              }).then((response) => {
                console.log("resposeee", response);
                if (
                  response.data.status === "PENDING" ||
                  response.data.status === "RUNNING"
                ) {
                  var timer;

                  timer = setInterval(async function () {
                    response = await axios.get(
                      `https://flashai.azurewebsites.net/check-job-status?runId=${runIdValue}`
                    );
                    console.log("Scuess status is " + response);
                    if (response.data.status === "SUCCESS") {
                      console.log("responseiiiiiiiiiiii", response);

                      setLoadConnecting(false);
                      setLoadConnected(true);
                      clearInterval(timer);
                      console.log(response);
                      console.log("thisssssssss", this);
                    } else if (
                      response.data.status === "SKIPPED" ||
                      response.data.status === "INTERNAL_ERROR" ||
                      response.data.status === "CANCELED" ||
                      response.data.status === "FAILED"
                    ) {
                      setLoadConnecting(false);
                      clearInterval(timer);
                    }
                  }, 10000);
                } else if (response.data.status === "SUCCESS") {
                  clearTimeout(timer);
                  console.log(response);
                  setLoadConnecting(false);
                  setLoadConnected(true);
                } else if (
                  response.data.status === "SKIPPED" ||
                  response.data.status === "INTERNAL_ERROR" ||
                  response.data.status === "CANCELED" ||
                  response.data.status === "FAILED"
                ) {
                  console.log(response);
                  setLoadConnecting(false);
                  setLoadConnected(false);
                }
              });
              console.log(response);
            });
          });
        },
        (error) => {
          console.log(error);
          setLoadConnecting(false);
          setLoadConnected(false);
        }
      );

      axios({
        method: "post",
        url:
          "https://flashai.azurewebsites.net/api/ingestion/run-ingestion-script",
        data: {
          jobName: "ingestion_delta_load",
        },
      }).then((response) => {
        const runIdValue = response.data.data.run_id;
        axios({
          method: "get",
          url: `https://flashai.azurewebsites.net/check-job-status?runId=${response.data.data.run_id}`,
        }).then((response) => {
          console.log("resposeee", response);
          if (
            response.data.status === "PENDING" ||
            response.data.status === "RUNNING"
          ) {
            var timer;

            timer = setInterval(async function () {
              response = await axios.get(
                `https://flashai.azurewebsites.net/check-job-status?runId=${runIdValue}`
              );
              console.log("Scuess status is " + response);
              if (response.data.status === "SUCCESS") {
                console.log("responseiiiiiiiiiiii", response);
                clearInterval(timer);
                console.log(response);
                console.log("thisssssssss", this);
              } else if (
                response.data.status === "SKIPPED" ||
                response.data.status === "INTERNAL_ERROR" ||
                response.data.status === "CANCELED" ||
                response.data.status === "FAILED"
              ) {
                clearInterval(timer);
              }
            }, 10000);
          } else if (response.data.status === "SUCCESS") {
            clearTimeout(timer);
            console.log(response);
          } else if (
            response.data.status === "SKIPPED" ||
            response.data.status === "INTERNAL_ERROR" ||
            response.data.status === "CANCELED" ||
            response.data.status === "FAILED"
          ) {
            console.log(response);
          }
        });
        console.log(response);
      });
    } else {
      axios({
        method: "post",
        url:
          "https://flashai.azurewebsites.net/api/ingestion/run-ingestion-script",
        data: {
          jobName: "ingestion_file_load",
          type: radioButtonValue,
        },
      }).then(
        (response) => {
          setLoadConnecting(true);
          setLoadConnected(false);
          const runIdValue = response.data.data.run_id;
          axios({
            method: "get",
            url: `https://flashai.azurewebsites.net/check-job-status?runId=${response.data.data.run_id}`,
          }).then((response) => {
            console.log("resposeee", response);
            if (
              response.data.status === "PENDING" ||
              response.data.status === "RUNNING"
            ) {
              var timer;

              timer = setInterval(async function () {
                response = await axios.get(
                  `https://flashai.azurewebsites.net/check-job-status?runId=${runIdValue}`
                );
                console.log("Scuess status is " + response);
                if (response.data.status === "SUCCESS") {
                  console.log("responseiiiiiiiiiiii", response);
                  setLoadConnecting(false);
                  setLoadConnected(true);
                  clearInterval(timer);
                  console.log(response);
                  console.log("thisssssssss", this);
                } else if (
                  response.data.status === "SKIPPED" ||
                  response.data.status === "INTERNAL_ERROR" ||
                  response.data.status === "CANCELED" ||
                  response.data.status === "FAILED"
                ) {
                  setLoadConnecting(false);
                  clearInterval(timer);
                }
              }, 10000);
            } else if (response.data.status === "SUCCESS") {
              setLoadConnecting(false);
              setLoadConnected(true);
              clearTimeout(timer);
              console.log(response);
            } else if (
              response.data.status === "SKIPPED" ||
              response.data.status === "INTERNAL_ERROR" ||
              response.data.status === "CANCELED" ||
              response.data.status === "FAILED"
            ) {
              console.log(response);
              setLoadConnecting(false);
              setLoadConnected(false);
            }
          });
          console.log(response);
        },
        (error) => {
          console.log(error);
          setLoadConnecting(false);
          setLoadConnected(false);
        }
      );
    }
  };

  function onChangeLoad(value) {
    setLoadType(value);
  }

  const options = [
    {
      value: "Full/incrementalLoad",
      label: "Full/incrementalLoad Load",
    },
    {
      value: "fileLoad",
      label: "fileLoad",
      children: [
        {
          value: ".csv",
          label: ".CSV",
        },
        {
          value: "json",
          label: ".JSON",
        },
        {
          value: "parquet",
          label: "PARQUET",
        },
      ],
    },
  ];

  function callback(key) {
    console.log(key);
    const loadValue = key;
    setLoadValueType(key);
    console.log("loadValueType", loadValueType);
  }

  const [selected, setSelected] = useState({});
  const [dataValue, setDataValue] = useState([]);
  const [finalValue, setFinalValue] = useState([]);
  const [loadValueType, setLoadValueType] = useState("");
  const [columnUpdateValue, setColumnUpdateValue] = useState("");
  const [radioButtonValue, setRadioButtonValue] = useState("csv");

  const getSelectedRows = (selectedRows, selectedRow, headValue) => {
    console.log("abcdeeee", selectedRows);
    // console.log("pppppppp", item);
    console.log("selectedrows", selectedRow);
    let changeData = selected;
    changeData[headValue] = selectedRow;
    setSelected(changeData);
    console.log("selectedValuue", selected);
    console.log("pppppppppp", Object.values(selected).flat());
    let dummyArray = Object.values(selected).flat();
    setDataValue(dummyArray);
    console.log("values", dataValue);
  };

  const updateTheActivityValue = (abc) => {
    console.log("values", dataValue);
    const xyz = dataValue;
    console.log("abc12345", abc);
    const pqr = abc;

    // const obj = xyz.filter(db => {
    //   if( pqr.table_name === db.table_name){
    //     const data = Object.assign(db);
    //     db.columnAndType = pqr.columnAndType;
    //     return data;
    //   }
    //   return
    // });
    // debugger
    // console.log(obj);

    const obj = xyz.forEach(db => {
          if(pqr.table_name === db.table_name){
            db.column_name = pqr.column_name;
            db.columnAndType = pqr.columnAndType
          }
          console.log(db);
      });
      console.log(obj);
  };

  const getSelectedColumnNames = (value) => {
    console.log("columnArray", value);
    if (value && value.length < 0) {
      const anyVariable = dataValue;
      console.log("anyVariable", anyVariable);
      anyVariable.forEach((item, index) => {
        item.column_name.forEach((data, i) => {
          if (data === value[0]) {
            anyVariable[index].column_name = value;
            return;
          }
        });
      });
      setDataValue(anyVariable);
    }
  };

  const getSelectedDropdownValues = (columnArray) => {
    console.log("dummyArray123456789", dataValue);
    console.log("getSelectedDropdownValues", columnArray);
    var merged = [].concat.apply([], columnArray);
    console.log("merged", merged);
    const finalArray = [];
    dataValue.forEach((listItem) => {
      if (listItem.column_name.includes(merged[0])) {
        listItem.column_name = merged;
      }
      finalArray.push(dataValue);
    });
    console.log("finaldataValue", finalArray);
    setFinalValue(finalArray);
  };

  const setRadioButtons = (event) => {
    console.log(event.target.value, "jjjjjj");
    setRadioButtonValue(event.target.value);
    setValue({ ...value, fileLoad: event.target.value });
  };

  return (
    <Fragment>
      <Card className="arrow_box4">
        <p className="infoMessage">
          Plan the migration based on the effort estimate of selected data load.
          Select from multiple types of migration, and available tech stack of
          end state
        </p>
        {isloading ? (
          <div className={classes.loadingContainer}>
            <Spinner animation="border" />
          </div>
        ) : null}
        {apiLoading ? (
          <div className={classes.loadingContainer}>
            <Spinner animation="border" />
          </div>
        ) : null}
        {/* style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "flex-start"}} */}
        <Card.Body>
          <Row>
            <Card.Text className="dropdownHeader">
              Select destination system
            </Card.Text>
            {/* <Button size="sm">Some Button</Button> */}
            <Select
              defaultValue="Select the Destination System"
              className="destinationDropdownSelection"
              onChange={handleChange}
            >
              <Option value="onPremiseSql">Azure SQL Server</Option>
              <Option disabled value="blobCsv">
                Azure Blob - CSV
              </Option>
              <Option disabled value="blobJson">
                Azure Blob - JSON
              </Option>
              <Option disabled value="blobParquet">
                Azure Blob - Parquet
              </Option>
              <Option disabled value="onPremiseTeradat">
                On-premise Teradata
              </Option>
              <Option disabled value="onPremiseHDFS">
                On-premise HDFS
              </Option>
            </Select>
            <button className="connectButton" onClick={(e) => invokeFunction()}>
              Connect
            </button>
          </Row>
          {/* <Row>
            <Card.Text className="dropdownHeader">
              Select The Load Type
            </Card.Text>
            <Cascader
              className="destinationDropdownSelection"
              options={options}
              onChange={onChangeLoad}
              placeholder="Please select"
            />
            <button
              className="connectButton"
              disabled={!mileStones.connected}
              onClick={() => invokeLoadFunction()}
            >
              Load
            </button>
          </Row> */}
          <Row>
            <Card.Text className="loadTypeHeader">
              Select The Load Type
            </Card.Text>
            <p className="infoMessage">
              Select the Incremental load tables with corresponding incremental
              columns. and unselected tables will be considered as full load
            </p>
          </Row>
          <Tabs defaultActiveKey="full/Inceremental" onChange={callback}>
            <TabPane tab="Full/Incremental Load" key="full/Inceremental">
              <Collapse>
                {tableData.map((obj, index) => {
                  return (
                    <Panel header={obj.head} key={index}>
                      <IngestionTabelData
                        index={index}
                        dataSource={obj.data}
                        headValue={obj.head}
                        emitRowChanges={(
                          selectedRows,
                          selectedRow,
                          headValue
                        ) =>
                          getSelectedRows(selectedRows, selectedRow, headValue)
                        }
                        dropdownChangeValue={(abc) =>
                          updateTheActivityValue(abc)
                        }
                        emitColumnChanges={(value) =>
                          getSelectedColumnNames(value)
                        }
                        // emitDropdownChanges={(columnArray) =>
                        //   getSelectedDropdownValues(columnArray)
                        // }
                      />
                    </Panel>
                  );
                })}
              </Collapse>
            </TabPane>
            <TabPane tab="File Load" key="fileLoad">
              <Radio.Group onChange={setRadioButtons} defaultValue={"csv"}>
                <Radio style={radioStyle} value="csv" name="fileLoad">
                  CSV
                </Radio>
                <Radio style={radioStyle} value="json" name="fileLoad">
                  Json
                </Radio>
                <Radio style={radioStyle} value="parquet" name="fileLoad">
                  parquet
                </Radio>
              </Radio.Group>
            </TabPane>
          </Tabs>
          <div>
            <button
              className="loadButton"
              disabled={!mileStones.connected}
              onClick={() => invokeLoadFunction()}
            >
              Load
            </button>
          </div>

          <div className="generateexecutionDiv">
            <button
              className="genrateReportButton"
              onClick={(e) => genrateExcel()}
              disabled={!mileStones.connected}
              icon={<DownloadOutlined />}
            >
              <DownloadOutlined />
              Lineage report
            </button>
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
        {destinationConnecting ? (
          <div className="the-source-is-connec">
            <p>The Destination is connecting</p>
          </div>
        ) : null}
        {sourceConnected ? (
          <div className="the-source-is-connec">
            <p>The Destination is connected</p>
          </div>
        ) : null}
        {loadConnecting ? (
          <div className="the-source-is-connec">
            <p>Loading is processing</p>
          </div>
        ) : null}
        {loadConnected ? (
          <div className="the-source-is-connec">
            <p>Loading completed</p>
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

export default MileStrongDescriptionFour;
