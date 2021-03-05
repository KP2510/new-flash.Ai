import React, { useState } from "react";
import { Select, Table } from "antd";

const { Option } = Select;

const TableDataComponent = (props) => {
  const columns = [
    {
      key: "databaseName",
      title: "Database Name",
      dataIndex: "databaseName",
    },
    {
      key: "Objecttype",
      title: "Object Type",
      dataIndex: "Objecttype",
    },
    {
      key: "ObjectName",
      title: "Object Name",
      dataIndex: "ObjectName",
    },
    {
      key: "activity_type",
      title: "Activity Type",
      dataIndex: "activity_type",
      render: (name,object) => (
        <Select
          className="selectType"
          defaultValue="Rehost"
          // onChange={handleChange}
          onChange ={ (value) =>{
            object["activity_type"] = value;
            // props.dropdownChangeValue(object)
           }}
          style={{ width: 120 }}
        >
          <Option value="Rehost">Rehost</Option>Rehost
          <Option value="Refactor">Refactor</Option>
        </Select>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  function handleChange(value, index) {
    console.log(`selected ${value}`);
    console.log("index", index);
  }
  let onSelectChange = (selectedRowKeys, selectedRow) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
    props.emitRowChanges(selectedRowKeys, selectedRow, props.headValue);
    console.log("selectedRow", selectedRow);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      pagination={false}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={props.dataSource.map((ele, index) => {
        ele.key = index;
        return ele;
      })}
      scroll={{ y: 300 }}
    />
  );
};

export default TableDataComponent;
