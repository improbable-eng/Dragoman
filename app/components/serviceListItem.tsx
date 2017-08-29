import * as React from 'react';
import * as ReactMD from 'react-md';

import { DragomanService} from '../reducers/listServices';

export interface IServiceListProps {
    dragomanService: DragomanService;
    onMethodClick: (serviceName: string, methodName: string) => void;
}

function ServiceListItem({ dragomanService, onMethodClick }: IServiceListProps) {
    const methodList: JSX.Element[] = Array.from(dragomanService.methodMap, ([key, val]) => {
        return (
        <ReactMD.ListItem
            onClick={() => onMethodClick(dragomanService.name, key)}
            key={key}
            primaryText={key}
        />);
    });

    return (
        <ReactMD.ListItem
            primaryText={dragomanService.name}
            active={true}
            nestedItems={methodList}
        />
    );
}

export default ServiceListItem;
