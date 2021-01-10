import { ModalProps } from "@sebgroup/react-components/dist/Modal/Modal";
import { Column } from "@sebgroup/react-components/dist/Table/Table";
import {DashboardPropertiesOptions} from "../components/dashboardItem/modals/AddDashboardItem";

export const RECEIVE_AUTH_USER = "RECEIVE_AUTH_USER";
export type RECEIVE_AUTH_USER = typeof RECEIVE_AUTH_USER;
export const LOG_AUTH_ERROR = "LOG_AUTH_ERROR";
export type LOG_AUTH_ERROR = typeof LOG_AUTH_ERROR;
export const REQUEST_AUTH_USER = "REQUEST_AUTH_USER";
export type REQUEST_AUTH_USER = typeof REQUEST_AUTH_USER;
export const SIGNOUT_USER = "SIGNOUT_USER";
export type SIGNOUT_USER = typeof SIGNOUT_USER;


export const TOGGLE_NOTIFICATION = "TOGGLE_NOTIFICATION";
export type TOGGLE_NOTIFICATION = typeof TOGGLE_NOTIFICATION;

export const RECEIVE_GROUPS = "RECEIVE_GROUPS";
export const LOG_GROUP_ERROR = "LOG_GROUP_ERROR";


export const SENSORSTYPESCOLUMN: Array<Column> = [{
    label: "id",
    accessor: "id",
    isHidden: true
},
{
    label: "deviceId",
    accessor: "deviceId",
    isHidden: true
}, {
    label: "Type",
    accessor: "dataType",
    isHidden: true
}, {
    label: "Type",
    accessor: "sensorDataType"
}, {
    label: "Name",
    accessor: "name",
}];

export const ACTUATORCOLUMNS: Array<Column> = [
    {
        label: "id",
        accessor: "id",
        isHidden: true
    },
    {
        label: "deviceId",
        accessor: "deviceId",
        isHidden: true
    },
    {
        label: "accountId",
        accessor: "accountId",
        isHidden: true
    },
    {
        label: "Name",
        accessor: "name",
    },
    {
        label: "Type",
        accessor: "type"
    },
    {
        label: "ON",
        accessor: "ON"
    },
    {
        label: "OFF",
        accessor: "OFF"
    },
    {
        label: "Value",
        accessor: "value"
    },
    {
        label: "Message",
        accessor: "message"
    }
];

export const ACTUATORS = [{
    label: "Digital",
    value: 0,
}, {
    label: "Analog",
    value: 1
}, {
    label: "Message",
    value: 2
}];

export const PROPERTIESCOLUMNS: Array<Column> = [
    {
        label: "id",
        accessor: "id",
        isHidden: true
    },
    {
        label: "Property name",
        accessor: "propertyName",
        isHidden: true
    },
    {
        label: "Property",
        accessor: "propertyLabel",
    },
    {
        label: "Custom label",
        accessor: "otherPropertyLabel",
        isHidden: true
    },
    {
        label: "Value",
        accessor: "propertyValue"
    }
];

export const DASHBOARDITEMTYPES = [
    {
        label: "Tank",
        value: 0,
    },
    {
        label: "Gauge",
        value: 1,
    },
    {
        label: "Bar graph",
        value: 2,
    },
    {
        label: "Line graph",
        value: 3,
    },
    {
        label: "other",
        value: 4,
    }
]

export const DASHBOARDPROPERTIES: Array<DashboardPropertiesOptions> = [
    {
        type: 0,
        properties: [

            {

                label: "Capacity",
                value: "capacity",
            },
            {
                label: "Current Value",
                value: "value",
            },
            {
                label: "Refresh rate",
                value: "refreshRate",
            }
        ]
    },
    {
        type: 1,
        properties: [
            {
                label: "Minimum value",
                value: 'minimumValue',
            },
            {
                label: "Maximum value",
                value: 'maximumValue',
            }
        ]
    },
    {
        type: 2,
        properties: [
            {
                label: "X-axis label",
                value: "x-axis",
            },
            {
                label: "Y-axis label",
                value: "y-axis",
            },
            {
                label: "data",
                value: "data",
            },
        ]
    },
    {
        type: 3,
        properties: [
            {
                label: "X-axis label",
                value: "x-axis",
            },
            {
                label: "Y-axis label",
                value: "y-axis",
            },
            {
                label: "data",
                value: "data",
            },
        ]
    },
    {
        type: 4,
        properties: [
            {
                label: "Other",
                value: "other",
            }
        ]
    }
];

export const SENSORSTYPES = [{
    label: "decimal",
    value: 0
},
{
    label: "String",
    value: 1
}, {
    label: "int",
    value: 2
}, {
    label: "double",
    value: 3
}];

export const DEVICETYPES = [{
    label: "Temperature Sensor",
    value: 0
},
{
    label: "Humidity Sensor",
    value: 1
}, {
    label: "Pressure Sensor",
    value: 2
}, {
    label: "Liquid Level",
    value: 3
}, {
    label: "Smoke Sensor",
    value: 4
}, {
    label: "Water Sensor",
    value: 5
}, {
    label: "Gas Sensor",
    value: 6
}, {
    label: "Chemical Sensor",
    value: 7
}, {
    label: "Motion Detection Sensor",
    value: 8
}, {
    label: "Accelerometer Sensor",
    value: 9
}, {
    label: "Proximity Sensor",
    value: 10
}, {
    label: "Gyroscope Sensor",
    value: 11
}, {
    label: "Beacon Light",
    value: 12
}, {
    label: "Image Sensor",
    value: 13
}, {
    label: "Level Sensor",
    value: 14
}, {
    label: "I R Sensor",
    value: 15
}];


export const initialState: ModalProps = {
    toggle: false,
    fullscreen: false,
    position: null,
    centered: true,
    size: null,
    disableBackdropDismiss: true,
    onDismiss: null
};