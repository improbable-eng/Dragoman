import { isActionOfType, Action } from '../actions/actions';
import * as ServiceMapActions from '../actions/serviceMap';
export type ServiceMap = Readonly<{
    serviceMap: Map<string, Service>;
}>;

export class Method {
    public name: string = '';
    public request: string = '';
    public response: string = '';
    public clientStreaming: string = 'false';
    public serverStreaming: string = 'false';
}

export class Service {
    public name: string = '';
    public path: string = '';
    public methodMap: Map<string, Method> = new Map();

    public constructor(init?: Partial<Service>) {
        Object.assign(this, init);
    }
}

const initialServiceMap: ServiceMap = {
    serviceMap: new Map<string, Service>(),
};

export default function uiSettings(state: ServiceMap = initialServiceMap, action: Action<any>): ServiceMap {

    if (isActionOfType(action, ServiceMapActions.importServices)) {
        const mappedServices: Map<string, Service> = new Map(action.payload.map((service) => [service.name, service] as [string, Service]));
        for (const service of action.payload) {
            const parsedService = new Service({ name: service.name, path: service.path });
            mappedServices.set(service.name, parsedService);

            for (const method of service.methods) {
                const methodName = method.name as string;
                parsedService.methodMap.set(methodName, method);
            }
        }

        return {
            ...state,
            ...action.payload,
        };
    }

    return state;
}
