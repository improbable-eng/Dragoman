import * as React from "react";
import * as ReactMD from "react-md";

import SideBar from "../components/sideBar";
import RequestBuilder from "../components/requestBuilder";
import ResponseViewer from "../components/responseViewer";

import {
  Service, Method, PolyglotSettings,
  ListServicesOptions, SettingsUIState, AppUIState, ListServicesRequest,
  PolyglotResponse, CallServiceRequest, CallServiceOptions, ValidatePathsRequest,
  ValidatePathsResponse, PolyglotLog
} from "../types/index";

const ipcConstants = require("../constants/ipcConstants"); // tslint:disable-line

import { remote, ipcRenderer } from "electron";

// TODO: Add option to get information about service, eg whether it is streaming or unary, display in UI
const checkConsoleErrorMessage = "Check console for full log (Console can be reached from View" +
  " -> Toggle Developer Tools -> Console)";

// TODO: Decide which of these should be optional
class RootState {
  public serviceMap: Map<string, Service> = new Map();
  public polyglotSettings: PolyglotSettings = new PolyglotSettings();
  public listServicesOptions: ListServicesOptions = new ListServicesOptions();
  public callServiceOptions: CallServiceOptions = new CallServiceOptions();
  public response: string = "";
  public settingsUIState: SettingsUIState = new SettingsUIState();
  public appUIState: AppUIState = new AppUIState();
}

export class Root extends React.Component<{}, RootState> {
  constructor() {
    super();
    this.state = new RootState();
    this.registerIpcListeners();
  }

  public handlePathBlur = (stateId: string) => {
    console.log("Handling path blur from ", stateId);
    const paths = this.state.polyglotSettings[stateId];
    console.log(paths);
    console.assert((typeof(paths) === "string" || paths.constructor === Array)); // tslint:disable-line

    let pathArray: string[];

    if (paths.constructor === Array) {
      pathArray = paths as string[];
      if (pathArray.length === 1 && pathArray[0] === "") { // We don't want to validate an empty text field
        this.setState({settingsUIState: Object.assign({}, this.state.settingsUIState,
          {[stateId + "Errors"]: []})});
        return;
      }
    } else {
      if (paths === "") {
        this.setState({settingsUIState: Object.assign({}, this.state.settingsUIState,
          {[stateId + "Error"]: false})});
        return;
      }
      pathArray = [paths as string];
    }

    this.validateSystemPathRequest({id: stateId, paths: pathArray});
  }

  public validateSystemPathRequest = (validatePathsRequest: ValidatePathsRequest) => {
    console.log("Validating paths ", validatePathsRequest.paths, " from: ", validatePathsRequest.id);
    ipcRenderer.send(ipcConstants.VALIDATE_PATHS_REQUEST, validatePathsRequest);
  }

  // TODO: Implement this validation response for the paths
  public validateSystemPathResponse = (event: Event, res: ValidatePathsResponse) => {
    console.log("Received validate paths response: ", res);
    const state = this.state.polyglotSettings[res.id];
    console.assert(res.validPaths instanceof Array);
    if (typeof(state) === "string") {
      console.assert(res.validPaths.length >= 1);
      this.setState({settingsUIState: Object.assign({}, this.state.settingsUIState,
        { [res.id + "Error"]: !res.validPaths[0]})});
    } else if (state.constructor === Array) {
      this.setState({settingsUIState: Object.assign({}, this.state.settingsUIState,
        { [res.id + "Errors"]: res.validPaths})});
    } else {
      console.log("SHOULD NOT REACH THIS");
    }
  }

  public listServices = () => {
    this.setState({callServiceOptions: new CallServiceOptions(), response: "", serviceMap: new Map()});

    const listServicesRequest: ListServicesRequest = {
      polyglotSettings: this.state.polyglotSettings,
      listServicesOptions: this.state.listServicesOptions
    };

    console.log("Sending request to list services with options: ", listServicesRequest);
    ipcRenderer.send(ipcConstants.LIST_SERVICES_REQUEST, listServicesRequest);
  }

  public listServicesResponse = (event: Event, res: PolyglotResponse) => {
    console.log("Received list service response: ", res);

    if (!res.error) {
      try {
        const parsedResponse = JSON.parse(res.response as string);
        console.log("List service response parsed to: ", parsedResponse);

        const mappedServices: Map<string, Service> = new Map();

        for (const service of parsedResponse) {
          const parsedService = new Service({name: service.name, path: service.path});
          mappedServices.set(service.name, parsedService);

          for (const method of service.methods) {
            const methodName = method.name as string;
            parsedService.methodMap.set(methodName, method);
          }
        }

        this.setState({serviceMap: mappedServices});
      } catch (e) {
        this.openErrorDialog("Error parsing list-services response:", checkConsoleErrorMessage);
        console.error(`Error ${e}\n${res.response}`);
      }
    } else {
      this.openErrorDialog("Error listing services: ", checkConsoleErrorMessage);
      console.error(`Error ${res.error}\n${res.response}`);
    }
  }

  public showDirectoryDialog = (id: string, macMessage: string = "", multiSelection: boolean = false) => {
    const customProperties = ["openDirectory", "openFile", "showHiddenFiles"];

    if (multiSelection) {
      customProperties.push("multiSelections");
    }

    const pathList = remote.dialog.showOpenDialog({
      properties: customProperties,
      message: macMessage,
    } as Electron.OpenDialogOptions);
    console.log("Paths ", pathList, " selected using path finder dialog");

    if (multiSelection) {
      this.setState({polyglotSettings: Object.assign({}, this.state.polyglotSettings, {[id]: pathList})});
    } else {
      if (pathList.length >= 1) {
        const path = pathList[0];
        this.setState({ polyglotSettings:
          Object.assign({}, this.state.polyglotSettings, {[id]: path})});
      }
    }
  }

  public callService = () => {
    const jsonInput = this.state.callServiceOptions.jsonBody;

    // Remove the annotations [<optioal> <repeated>] from the request.
    // Note (Edge Case): If the actual JSON body contains these strings they will be removed.
    const redactedJsonInput = jsonInput.replace(/\[<(optional|required)> <(single|repeated)>\]/g, "");

    // Testing whether it is valid JSON. This will not work when constructing streaming responses
    // TODO: Change this to deal with streaming requests
    try {
      JSON.parse(redactedJsonInput);
    } catch (e) {
      this.setState({appUIState: Object.assign({}, this.state.appUIState, {callRequestInProgress: false})});
      this.openJsonParseErrorDialog();
    }

    const callServiceRequest = new CallServiceRequest({
      polyglotSettings: this.state.polyglotSettings,
      callServiceOptions: new CallServiceOptions({
        jsonBody: redactedJsonInput,
        fullMethod: this.state.callServiceOptions.fullMethod,
      })});

    console.log("Calling service with request", callServiceRequest);
    ipcRenderer.send(ipcConstants.CALL_SERVICE_REQUEST, callServiceRequest);
  }

  public callServiceResponse = (event: Event, res: PolyglotResponse) => {
    this.setState({appUIState: Object.assign({}, this.state.appUIState, {callRequestInProgress: false})});

    console.log(`Received call service response \n${res}`);

    if (!res.error) {
       // The response can be an array encoded in utf-8
      if (typeof res.response  !== "string") {
        res.response = new TextDecoder("utf-8").decode(res.response as ArrayBuffer).trim();
      }

      this.setState({response: res.response});
    } else {
      this.openErrorDialog("Error calling service: ", checkConsoleErrorMessage);
      console.error(`Error ${res.error} \n${res.response}`);
    }
  }

  // TODO: This is not working properly, fix
  public openJsonParseErrorDialog = () => {
    this.openErrorDialog("Error parsing request", "Ensure that the request is valid JSON");
  }

  public closeErrorDialog = () => {
    this.setState({appUIState: Object.assign({}, this.state.appUIState, { errorDialogVisible: false})});
  }

  // TODO: This is not working properly, fix
  public openErrorDialog = (title: string, explanation: string) => {
    this.setState({
      appUIState: Object.assign({}, this.state.appUIState,
        { errorDialogVisible: false, errorDialogTitle: title,
          errorDialogExplanation: explanation})
    });
  }

  public handleRequestChange = (newValue: string) => {
    this.setState({callServiceOptions: Object.assign({}, this.state.callServiceOptions, {jsonBody: newValue})});
  }

  public handleRunClick = () => {
    // Up until this point the endpoint did not need to be filled in.
    if (this.state.polyglotSettings.endpoint === "") {
      this.setState({
        settingsUIState: Object.assign({}, this.state.settingsUIState, {
          settingsOpen: true, endpointError: true, endpointRequired: true})
      });
    } else {
      this.setState({
        settingsUIState: Object.assign({}, this.state.settingsUIState, { endpointRequired: true }),
        appUIState: Object.assign({}, this.state.appUIState, { callRequestInProgress: true })
      });

      this.callService();
    }
  }

  public handleCancelClick = () => {
    console.warn("Cancelling request");
    ipcRenderer.send(ipcConstants.CANCEL_REQUEST);
  }

  public cancelRequestResponse = (success: boolean) => {
    this.setState({appUIState: Object.assign({}, this.state.appUIState, {callRequestInProgress: !success})});
  }

  public handleSettingsClick = () => {
    const newSettingsUIState: SettingsUIState = Object.assign({}, this.state.settingsUIState,
      { settingsOpen: !this.state.settingsUIState.settingsOpen });
    this.setState({settingsUIState: newSettingsUIState});
  }

  // Should we check that this is a valid path? This would have to deal
  // with the various different platforms. Can delegate to main process and use standard node
  // TODO: Implement path validation
  public handleTextFieldInputChange = (stateId: string, newVal: string | number) => {
    let processedNewVal: any;
    console.log("Handling text field change with new value: ", newVal, " from ", stateId);
    switch (stateId) {
      case "endpoint":
        this.handleEndpointChange(newVal as string);
        processedNewVal = newVal;
        break;
      case "addProtocIncludes":
        processedNewVal = (newVal as string).split(",");
        console.log("processedNewVal ", processedNewVal);
        break;
      default:
        processedNewVal = newVal;
    }
    this.setState({ polyglotSettings: Object.assign({}, this.state.polyglotSettings, { [stateId]: processedNewVal }) });
  }

  public handleListServicesClick = () => {
    this.listServices();
  }

  // TODO: Change this pattern. We want to validate all text inputs not just the endpoint
  public handleEndpointChange = (newEndpoint: string) => {
    console.log("Handling endpoint change with newEndpoint ", newEndpoint);
    const endpointValid = /[^\:]+:[0-9]+/.test(newEndpoint);
    this.setState({
      settingsUIState: Object.assign({}, this.state.settingsUIState,
        {endpointError: !endpointValid})
    });
  }

  public handleMethodClick = (serviceName: string, methodName: string) => {
    try {
      const clickedService = this.state.serviceMap.get(serviceName) as Service;
      const clickedMethod = clickedService.methodMap.get(methodName) as Method;

      console.log("Method clicked ", clickedMethod);

      // Initially pretty print the templates to make it easy for users to vew the templates.
      // Store and display as simple strings to make subsequent editing easier.
      const prettyPrintedRequestTemplate = JSON.stringify(clickedMethod.request, null, 2);
      const prettyPrintedResponseTemplate = JSON.stringify(clickedMethod.response, null, 2);

      this.setState({
        callServiceOptions: Object.assign({},
          this.state.callServiceOptions,
          {fullMethod: serviceName + "/" + methodName, jsonBody: prettyPrintedRequestTemplate}),
        response: prettyPrintedResponseTemplate,
        appUIState: Object.assign({}, this.state.appUIState,
          {clientStreaming: clickedMethod.clientStreaming, serverStreaming: clickedMethod.serverStreaming})
      });
    } catch (e) {
      // TODO: Present error dialog?
      console.error(`Error when method was clicked ${e}`);
    }
  }

  public render() {
    return (
      <div>
        <ReactMD.Toolbar
          title="Dragoman"
          className="md-toolbar--fixed"
          colored={true}
        />
        <div>
          <SideBar
            serviceMap={this.state.serviceMap}
            polyglotSettings={this.state.polyglotSettings}
            settingsUIState={this.state.settingsUIState}
            handleMethodClick={this.handleMethodClick}
            handleSettingsClick={this.handleSettingsClick}
            handleListServicesClick={this.handleListServicesClick}
            handleTextFieldInputChange={this.handleTextFieldInputChange}
            handleEndpointChange={this.handleEndpointChange}
            handlePathDoubleClick={this.showDirectoryDialog}
            handlePathBlur={this.handlePathBlur}
          />
          <div
            style={{ display: "flex" }}
            className={
              "md-navigation-drawer-content md-navigation-drawer-content--prominent-offset" +
              "md-transition--decceleration md-drawer-relative md-toolbar-relative"
            }
          >
            <RequestBuilder
              callServiceOptions={this.state.callServiceOptions}
              appUIState={this.state.appUIState}
              handleRunClick={this.handleRunClick}
              handleRequestChange={this.handleRequestChange}
              handleCancelClick={this.handleCancelClick}
            />
            <ResponseViewer
              response={this.state.response}
              serviceMethodIdentifier={this.state.callServiceOptions.fullMethod}
              serverStreaming={this.state.appUIState.serverStreaming}
            />
          </div>
        </div>
        <ReactMD.Dialog
          id="errorDialog"
          // visible and modal are not defined by default in the current alpha version of react-md, if there is
          // an error paste visible?: boolean; modal?: boolean; into DialogProps in the Dialog.d.ts file
          // this should be fixed in future versions of react-md
          visible={this.state.appUIState.errorDialogVisible}
          modal={true}
          title={this.state.appUIState.errorDialogTitle}
          actions={
            [{
              onClick: this.closeErrorDialog,
              primary: true,
              label: "Ok",
            }]
          }
          children={this.state.appUIState.errorDialogExplanation}
        />
      </div>);
  }

  // Adding event listeners to allow callback from the main process
  private registerIpcListeners(): void {
    ipcRenderer.on(ipcConstants.LIST_SERVICES_RESPONSE, this.listServicesResponse);
    ipcRenderer.on(ipcConstants.CALL_SERVICE_RESPONSE, this.callServiceResponse);
    ipcRenderer.on(ipcConstants.VALIDATE_PATHS_RESPONSE, this.validateSystemPathResponse);
    ipcRenderer.on(ipcConstants.POST_LOGS, this.processPolyglotLog);
    ipcRenderer.on(ipcConstants.CANCEL_REQUEST_RESPONSE, this.cancelRequestResponse);
  }

  private processPolyglotLog = (event: Event, polyglotLog: PolyglotLog) => {
    if (typeof polyglotLog.log  !== "string") {
      polyglotLog.log = new TextDecoder("utf-8").decode(polyglotLog.log as ArrayBuffer).trim();
    }
    if (polyglotLog.log !== "") {
      switch (polyglotLog.level) {
        case "warn":
          console.warn(polyglotLog.log);
          break;
        default:
          console.log(polyglotLog.log);
          break;
      }
    }
  }
}

export default Root;
