import * as React from 'react';
import { Button, List, TextField } from 'react-md';

import ServiceListItem from './serviceListItem';
import { DragomanService } from '../reducers/serviceList';

const styles = require('./serviceList.scss');

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

export default function serviceList({ serviceMap, serviceFilter, methodFilter,
    handleMethodClick, handleListServicesClick, handleMethodFilterChange, handleServiceFilterChange }: ServiceListComponentProps) {
    return (
        <div className={styles.container}>
            <Button
                key='button'
                secondary={true}
                flat={true}
                swapTheming={true}
                children='List Services'
                onClick={handleListServicesClick}
                className={styles.button}
            />
            <div className={styles['text-field']}>
                <TextField
                    id='Service Filter'
                    placeholder='Service Filter'
                    value={serviceFilter}
                    onChange={handleServiceFilterChange}
                />
                <TextField
                    id='Method Filter'
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
