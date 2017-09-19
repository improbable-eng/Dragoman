import * as _ from 'lodash';

// Action represents a Redux Action Object which is typically dispatched from a
// component, passes through the middleware before being reduced to update the store.
// The payload"s Type is specified as `T`.
//
//  const loginCompeteAction : new Action<UserData> = {
//    type: "LoginComplete",
//    payload: { firstName: "Dave" },
//    error: false,
//  }
export interface Action<T> {
  // type is a unique value used to differentiate between different Actions
  readonly type: string;
  // payload is the typed payload dispatched along with the action.
  readonly payload: T;
  // error is used to indicate if the action represents a failure condition, in this
  // case the payload will be an `Error` instance.
  readonly error?: boolean;
  // The action to dispatch after this action has been dispatched, used by the seqeuence middleware
  NEXT?: Action<any>;
}

// ActionCreator is a factory function which will return an instance of `Action<T>`
// when invoked.  It also provides the `type` value of the action it instantiate.
export interface ActionCreator<T> {
  readonly actionType: string;
  (payload: T): Action<T>;
}

// GenericActionCreator is the widened type of ActionCreator that only requires that the function returns an action.
// This should cannot be used to create actions directly as it does not type-check the payload arguments.
interface GenericActionCreator<T> {
  readonly actionType: string;
  (...payload: any[]): Action<T>;
}

// actionCreator is a factory function which returns an ActionCreator used to
// construct Action objects with a payload of type `T`.  This is the
// only way to construct typed ActionCreator instances.
//
// When defining an action that has no payload, use `emptyActionCreator("my_action")`.
export function actionCreator<T>(actionType: string): ActionCreator<T> {
  return _.assign(
    (payload: T): any => ({ type: actionType, payload, error: false }),
    { actionType },
  );
}

// EmptyActionCreator is a factory function which does not take a payload. It is an
// alternative to ActionCreator, which *does* take a payload.
interface EmptyActionCreator {
  readonly actionType: string;
  (): Action<void>;
}

// emptyActionCreator is a factory function which returns an EmptyActionCreator used to
// construct Action objects without a payload.
export function emptyActionCreator(actionType: string): EmptyActionCreator {
  return _.assign(
    (): any => ({ type: actionType, error: false }),
    { actionType },
  );
}

// errorActionCreator is a factory function which returns an ActionCreator used
// to construct Action objects that carry an Error payload.
export function errorActionCreator(actionType: string): ActionCreator<Error> {
  return _.assign(
    (payload: Error): any => ({ type: actionType, payload, error: true }),
    { actionType },
  );
}

// isActionOfType is a type guard used to narrow down the type of a given Action object
// within a conditional block.
//
//  // At this point we have no idea what the payload"s type is.
//  const someAction : Action<any> = { ... }
//
//  if (isActionOfType(someAction, fetchEventsSuccess)) {
//    // `someAction` is now upcast to `Action<FetchEventsResponse>`
//    someAction.payload.timeBars
//  }
//
export function isActionOfType<T>(action: Action<any>, creator: GenericActionCreator<T>): action is Action<T> {
  return action.type === creator.actionType;
}

// combine is a helper function used by reducers to create a new state object.  The
// newState object can only include properties present in the currentState object.
//
//  currentState =  { name: "Jonny", age: 34 };
//  const merged = combine(currentState, { age: 35 });
//
export function combine<T extends U, U>(currentState: T, newState: U): T {
  return _.assign({}, currentState, newState);
}

// StoreAccessor provides a generic typing for the redux store object; this should
// probably be replaced with something better as we add stricter typing the codebase.
export interface StoreAccessor {
  [key: string]: any;
}

// ActionHandler is the interface for functions which accept an Action (eg: `dispatch`,
// or `next`).
export interface ActionHandler {
  (action: Action<any>): Action<any>;
}
