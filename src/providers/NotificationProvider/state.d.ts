export declare enum Severity {
    ERROR = "error",
    SUCCESS = "success",
    INFO = "info",
    WARNING = "warning",
}
export interface NotificationType {
    id?: string;
    severity?: Severity;
    message?: string;
    autoClose?: boolean;
    autoCloseDelay?: number;
    replaceAll?: boolean;
}
export interface StateType {
    notifications: NotificationType[];
}
export declare enum ActionType {
    ADD = 0,
    REMOVE = 1,
    REMOVE_ALL = 2,
}
export interface Action {
    type: ActionType;
    payload?: any;
}
export declare const initialState: StateType;
export declare const reducer: (state: StateType, action: Action) => StateType;
