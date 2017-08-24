import * as React from 'react';
import * as ReactMD from 'react-md';

import { Service, Method } from '../types/index';

export interface IServiceListProps {
    service: Service;
    onMethodClick: (serviceName: string, methodName: string) => void;
}

function ServiceListItem({ service, onMethodClick }: IServiceListProps) {
    const methodList: JSX.Element[] = [];

    service.methodMap.forEach((method: Method, key: string) => {
        methodList.push(
        <ReactMD.ListItem
        primaryText={method.name}
        key={method.name}
        onClick={() => onMethodClick(service.name, method.name)}
    />);
    });
    return (
        <ReactMD.ListItem
            primaryText={service.name}
            active={true}
            nestedItems={methodList}
        />
    );
}

export default ServiceListItem;
