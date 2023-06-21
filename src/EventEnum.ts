export enum EventType {
    EventType_Demo = "DEMO",
}

export interface IEventDataDemo {
    data1?: string;
    data2?: number;
}

export interface IEventModel {
    [EventType.EventType_Demo]: IEventDataDemo;
}
