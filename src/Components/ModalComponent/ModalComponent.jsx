import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Form } from "antd";
const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        className="configInput"
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
const columnsHead = [
  {
    title: "Project_ID",
    dataIndex: "Project_ID",
    fixed: "left",
    width: 100,
  },
  {
    title: "Project_Name",
    dataIndex: "Project_Name",
    fixed: "left",
    width: 150,
  },
  {
    title: "Effort_in_Hour",
    dataIndex: "Effort_in_Hour",
    width: 100,
    fixed: "left",
    editable: true,
  },
  {
    title: "activity_id",
    dataIndex: "activity_id",
    width: 100,
  },
  {
    title: "activity_category",
    dataIndex: "activity_category",
    width: 100,
  },
  {
    title: "activity_type",
    dataIndex: "activity_type",
    width: 100,
  },
  {
    title: "activity",
    dataIndex: "activity",
    width: 100,
  },
  {
    title: "object_id",
    dataIndex: "object_id",
    width: 100,
  },
  {
    title: "object_type",
    dataIndex: "object_type",
    width: 100,
  },
  {
    title: "complexity",
    dataIndex: "complexity",
    width: 100,
  },
];

export const EditableTable = (props) => {
  console.log("props", props);
  const [dataSource, setDataSource] = useState([]);
  // const [count, setCount] = useState(4);
  useEffect(() => {
    console.log(props,"lllllllllll")
    setDataSource(props.tableValue);
  }, []);
  const handleSave = (row) => {
    console.log("rowwwwwwww",row)
    props.connectApi(row);
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
    console.log("item", item);
    console.log("newData", newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = columnsHead.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  return (
    <div>
      <Table
        pagination={false}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 1500, y: 300 }}
      />
    </div>
  );
};
