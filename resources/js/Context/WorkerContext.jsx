import React, { createContext, useContext, useMemo } from 'react';
import useWorkerWithShifts from '@/hooks/useWorkerWithShifts';

const WorkerContext = createContext({
    actualWorker: null,
    actualStatus: null,
    shiftsList: [],
    resultsToShow: 0,
    totalWorked: 0,
    totalWorkedMonth: 0,
    handleStartEndShift: () => { },
    StatusElement: () => null,
    loadMore: () => { }
});

export const WorkerProvider = ({ children, workerWithShifts, routePrefix, statusChangeAvailable }) => {
    const workerState = useWorkerWithShifts({ workerWithShifts: workerWithShifts, routePrefix: routePrefix, statusChangeAvailable: statusChangeAvailable });
    const value = useMemo(() => workerState, [workerState]);

    return (
        <WorkerContext.Provider value={value}>
            {children}
        </WorkerContext.Provider>
    );
};

export const useWorker = () => useContext(WorkerContext);