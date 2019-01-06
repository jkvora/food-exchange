export enum SOCKET_EVENT {
    CONNECT,
    DISCONNECT,
}

export enum UPDATE_TYPE {
    ORDER_CANCELLED = 1,
    ORDER_DELIEVERD = 2,
    ORDER_NOT_DELIEVERED = 3,
    EXISTING_CUSTOMERS = 4,
    NEW_CUSTOMERS = 5
}

export class updateObj{
    dateTime:string
    updateType:UPDATE_TYPE
    value:number
}