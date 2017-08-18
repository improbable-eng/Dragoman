import * as React from "react";
import * as ReactMD from "react-md";

import SideBar from "../components/sideBar";
import RequestBuilder from "../components/requestBuilder";
import ResponseViewer from "../components/responseViewer";

import {
  IService, IMethod, PolyglotSettings,
  ListServicesOptions, SettingsUIState, AppUIState, ListServicesRequest,
  PolyglotResponse, CallServiceRequest, CallServiceOptions, ValidatePathsRequest,
  ValidatePathsResponse
} from "../types/index";

const ipcConstants = require("../constants/ipcConstants"); // tslint:disable-line

import { remote, ipcRenderer } from "electron";

// TODO: Add option to get information about service, eg whether it is streaming or unary, display in UI
const checkConsoleErrorMessage = "Check console for full log (Console can be reached from View" +
  " -> Toggle Developer Tools -> Console)";

// TODO: Decide which of these should be optional
class RootState {
  public services: IService[] = [];
  public polyglotSettings: PolyglotSettings = new PolyglotSettings();
  public listServicesOptions: ListServicesOptions = new ListServicesOptions();
  public callServiceOptions: CallServiceOptions = new CallServiceOptions();
  public request: string = "";
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

  public validateSystemPathRequest = (validatePathsRequest: ValidatePathsRequest) => {
    console.log("validating paths: ", validatePathsRequest.paths, ". from: ", validatePathsRequest.id);
    ipcRenderer.send(ipcConstants.VALIDATE_PATH_REQUEST, validatePathsRequest);
  }

  public validateSystemPathResponse = (event: Event, res: ValidatePathsResponse) => {
    console.log("received validate paths response: ", res);

  }

  public listServices = () => {
    this.setState({ request: "", response: "", services: [] });

    const listServicesRequest: ListServicesRequest = {
      polyglotSettings: this.state.polyglotSettings,
      listServicesOptions: this.state.listServicesOptions
    };

    ipcRenderer.send(ipcConstants.LIST_SERVICES_REQUEST, listServicesRequest);
  }

  public listServicesResponse = (event: Event, res: PolyglotResponse) => {
    console.log("received list service response: ", res);
    if (!res.error) {
      try {
        const parsedResponse = JSON.parse(res.response as string);
        console.log(parsedResponse);
        this.setState({ services: parsedResponse });
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
    console.log("showing dialog");
    console.log(this.state);
    const customProperties = ["openDirectory", "openFile", "showHiddenFiles"];

    if (multiSelection) {
      customProperties.push("multiSelections");
    }

    console.log(customProperties);

    const pathList = remote.dialog.showOpenDialog({
      properties: customProperties,
      message: macMessage,
    } as Electron.OpenDialogOptions);
    console.log("pathList: ", pathList);

    if (multiSelection) {
      this.setState({ polyglotSettings: Object.assign({}, this.state.polyglotSettings, { [id]: pathList })});
    } else {
      if (pathList.length >= 1) {
        const path = pathList[0];
        this.setState({ polyglotSettings:
          Object.assign({}, this.state.polyglotSettings, { [id]: path })});
      }
    }
  }

  public callService = () => {
    const jsonInput = this.state.request;

    // Remove the annotations eg. [<optioal> <repeated>] from the request.
    // Note (Edge Case): If the actual JSON body contains these strings they will be removed.
    const redactedJsonInput = jsonInput.replace(/\[<(optional|required)> <(single|repeated)>\]/g, "");

    try {
      JSON.parse(redactedJsonInput);
    } catch (e) {
      this.openJsonParseErrorDialog();
      this.setState({appUIState: Object.assign({}, this.state.appUIState, {callRequestInProgress: false})});
    }

    const cSOptions = new CallServiceOptions({
      jsonBody: redactedJsonInput,
      fullMethod: this.state.callServiceOptions.fullMethod,
    });

    const callServiceRequest = new CallServiceRequest({
      polyglotSettings: this.state.polyglotSettings,
      callServiceOptions: cSOptions
    });

    console.log("calling service with request \n", callServiceRequest);
    ipcRenderer.send(ipcConstants.CALL_SERVICE_REQUEST, callServiceRequest);
  }

  public callServiceResponse = (event: Event, res: PolyglotResponse) => {
    this.setState({ appUIState: Object.assign({}, this.state.appUIState, {callRequestInProgress: false})});

    console.log("received call service response \n", res);

    // The response can be an array encoded in utf-8
    if (typeof res.response  !== "string") {
      res.response = new TextDecoder("utf-8").decode(res.response as ArrayBuffer);
    }

    if (!res.error) {
      const trimmedResponse = res.response.trim();
      this.setState({response: trimmedResponse});
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

  public openErrorDialog = (title: string, explanation: string) => {
    this.setState({
      appUIState: Object.assign({}, this.state.appUIState,
        {
          errorDialogVisible: false, errorDialogTitle: title,
          errorDialogExplanation: explanation,
        })
    });
  }

  public handleRequestChange = (newValue: string) => {
    this.setState({request: newValue});
  }

  public handleRunClick = () => {
    // Up until this point the endpoint did not need to be filled in.
    if (this.state.polyglotSettings.endpoint === "") {
      this.setState({
        settingsUIState: Object.assign({}, this.state.settingsUIState, {
          settingsOpen: true,
          endpointError: true, endpointRequired: true
        })
      });
    } else {
      this.setState({
        settingsUIState: Object.assign({}, this.state.settingsUIState, { endpointRequired: true }),
        appUIState: Object.assign({}, this.state.appUIState, { callRequestInProgress: true })
      });

      this.callService();
    }
  }

  public handleSettingsClick = () => {
    const newSettingsUIState: SettingsUIState = Object.assign({}, this.state.settingsUIState,
      { settingsOpen: !this.state.settingsUIState.settingsOpen });
    this.setState({settingsUIState: newSettingsUIState});
  }

  // Should we validate that this is a valid path? This would have to deal
  // with the various different platforms
  public handleTextFieldInputChange = (stateId: string, newVal: string | number) => {
    if (stateId === "endpoint") {
      this.handleEndpointChange(newVal as string);
    }
    this.setState({ polyglotSettings: Object.assign({}, this.state.polyglotSettings, { [stateId]: newVal }) });
  }

  public handleListServicesClick = () => {
    this.listServices();
  }

  // TODO: Change this pattern. We want to validate all text inputs not just the endpoint
  public handleEndpointChange = (newEndpoint: string) => {
    const newEndPointError = this.validateEndpoint(newEndpoint);
    this.setState({
      polyglotSettings: Object.assign({}, this.state.polyglotSettings, { endpoint: newEndpoint }),
      settingsUIState: Object.assign({}, this.state.settingsUIState, { endpointError: newEndPointError })
    });
  }

  public handlePathBlur = (iD: string) => {
    const paths = this.state.polyglotSettings[iD] as string;
    const pathArray = [paths];
    console.log(paths);

    this.validateSystemPathRequest({id: iD, paths: pathArray});
  }

  public validateEndpoint = (newEndpoint: string) => {
    return newEndpoint === "";
  }

  public handleMethodClick = (serviceName: string, methodName: string) => {
    console.log("handling method click");
    try {
      const clickedService = this.state.services.find((service) => {
        return service.name === serviceName;
      }) as IService;
      const clickedMethod = clickedService.methods.find((method) => {
        return method.name === methodName;
      }) as IMethod;

      console.log(clickedMethod);

      // Initially pretty print the templates to make it easy for users to vew the templates.
      // Store and display as simple strings to make subsequent editing easier.
      const prettyPrintedRequestTemplate = JSON.stringify(clickedMethod.request, null, 2);
      const prettyPrintedResponseTemplate = JSON.stringify(clickedMethod.response, null, 2);

      this.setState({
        callServiceOptions: Object.assign({},
          this.state.callServiceOptions,
          { fullMethod: serviceName + "/" + methodName }),
        request: prettyPrintedRequestTemplate,
        response: prettyPrintedResponseTemplate,
      });
    } catch (e) {
      console.error(e);
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
            services={this.state.services}
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
              request={this.state.request}
              appUIState={this.state.appUIState}
              serviceMethodIdentifier={this.state.callServiceOptions.fullMethod}
              handleRunClick={this.handleRunClick}
              handleRequestChange={this.handleRequestChange}
            />
            <ResponseViewer
              response={this.state.response}
              serviceMethodIdentifier={this.state.callServiceOptions.fullMethod}
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
  }
}

export default Root;
