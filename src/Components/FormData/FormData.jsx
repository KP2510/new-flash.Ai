import React, { useContext, useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import { Table, Input, Button, Popconfirm, Select, Form } from "antd";
const EditableContext = React.createContext();
const { Option } = Select;

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

class FormData extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        key:"objectType",
        title: "Object Type",
        dataIndex: "objectType",
        render: () => (
          <Select defaultValue="Virtual Machine" onChange={(value) => this.handleChange(value)}  style={{ width: 120 }}>
            <Option value="Virtual Machine">Virtual Machine</Option>
            <Option value="Docker/Container">Docker/Container</Option>
            <Option value="Serverless Compute">Serverless Compute</Option>
            <Option value="Access Management">Access Management</Option>
            <Option value="Transformation Script">Transformation Script</Option>
            <Option value="Load Script">Load Script</Option>
            <Option value="Validation Script">Validation Script</Option>
          </Select>
        ),
      },
      {
        key:"objectCount",
        title: "Object Count",
        dataIndex: "objectCount",
        editable: true,
      },
      { 
        key:"activityType",
        title: "Activity Type",
        dataIndex: "activityType",
        render: () => (
          <Select defaultValue="Rehost" onChange={(value) =>this.handleChange(value)}  style={{ width: 120 }}>
            <Option value="Build">Rehost</Option>Rehost
            <Option value="Design">Refactor</Option>
          </Select>
        ),
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [],
    };
  }

   handleChange(value) {
    console.log(`selected ${value}`);
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
        key: count,
        objectType:'',
        objectCount:2,
        activityType:''
      };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
    console.log("newdata",newData);
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
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
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Table
          pagination={false}
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default FormData;
