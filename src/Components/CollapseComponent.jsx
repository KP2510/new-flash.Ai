import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const CollapseComponent = () => {
    return ( <Collapse accordion>
      <Panel header="This is panel header 1" key="1">
      <p>sample text</p>
      </Panel>
      <Panel header="This is panel header 2" key="2">
      <p>sample text</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>sample text</p>
      </Panel>
    </Collapse>);
}
 
export default CollapseComponent ;
