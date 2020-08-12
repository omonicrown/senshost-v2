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



export const SENSORSTYPESCOLUMN = [{
    label: "Type",
    accessor: "dataType",
}, {
    label: "Name",
    accessor: "name",
}];

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