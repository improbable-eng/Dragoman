import * as React from 'react';
import * as ReactMD from 'react-md';

import ServiceListItem from './serviceListItem';
import { DragomanService } from '../reducers/serviceList';

export type ServiceListComponentProps = ServiceListComponentMethods & ServiceListComponentState;

export interface ServiceListComponentMethods {
    handleMethodClick: (serviceName: string, methodName: string) => void;
    handleListServicesClick: () => void;
}

export interface ServiceListComponentState {
    serviceMap: Map<string, DragomanService>;
}

function serviceList({ serviceMap, handleMethodClick, handleListServicesClick }: ServiceListComponentProps) {
    return (
        <div style={{height: '100%'}}>
            <ReactMD.Button
                key='button'
                secondary={true}
                flat={true}
                swapTheming={true}
                children='List Services'
                onClick={handleListServicesClick}
                style={{ width: '100%', height: 40, borderRadius: 0, margin: 0 }}
            />
            <ReactMD.List className='md-list--drawer'>
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
            </ReactMD.List>
        </div>
    );
}

export default serviceList;
