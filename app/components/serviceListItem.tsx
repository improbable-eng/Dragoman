import * as React from "react";
import * as ReactMD from "react-md";

import { IService } from "../types/index";

export interface IServiceListProps {
    service: IService;
    onMethodClick: (serviceName: string, methodName: string) => void;
}

function ServiceListItem({ service, onMethodClick }: IServiceListProps) {
    const list = service.methods.map((method) =>
        (<ReactMD.ListItem
            primaryText={method.name}
            key={method.name}
            onClick={() => onMethodClick(service.name, method.name)}
        />));
    return (
        <ReactMD.ListItem
            primaryText={service.name}
            active={true}
            nestedItems={list}
        />
    );
}

export default ServiceListItem;
