export enum TimeRuleCadenceEnums {
    MINUTES,
    HOURS,
    DAYS,
    MONTHS,
    YEARS
}
export enum RuleTriggerTypes {
    dataReceived,
    schedule,
}

export enum RuleDataSouceTypeEnums {
    device,
    aggregateField
}
export enum TriggerDataSourceTypeEnums {
    device,
    sensor,
    attribute,
    actuator,
    recurring,
    onetime,
}

export enum RuleTypeEnums {
  time,
  string,
  number
}
