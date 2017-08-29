import * as React from 'react';

import ServiceListItem from './serviceListItem';
import { DragomanService } from '../reducers/listServices';

export interface ServiceListProps {
    serviceMap: Map<string, DragomanService>;
    handleMethodClick: (serviceName: string, methodName: string) => void;
}

function SideBar({ serviceMap, handleMethodClick}: ServiceListProps) {
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

export default SideBar;
