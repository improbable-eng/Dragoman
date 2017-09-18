import * as React from 'react';
import { Button, List, TextField } from 'react-md';

import ServiceListItem from './serviceListItem';
import { DragomanService } from '../reducers/serviceList';

export type ServiceListComponentProps = ServiceListComponentMethods & ServiceListComponentState;

export interface ServiceListComponentMethods {
    handleMethodClick: (serviceName: string, methodName: string) => void;
    handleListServicesClick: () => void;
    handleMethodFilterChange: (newVal: string) => void;
    handleServiceFilterChange: (newVal: string) => void;
}

export interface ServiceListComponentState {
    serviceMap: Map<string, DragomanService>;
    serviceFilter: string;
    methodFilter: string;
}

function serviceList({ serviceMap, serviceFilter, methodFilter,
    handleMethodClick, handleListServicesClick, handleMethodFilterChange, handleServiceFilterChange }: ServiceListComponentProps) {
    return (
        <div style={{ height: '100%' }}>
            <Button
                key='button'
                secondary={true}
                flat={true}
                swapTheming={true}
                children='List Services'
                onClick={handleListServicesClick}
                style={{ width: '100%', height: 40, borderRadius: 0, margin: 0 }}
            />
            <div style={{ padding: 10 }}>
                <TextField
                    placeholder='Service Filter'
                    value={serviceFilter}
                    onChange={handleServiceFilterChange}
                />
                <TextField
                    placeholder='Method Filter'
                    value={methodFilter}
                    onChange={handleMethodFilterChange}
                />
            </div>
            <List className='md-list--drawer'>
                {
                    Array.from(serviceMap.entries())
                        .filter(elem => {
                            // Check if service name includes serviceFilter, and has more than one method with name which includes methodFilter
                            return elem[0].toLowerCase().includes(serviceFilter.toLowerCase()) &&
                                Array.from(elem[1].methodMap.keys()).filter(methodName => methodName.toLowerCase().includes(methodFilter.toLowerCase())).length > 0;
                        })
                        .map(elem => {
                            return (
                                <ServiceListItem
                                    onMethodClick={handleMethodClick}
                                    key={elem[0]}
                                    serviceName={elem[0]}
                                    filteredMethodNames={Array.from(elem[1].methodMap.keys()).filter(methodName => methodName.toLowerCase().includes(methodFilter.toLowerCase()))}
                                />);
                        })
                }
            </List>
        </div>
    );
}

export default serviceList;
