import React, { Component } from "react";
import axios from 'axios';
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css";

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    
    const popupValue = this.props.popUpData;

     this.addRow = () => {
      this.ref.table.addRow({}, true);
    };

    this.onSubmitTable = () => {
      var updatedTableData = this.ref.table.getData();

      updatedTableData.forEach(function (element) {
        element.project_name = popupValue;
      });
      console.log("getData", updatedTableData);
      axios({
        method: 'post',
        url: 'https://flashai.azurewebsites.net/api/estimation/infra-inventory',
        data:{
          targetArray: updatedTableData
            }      
      })
        .then((response) => {
          console.log(response);  
        },
        error =>{
      console.log(error);
      }
      );
      
      
    };
    var columns = [
      {
        title: "Object Type",
        field: "Object_Type",
        width: 200,
        headerSort: false,
        sorter: "string",
        editor: "select",
        editorParams: {
          "Virtual Machine": "Virtual Machine",
          "Docker/Container": "Docker/Container",
          "Serverless Compute": "Serverless Compute",
          "Access Management": "Access Management",
          "Transformation Script": "Transformation Script",
          "Load Script": "Load Script",
          "Validation Script": "Validation Script",
        },
      },
      {
        title: "Object Count",
        field: "Object_Count",
        headerSort: false,
        sorter: "string",
        width: 200,
        editor: "input",
      },
      {
        title: "Activity Type",
        width: 200,
        field: "activity_category",
        headerSort: false,
        sorter: "string",
        editor: "select",
        editorParams: { Rehost: "Rehost", Refactor: "Refactor" },
      },
      {
        formatter: "buttonCross",
        width:100,
        title: "Delete",
        headerSort: false,
        align: "center",
        cellClick: function (e, cell) {
          cell.getRow().delete();
        },
      },
    ];
    var tabledata = [
      {
        Object_Count: "10",
        Object_Type: "Virtual Machine",
        activity_category: "Rehost",
      },
      {
        Object_Count: "20",
        Object_Type: "Docker/Container",
        activity_category: "Rehost",
      },
    ];

    return (
      
      <div>
        <ReactTabulator
          ref={(ref) => (this.ref = ref)}
          //   options={options}
          columns={columns}
          data={tabledata}
        />
        <button className="multiInputButton" onClick={this.addRow}>Add Row</button>
        <button className="multiInputButton" onClick={this.onSubmitTable}>Submit Data</button>
      </div>
    );
  }
}

export default FormInput;
