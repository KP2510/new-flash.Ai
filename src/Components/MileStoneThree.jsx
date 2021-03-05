import React, { useState, useEffect, Fragment } from "react";
import { Card, Row } from "react-bootstrap";

import {
  Table,
  Button,
  Modal,
  Tooltip,
  Collapse,
} from "antd";
import "./TopBar/TopBarStyle.css";
import axios from "axios";
import { TreeSelect } from "antd";
import { EditableTable } from "./ModalComponent/ModalComponent";
import TableDataComponent from "./Table/TableData";
import FolderTableDataComponent from "./FolderTableData/FolderTableData"
import classes from "./MileStoneDescComp.module.css";
import Spinner from "react-bootstrap/Spinner";
import { EditOutlined } from "@ant-design/icons";
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css";
import FormInput from "./FormTabulator/FormInput"



const { SHOW_PARENT } = TreeSelect;
const { Panel } = Collapse;

const MileStrongDescriptionThree = ({
  mileStones,
  onClickEvent,
  connectApi,
  sourceSystem,
  popUpData,
  onClickBackEvent
}) => {
  console.log("popUpData",popUpData)
  const [treeData, setTreeData] = useState([
    {
      title: "DB",
      value: "DB",
      key: "DB",
    },
    {
      title: "Folder",
      value: "Folder",
      key: "Folder",
    },
  ]);
  const [visible, setVisible] = useState(false);

  const [visibleInventory, setVisibleInventory] = useState(false);
  const [visibleEstimation, setVisibleEstimation] = useState(false);
  const [visibleSubmit, setVisibleSubmit] = useState(false);
  const [defaultValue, setDefaultValue] = useState(["DB", "Folder"]);
  const [dbData, setDbdata] = useState([]);
  const [folderData, setFolderData] = useState([]);

  const [objectFilteredData, setObjectFilteredData] = useState([]);

  const [selectedDB, setSelectedDB] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState([]);

  const [estimationObjectCount, setEstimationObjectCount] = useState([]);
  const [estimationTableHeader, setEstimationTableHeader] = useState([]);

  const [estimationDbCount, setEstimationDbCount] = useState([]);
  const [estimationDbtableHeader, setEstimationDbtableHeader] = useState([]);

  const [estimationData, setEstimationData] = useState([]);
  const [estimationSum, setEstimationSum] = useState([]);
  const [loading, setLoading] = useState(false);
  const [configData, setConfigData] = useState([]);

  const [submitData,setSubmitData] = useState([]);
  const [isloading, setIsloading]= useState([]);
  const [isloadingData, setIsloadingData]= useState([]);

  useEffect(() => {
    getData();
    getDataForChecklist();
  }, []);

  const tProps = {
    treeData,
    value: defaultValue,
    // onChange: {onChange()},
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };

  const dataSource = [];
  const getDataForChecklist = async () => {
    setIsloadingData(true);
    // const response = await axios.get(
    //   "https://next.json-generator.com/api/json/get/VyPaTOUDF"
    // );

    const response = await axios.post('https://flashai.azurewebsites.net/api/estimation/generate-estimate-report', {
      sourceType: sourceSystem
    });
    if (response.data.data && response.data.data.length > 0) {
    setIsloadingData(false);
    }

    console.log(response, "This is the resonse");

    const dbDataArray = response.data.data.filter((item) => item.Type === "DB");

    dbDataArray.forEach(function (element) {
      element.activity_type = "Rehost";
      element.isSelected = false;
    });

    const key = "Objecttype";
    const uniqueObjectType = [
      ...new Map(dbDataArray.map((item) => [item[key], item])).values(),
    ];

    const unique = (arr, props = []) => [
      ...new Map(
        arr.map((entry) => [props.map((k) => entry[k]).join("|"), entry])
      ).values(),
    ];
    const uniqueDbObjectType = unique(dbDataArray, [
      "databaseName",
      "Objecttype",
    ]);

    const folderDataArray = response.data.data.filter(
      (item) => item.Type === "Folder"
    );
    
    folderDataArray.forEach(function (element) {
      element.activity_type = "Rehost";
    });

    const uniqueFolder = (arr, props = []) => [
      ...new Map(
        arr.map((entry) => [props.map((k) => entry[k]).join("|"), entry])
      ).values(),
    ];
    const uniqueFolderDBObjectType = uniqueFolder(folderDataArray, [
      "databaseName",
      "Objecttype",
    ]);

    const updateTableArray = dbDataArray.map((element) => {
      return {
        key: element,
        Type: element.Type,
        databaseName: element.databaseName,
        Objecttype: element.Objecttype,
        ObjectName: element.ObjectName,
      };
    });

    const updateTableArrayOne = [];
    const selectedRowData = {};
    uniqueDbObjectType.forEach((obj) => {
      const value = {
        head: "DB - " + obj.databaseName + ", " + obj.Objecttype,
        data: dbDataArray.filter(
          ({ databaseName, Objecttype }) =>
            obj.databaseName === databaseName && obj.Objecttype === Objecttype
        ),
      };
      selectedRowData[value.head]=[];
      updateTableArrayOne.push(value);
      console.log(updateTableArrayOne, "updateTableArrayOne");
    });

    const updateFolderArrayOne = [];
    uniqueFolderDBObjectType.forEach((obj) => {
      const value = {
        head: obj.folder + ", " + obj.objecttype,
        data: folderDataArray.filter(
          ({ folder, objecttype }) =>
            obj.folder === folder && obj.objecttype === objecttype
        ),
      };
      updateFolderArrayOne.push(value);
    });

    const updateFunctionArray = folderDataArray.map((element) => {
      return {
        key: element,
        Type: element.Type,
        databaseName: element.databaseName,
        Objecttype: element.Objecttype,
        ObjectName: element.ObjectName,
      };
    });
   
    setSelected(selectedRowData);
    setDbdata(updateTableArrayOne);
    setObjectFilteredData(uniqueObjectType);
    console.log("updateFolderArrayOne", updateFolderArrayOne);
    setFolderData(updateFolderArrayOne);

    console.log("ppppp", dataSource);
    return dataSource;
  };

  const onChangeOfTprops = (value) => {
    console.log("onChange ", value);
    setDefaultValue(value);
  };

  const [selected, setSelected] = useState({});
 const [dataValue,setDataValue] = useState([]);
  


  const getSelectedRows = (selectedRows, selectedRow, item,headValue) => {
    console.log("abcdeeee", selectedRows);
    console.log("pppppppp", item);
    console.log("selectedrows", selectedRow);
    let changeData = selected
    changeData[headValue] =selectedRow;
    setSelected(changeData);
console.log("selectedValuue",selected)
console.log("pppppppppp",(Object.values(selected)).flat())
const dummyArray =(Object.values(selected)).flat()
setDataValue(dummyArray)
console.log("values",dataValue)
  };

  const updateTheActivityValue = (object)=>{
    // debugger
    // dataValue[]
    // setDataValue(dataValue)
  }

  const getData = async () => {
    let estimationColumnArray = [];
    let estimationDbcolumnArray = [];

    // axios.post('https://flashai.azurewebsites.net/api/estimation/getDbData', {
    //   sourceType: sourceSystem
    // }
    // //   .then((response) => {
    // //     console.log(response);
    // //     this.setState({isLoading : false, sourceConnecting:false, sourceConnected:true})

    // //   },
    // //   error =>{
    // // console.log(error);
    // // }
    // );
    console.log("sourceSystem123456",sourceSystem);
    setIsloading(true);
    const response = await axios.post('https://flashai.azurewebsites.net/api/estimation/getDbData', {
      sourceType: sourceSystem
    });
    if (response.data.data && response.data.data.length > 0) {
      setIsloading(false);
      let firstElement = response.data.data[0];

      for (let key in firstElement) {
        estimationColumnArray.push(key);
      }
    }
    // if (
    //   response.data.usp_SQLProfDBList &&
    //   response.data.usp_SQLProfDBList.length > 0
    // ) {
    //   let firstElement = response.data.usp_SQLProfDBList[0];

    //   for (let key in firstElement) {
    //     estimationDbcolumnArray.push(key);
    //   }
    // }
    setEstimationObjectCount(response.data.data);
    setEstimationTableHeader(estimationColumnArray);

    // setEstimationDbCount(response.data.usp_SQLProfDBList);
    // setEstimationDbtableHeader(estimationDbcolumnArray);
  };
  const renderHeader = () => {
    return estimationTableHeader.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };
  // const estimationRenderHeader = () => {
  //   return estimationDbtableHeader.map((key, index) => {
  //     return <th key={index}>{key.toUpperCase()}</th>;
  //   });
  // };

  const renderBody = () => {
    return (
      estimationObjectCount &&
      estimationObjectCount.map((element, index) => {
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

  // const estimationRenderBody = () => {
  //   return (
  //     estimationDbCount &&
  //     estimationDbCount.map((element, index) => {
  //       let col = Object.keys(element);
  //       return (
  //         <tr key={element.id}>
  //           {col.map((val, index) => {
  //             return <td key={index}>{element[col[index]]}</td>;
  //           })}
  //         </tr>
  //       );
  //     })
  //   );
  // };

  const sendTheData = (selectedRow) => {
    const selectedItems = [...selectedDB, ...selectedFolder];
    console.log("qqqqqqqqq", selectedItems);
    console.log("qpqpqpqpqpqpq",selectedRow)
    setVisibleSubmit(true);
  };

  const estimationSummaryData = async () => {
    setLoading(true);
    await axios
      .get("https://flashai.azurewebsites.net/api/estimation/final-estimate")
      // .get("https://flashai.azurewebsites.net/api/estimation/final-estimate")
      .then((res) => {
        const sumData = res.data.count;
        setLoading(false);
        setEstimationSum(sumData);
        setEstimationData(
          res.data.data.map((row) => ({
            Project_Id: row.project_id,
            Project_Name: row.project_name,
            Estimation_Date: row.estimation_dt,
            Estimation_Iteration: row.estimation_iteration,
            object_category: row.object_category,
            Activity: row.activity,
            Object_Type: row.object_type,
            Complexity: row.complexity,
            Quantity: row.quantity,
            Efforts_Hour: row.effort_In_Hour,
          }))
        );
      });
    connectApi(mileStones.id);
    setVisibleEstimation(true);
  };

  const columns = [
    {
      title: "Project Id",
      dataIndex: "Project_Id",
      key: "Project_Id",
    },
    {
      title: "Project Name",
      dataIndex: "Project_Name",
      key: "Project_Name",
    },
    {
      title: "Estimation Date",
      dataIndex: "Estimation_Date",
      key: "Estimation_Date",
    },
    {
      title: "Estimation Iteration",
      dataIndex: "Estimation_Iteration",
      key: "Estimation_Iteration",
    },
    {
      title: "Object Category",
      dataIndex: "object_category",
      key: "object_category",
    },
    {
      title: "Activity",
      dataIndex: "Activity",
      key: "Activity",
    },
    {
      title: "Object Type",
      dataIndex: "Object_Type",
      key: "Object_Type",
    },
    {
      title: "Complexity",
      dataIndex: "Complexity",
      key: "Complexity",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    {
      title: "Efforts In Hour",
      dataIndex: "Efforts_Hour",
      key: "Efforts_Hour",
    },
  ];

 

  const BodyWrapper = (props) => {
    return (
      <tbody {...props}>
        <React.Fragment>
          {props.children}
          <tr className="ant-table-row">
            <td />
            <td>
              Sum: {estimationData.reduce((sum, i) => sum + i.Efforts_Hour, 0)}
            </td>
            <td />
            <td />
          </tr>
        </React.Fragment>
      </tbody>
    );
  };
  const configButtonClicked = async () => {
    const response = await axios.get(
      
      "https://flashai.azurewebsites.net/api/estimation/get-effort-base-transaction"
    );
    const configArrayData = response.data.data;
    console.log(configArrayData, "configArrayData");

    const updateConfigArray = configArrayData.map((element, index) => {
      return {
        key: index,
        Project_ID: element.Project_ID,
        Project_Name: element.Project_Name,
        Effort_in_Hour: element.Effort_in_Hour,
        activity_id: element.activity_id,
        activity_category: element.activity_category,
        activity_type: element.activity_type,
        activity: element.activity,
        object_id: element.object_id,
        object_type: element.object_type,
        complexity: element.complexity,
      };
    });
    console.log(updateConfigArray);
    setConfigData(updateConfigArray);
    setVisible(true);
  };

  const sendTheConfigData = (row) => {
    console.log("brillllllllllio", row);
    console.log("brillllllllllio", typeof row);
    
    axios({
      method: "post",
      url: "https://flashai.azurewebsites.net/api/estimation/update-effort-base-table",
      data:row
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitColumns = [
    {
      title: "Database Name",
      dataIndex: "databaseName",
      key: "databaseName",
    },
    {
      title: "Object Type",
      dataIndex: "Objecttype",
      key: "Objecttype",
    },
    {
      title: "Object Name",
      dataIndex: "ObjectName",
      key: "ObjectName",
    },
    {
      title: "Migration Type",
      dataIndex: "activity_type",
      key: "activity_type",
    },
  ];

  const submitFolderColumns =  [
    {
      title: "Folder",
      dataIndex: "folder",
      key: "folder",
    },
    {
      title: "Object Type",
      dataIndex: "objecttype",
      key: "objecttype",
    },
    {
      title: "File Name",
      dataIndex: "filename",
      key: "filename",
    },
    {
      title: "Migration Type",
      dataIndex: "activity_type",
      key: "activity_type",
    },
  ];

  const viewSelectionData = (dataValue) =>{
    console.log("sourceSystem123456",sourceSystem);
    console.log("sampke",dataValue)
    if(sourceSystem==="onPremiseSql" || sourceSystem==="Azure-SQLDB"){
      console.log("db data",dataValue)
      return (<Table
        pagination={false}
        rowKey="Name"
        columns={submitColumns}
        dataSource={dataValue}
        scroll={{ y: 250 }}
      />)
    }
    else{
      console.log("folder data",dataValue)
      return (<Table
        pagination={false}
        rowKey="Name"
        columns={submitFolderColumns}
        dataSource={dataValue}
        scroll={{ y: 250 }}
      />)
    }
  }

 
  const submitSelectedValues = () =>{
    console.log("popUpData",popUpData)
    console.log("dataValuenewwwwwwwww",dataValue)
    
    dataValue.forEach(function (element) {
      element.project_name = popUpData;
    });

    axios({
      method: 'post',      
      url: 'https://flashai.azurewebsites.net/api/estimation/create-inventory',
      data:{
        dbInventoryArray: dataValue
          }      
    })
      .then((response) => {
        console.log(response);  
      },
      error =>{
    console.log(error);
    }
    );
    setVisibleSubmit(false)
  }

  return (
    <Fragment>
      <Card className="arrow_box3">
        <p className="infoMessage">
          Plan the migration based on the effort estimate of selected data load.
          Select from multiple types of migration, and available tech stack of
          end state
        </p>
        {loading ? (
          <div className={classes.loadingContainer}>
            <Spinner animation="border" />
          </div>
        ) : null}
        {isloading ? (
          <div className={classes.loadingContainer}>
            <Spinner animation="border" />
          </div>
        ) : null}
        
        {isloadingData ? (
          <div className={classes.loadingContainer}>
            <Spinner animation="border" />
          </div>
        ) : null}
        <h2 id="planningTitle">Quantitative profile</h2>
        {/* <h3 id="title">Count of database</h3>
        <table id="employee">
          <thead>
            <tr>{estimationRenderHeader()}</tr>
          </thead>
          <tbody>{estimationRenderBody()}</tbody>
        </table> */}
        <h3 id="title">Count of database</h3>
        <table id="employee">
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
        <div>
          <Button
            className="infraButton"
            onClick={() => setVisibleInventory(true)}
          >
            Target state infrastructure
            <EditOutlined />
          </Button>
          <Modal
            title="Infra Activity"
            centered
            visible={visibleInventory}
            // footer={null}
            onOk={() => setVisibleInventory(false)}
            onCancel={() => setVisibleInventory(false)}
            width={750}
          >
            {/* <FormData /> */}
            <FormInput 
            popUpData={popUpData}/>
          </Modal>
        </div>
        <Card.Text className="objectHeader">Select the Objects</Card.Text>
        <TreeSelect
          {...tProps}
          onChange={(e) => onChangeOfTprops(e)}
          className="dropdownSelection"
        />
        {/* <button className="estimationGoButton">Go</button> */}
        <Collapse>
          {/* {defaultValue.map((item, index) => {
            return (
              <Panel header={item} key={index}>
                <Collapse>
                  {objectFilteredData.map((item1, index) => {
                    return (
                      <Panel header={item1.ObjectType} key={index}>
                        <TableDataComponent
                          dataSource={
                            item1.ObjectType === "Tables" ? dbData : folderData
                          }
                          emitRowChanges={(selectedRows) =>
                            getSelectedRows(selectedRows, item)
                          }
                        />
                      </Panel>
                    );
                  })}
                </Collapse>
              </Panel>
            );
          })} */}
          {defaultValue.map((item, index) => {
            return (
              <Panel header={item} key={index}>
                {item === "DB" &&
                  dbData.map((obj, index) => {
                    return (
                      <Collapse>
                        <Panel header={obj.head} key={index}>
                          <TableDataComponent
                            index={index}
                            dataSource={obj.data}
                            headValue={obj.head}
                            emitRowChanges={(selectedRows,selectedRow,headValue) =>
                              getSelectedRows(selectedRows, selectedRow,item,headValue)
                            }
                            dropdownChangeValue = {(object)=>
                              updateTheActivityValue(object)
                            }
                          />
                        </Panel>
                      </Collapse>
                    );
                  })}
                {item === "Folder" &&
                  folderData.map((obj, index) => {
                    return (
                      <Collapse>
                        <Panel header={obj.head} key={index}>
                          <FolderTableDataComponent
                            index={index}
                            dataSource={obj.data}
                            emitRowChanges={(selectedRows, selectedRow) =>
                              getSelectedRows(selectedRows, selectedRow, item)
                            }
                          />
                        </Panel>
                      </Collapse>
                    );
                  })}
              </Panel>
            );
          })}
        </Collapse>

        {/* style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "flex-start"}} */}
        <div>
          <div
            className="configButton"
            type="primary"
            onClick={configButtonClicked}
          >
            <Tooltip title="Configuration" placement="right">
              <img
                className="configImg"
                src={
                  "https://img.icons8.com/bubbles/344/data-configuration.png"
                }
                alt=""
              />
            </Tooltip>
            ,
          </div>

          <Modal
            title="Configuration Table"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1000}
          >
            {configData != null && configData.length > 0 && (
              <EditableTable
                tableValue={configData}
                connectApi={sendTheConfigData}
              />
            )}
          </Modal>
        </div>
        <Card.Body style={{ display: "flex" }}>
          <Row>
            {/* <Button size="sm">Some Button</Button> */}
            <button
              className="estimationSubmitButton"
              onClick={sendTheData}
              // onClick={(e) => connectApi(mileStones.id, e)}
            >
              View selection
            </button>
            <Modal
              title="Submit the selected values"
              visible={visibleSubmit}
              // onOk={() => setVisibleSubmit(false)}
              onOk={submitSelectedValues}
              onCancel={() => setVisibleSubmit(false)}
              width={750}
            >
              { dataValue !== null && viewSelectionData(dataValue)}
              {console.log("dataValueType value",dataValue)}
             {/* { dataValue.map(obj=>obj.Type==='DB') ?(
              <Table
                pagination={false}
                rowKey="Name"
                columns={submitColumns}
                dataSource={dataValue}
                scroll={{ y: 250 }}
              />):
               {/* { dataValue.filter(obj=>obj.Type==='Folder') ? */}
              {/* (<Table
                pagination={false}
                rowKey="Name"
                columns={submitFolderColumns}
                dataSource={dataValue}
                scroll={{ y: 250 }}
              />)}  */}
            </Modal>
          </Row>
          <Row>
            <Button className="summaryButton" onClick={estimationSummaryData}>
              Estimation Summary
            </Button>
            <Modal
              title="Estimation Summary"
              centered
              visible={visibleEstimation}
              onOk={() => setVisibleEstimation(false)}
              onCancel={() => setVisibleEstimation(false)}
              width={1200}
              scroll={{ y: 240 }}
            >
              <div className="sumValueClass">Estimated Effort={estimationSum} Hr </div>
                 <Table
                  pagination={false}
                  rowKey="Name"
                  columns={columns}
                  dataSource={estimationData}
                  scroll={{ y: 250 }}
                />
            </Modal>
          </Row>
        </Card.Body>
      </Card>
      <div>
      {/* <div className="someThingclass">
      <hr className="backLine"></hr>
      <button
          className="backButton"
          onClick={(e) => onClickBackEvent(mileStones.id, e)}
        >
          Back
        </button>
        </div> */}
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

export default MileStrongDescriptionThree;
