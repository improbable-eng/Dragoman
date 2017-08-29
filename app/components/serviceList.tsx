import * as React from 'react';

import ServiceListItem from './serviceListItem';
import { DragomanService } from '../reducers/serviceList';

export type ServiceListComponentProps = ServiceListComponentMethods & ServiceListComponentState;

export interface ServiceListComponentMethods {
    handleMethodClick: (serviceName: string, methodName: string) => void;
}

export interface ServiceListComponentState {
    serviceMap: Map<string, DragomanService>;
}

function serviceList({ serviceMap, handleMethodClick}: ServiceListComponentProps) {
    return (
        <div className='md-list--drawer'>
            {
                Array.from(serviceMap, ([key, val]) => {
                    return (
                        <ServiceListItem
                            onMethodClick={handleMethodClick}
                            key={key}
                            dragomanService={val}
                        />);
                })
            }
        </div>
    );
}

export default serviceList;
