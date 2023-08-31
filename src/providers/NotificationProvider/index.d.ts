import { Action, ActionType, NotificationType, Severity } from './state';
import React from 'react';
declare const NotificationProvider: React.FC;
declare const useNotificationState: () => any;
declare const useNotificationDispatch: () => any;
export { NotificationProvider, useNotificationState, useNotificationDispatch, Severity, NotificationType, ActionType, Action };
