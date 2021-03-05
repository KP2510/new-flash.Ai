import React,{useState} from 'react';
import {
    Select,
    Table,
    Input
  } from "antd";

  const { Option } = Select;

const IngestionTabelData = (props) => {
    // const getColumns = (column, index) => { return  {column : column.name}};
    const columns = [
        {
            key:"1",
          title: "Table",
          dataIndex: "table_name",
        },
        {
            key:"2",
          title: "Key Identifiers",
          dataIndex: "columnAndType",
          render: (each, object) => (
            <Select mode="multiple" placeholder="Please select" 
            onChange ={ (value) =>{
              console.log(value);
              const abc = {};
              // console.log("value",value)
              // const result = object.datatype.filter((_, i) => value.includes(object.column_name[i]));
              // // const result = value.map(val => object.datatype[object.column_name.indexOf(val)]); 
              // abc["datatype"] = result;

              
              abc["table_name"]=object["table_name"]
              abc["columnAndType"]= value;
              
              props.dropdownChangeValue(abc) 
              // console.log("abc",abc);
            }}
            style={{ width: 200 }}>
              {/* defaultValue={each[0]} */}
              {/* {
                each.map((value,idx)=>{
                return( <Option value={value}>{value}</Option>)
                })
              } */}
              {each.map((dd, i) => {
        return <Option key={JSON.stringify(dd)}>{dd.name}</Option>;
      })}
            </Select>
          ),
        },
        {
            key:"3",
          title: "Load Frequency",
          dataIndex: "select_type",
          key: "x",
          render: () => (
            <Select className="selectType" defaultValue="Hours" style={{ width: 120 }} disabled>
              <Option value="Hours">Hourly</Option>
              <Option value="Days">Daily</Option>
              <Option value="Weeks">Weekly</Option>
              <Option value="Weeks">Monthly</Option>
            </Select>
          ),
        },
        {
            key:"4",
          title: "Interval",
          dataIndex: "duration",
          key: "x",
          render: () => (
            <Input placeholder="Duration"  disabled />
          ),
        },
      ];

      const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    let onSelectChange = (selectedRowKeys,selectedRow) => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys,selectedRow);
        props.emitRowChanges(selectedRowKeys,selectedRow,props.headValue);
        console.log("selectedRow",selectedRow);
      };
    
      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };

      const [columnArrayValue, setColumnArrayValue] = useState([]);
      function handleChange(value,selectedRow) {
        console.log(value);
        props.emitColumnChanges(value);
        console.log("selectedlogrowwww",selectedRow)
      }

    return (<Table
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={props.dataSource.map((ele,index) => {ele.key = index; return ele})}
        scroll={{ y: 300 }}
      />  );
}
 
export default IngestionTabelData;



// tableList.forEach( listItem => {
//   if(listItem.column_name.includes(columnArray[0])){
// listItem.column_name = columnArray
// };
// })
