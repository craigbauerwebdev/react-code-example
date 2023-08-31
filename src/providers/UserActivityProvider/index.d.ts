import React, { FC } from 'react';
interface UserActivityState {
    isUserActive: boolean | null;
}
export declare const UserActivityContext: React.Context<UserActivityState | null>;
declare const UserActivityProvider: FC;
declare function useUserActivityState(): UserActivityState;
export { UserActivityProvider, useUserActivityState };
