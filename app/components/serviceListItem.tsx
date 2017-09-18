import * as React from 'react';
import * as ReactMD from 'react-md';

export interface IServiceListProps {
    serviceName: string;
    filteredMethodNames: string[];
    onMethodClick: (serviceName: string, methodName: string) => void;
}


function ServiceListItem({ serviceName, filteredMethodNames, onMethodClick }: IServiceListProps) {
    const methodList: JSX.Element[] = filteredMethodNames
        .map(methodName => {
            return (
            <ReactMD.ListItem
                onClick={() => onMethodClick(serviceName, methodName)}
                key={methodName}
                primaryText={methodName}
            />);
        });

    return (
        <ReactMD.ListItem
            primaryText={serviceName}
            active={true}
            nestedItems={methodList}
        />
    );
}

export default ServiceListItem;
