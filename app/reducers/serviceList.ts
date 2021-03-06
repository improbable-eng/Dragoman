import { isActionOfType, Action } from '../actions/actions';
import * as ServiceListActions from '../actions/serviceList';


export class Method {
    public name: string = '';
    public request: object = {};
    public response: object = {};
    public clientStreaming: boolean = false;
    public serverStreaming: boolean = false;
}

abstract class Service {
    public name: string = '';
    public path: string = '';

    public constructor(init?: Partial<Service>) {
        Object.assign(this, init);
    }
}

// Polyglot exports a list of services, we want a map from service name to service
// for efficient look up
export class PolyglotService extends Service {
    public methods: Method[];

    public constructor(init?: Partial<PolyglotService>) {
        super();
        Object.assign(this, init);
    }
}

// Polyglot exports a list of methods, we want a map from method name to method
// for efficient look up
export class DragomanService extends Service {
    public methodMap: Map<string, Method> = new Map();

    public constructor(init?: Partial<DragomanService>) {
        super();
        Object.assign(this, init);
    }
}

export type ServiceListState = Readonly<{
    serviceFilter: string;
    methodFilter: string;
    serviceMap: Map<string, DragomanService>;
}>;

export const initialServiceListState: ServiceListState = {
    serviceFilter: '',
    methodFilter: '',
    serviceMap: new Map<string, DragomanService>(),
};

export default function serviceListReducer(state: ServiceListState = initialServiceListState, action: Action<any>): ServiceListState {

    if (isActionOfType(action, ServiceListActions.changeServiceFilter)) {
        return {
            ...state,
            serviceFilter: action.payload,
        };
    }

    if (isActionOfType(action, ServiceListActions.changeMethodFilter)) {
        return {
            ...state,
            methodFilter: action.payload,
        };
    }

    if (isActionOfType(action, ServiceListActions.importServices)) {
        return {
            ...state,
            serviceMap: new Map(action.payload.map((polyglotService: PolyglotService) => {
                const dragomanService = new DragomanService({name: polyglotService.name, path: polyglotService.path});
                dragomanService.methodMap = new Map(polyglotService.methods.map((method: Method) => [method.name, method] as [string, Method]));
                return [dragomanService.name, dragomanService] as [string, DragomanService];
            })),
        };
    }

    return state;
}
