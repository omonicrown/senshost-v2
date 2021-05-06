import React, { memo, FC, CSSProperties } from 'react';

import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';

const targetHandleStyle: CSSProperties = { background: '#555' };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, left: 10 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, right: 10 };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const CustomTriggerNode: FC<NodeProps> = ({ data }) => {
  return (
    <>
      <Handle type="source" position={Position.Left} id="a" style={sourceHandleStyleA} />
      <div>
        Custom Color Picker Node: <strong>{data.color}</strong>
      </div>
      <Handle type="source" position={Position.Right} id="b" style={sourceHandleStyleB} />
    </>
  );
};

export default memo(CustomTriggerNode);