import * as React from 'react';
import * as ReactMD from 'react-md';

import SideBar from '../components/sideBar';
import RequestBuilder from '../components/requestBuilder';
import ResponseViewer from '../components/responseViewer';
import {
  Service, Method, PolyglotRequestOptions, PolyglotSettings,
  ListServicesOptions, SettingsUIState, AppUIState, //ListServicesRequest,
  //PolyglotResponse, CallServiceRequest
} from '../types/index';

import { remote } from 'electron';
const dialog = remote.dialog;
// const mainProcess = remote.require('../main.development'); // TODO: Can this be done in a nicer TypeScript way?

// TODO: Add option to get information about service, eg whether it is streaming or unary, display in UI
// const checkConsoleErrorMessage = 'Check console for full log (Console can be reached from View' +
//   ' -> Toggle Developer Tools -> Console)';

// class RootState {
//   services: Service[] = [];
//   polyglotSettings: PolyglotSettings = new PolyglotSettings();
//   listServicesOptions: ListServicesOptions = new ListServicesOptions();
//   polyglotRequestOptions: PolyglotRequestOptions = new PolyglotRequestOptions();
//   request: string = '';
//   response: string = '';
//   settingsUIState: SettingsUIState = new SettingsUIState();
//   appUIState: AppUIState = new AppUIState();

//   constructor(init?: Partial<RootState>) {
//     Object.assign(this, init);
//   }
// }

// let mainProcessCallService: (req: CallServiceRequest) => PolyglotResponse;
// let mainProcessListServices: (req: ListServicesRequest) => PolyglotResponse

interface RootState {
  services: Service[];
  polyglotSettings: PolyglotSettings;
  listServicesOptions: ListServicesOptions;
  polyglotRequestOptions: PolyglotRequestOptions;
  request: string;
  response: string;
  settingsUIState: SettingsUIState;
  appUIState: AppUIState;
}

export class Root extends React.Component<{}, RootState> {
  constructor() {
    super();
    console.log("constructing root");
    // this.state = new RootState();
    this.state = {services: [],request:'', response:'', listServicesOptions: new ListServicesOptions(),
     polyglotRequestOptions: new PolyglotRequestOptions, polyglotSettings: new PolyglotSettings(), settingsUIState: new SettingsUIState,
    appUIState: new AppUIState};

    console.log(this.state);
  }

  listServices = () => {
    this.setState({ request: '', response: '', services: [] });

    // // TODO: Validate input is in correct formats, make this conform to the interface defined in types
    // mainProcess.listServices(
    //   this.state.polyglotSettings, this.state.polyglotRequestOptions,
    //   this.state.listServicesOptions, this.listServicesReply);
  }

  listServicesReply = (/*res: PolyglotResponse*/) => {
    // if (!res.error) {
    //   try {
    //     const parsedResponse = JSON.parse(res.reply);
    //     this.setState({ services: parsedResponse });
    //   } catch (e) {
    //     this.openErrorDialog('Error parsing list-services response:', checkConsoleErrorMessage);
    //     console.log(`Error ${e}\n${res.reply}`);
    //   }
    // } else {
    //   this.openErrorDialog('Error listing services: ', checkConsoleErrorMessage);
    //   console.log(`Error ${res.error}\n${res.reply}`);
    // }
  }

  showDirectoryDialog = (id: string, macMessage: string = '', multiSelection: boolean = false) => {
    console.log("showing dialog");
    console.log(this.state);
    var customProperties = ['openDirectory', 'openFile', 'showHiddenFiles'];

    if (multiSelection) {
      customProperties.push('multiSelections');
    }

    console.log(customProperties);

    const pathList = dialog.showOpenDialog({
      properties: customProperties,
      message: macMessage
    } as Electron.OpenDialogOptions);
    console.log('pathList: ', pathList);

    // if (multiSelection) {
    //   this.setState({ polyglotSettings: { [id]: pathList } });
    // } else {
    //   if (pathList.length >= 1) {
    //     const path = pathList[0];
    //     this.setState({ polyglotSettings: { [id]: path } }); // TODO: Test is this the proper syntax?
    //   }
    // }
  }

  callService = () => {
    const jsonInput = this.state.request;
    // Remove the annotations eg. [<optioal> <repeated>] from the request. 
    // Note (Edge Case): If the actual JSON body contains these strings they will be removed.
    const redactedJsonInput = jsonInput!.replace(/\[<(optional|required)> <(single|repeated)>\]/g, '');

    try { 
      JSON.parse(redactedJsonInput);
    } catch (e) {
      this.openJsonParseErrorDialog();
      this.setState({ appUIState: Object.assign({}, this.state.appUIState, { callRequestInProgress: false }) });
    }

    // const callServiceOptions = new CallServiceOptions({ jsonRequest: redactedJsonInput });

    // mainProcess.callService(
    //   this.state.polyglotSettings, this.state.polyglotRequestOptions,
    //   callServiceOptions, this.callServiceReply);
  }

  callServiceReply = (/*res: PolyglotResponse*/) => {
    // this.setState({ appUIState: Object.assign({}, this.state.appUIState, { callRequestInProgress: false }) });
    // if (!res.error) {
    //   const trimmedReply = res.reply.trim();
    //   this.setState({ response: trimmedReply });
    // } else {
    //   this.openErrorDialog('Error calling service: ', checkConsoleErrorMessage);
    //   console.log(`Error ${res.error}\n${res.reply}`);
    // }
  }

  openJsonParseErrorDialog = () => {
    this.openErrorDialog('Error parsing request', 'Ensure that the request is valid JSON');
  }

  closeErrorDialog = () => {
    console.log("closing error dialogue");
    console.log(this.state);
    this.setState({ appUIState: Object.assign({}, this.state.appUIState, { errorDialogVisible: false }) });
  }

  openErrorDialog = (title: string, explanation: string) => {
    console.log('opening dialogue');
    console.log(this.state);
    this.setState({
      appUIState: Object.assign({}, this.state.appUIState,
        {
          errorDialogVisible: false, errorDialogTitle: title,
          errorDialogExplanation: explanation
        })
    });
  }

  handleRequestChange = (newValue: string) => {
    console.log('handling request change');
    console.log(this.state);
    this.setState({ request: newValue });
  }

  handleRunClick() {
    console.log('handling run click');
    console.log(this.state);
    // Up until this point the endpoint did not need to be filled in.
    if (this.state.polyglotSettings.endpoint === undefined) {
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

  handleSettingsClick = () => {
    console.log('handling settings click');
    console.log(this);
    var newSettingsUIState: SettingsUIState = Object.assign({}, this.state.settingsUIState,
      { settingsOpen: !this.state.settingsUIState.settingsOpen });
    console.log("newSettingsUIState", newSettingsUIState);
    // this.setState({ settingsUIState: brandNewSettingsUIState });
    this.setState({settingsUIState: newSettingsUIState} as RootState);
  }

  // Should we validate that this is a valid path? This would have to deal
  // with the various different platforms
  handleTextFieldInputChange = (stateId: string, newText: string | number) => {
    console.log('handling text field change');
    console.log(this.state);
    if (stateId === 'endpoint') {
      this.handleEndpointChange(newText as string);
    }
    this.setState({ polyglotSettings: Object.assign({}, this.state.polyglotSettings, { [stateId]: newText }) });
  }

  handleListServicesClick = () => {
    console.log('handling list services click');
    console.log(this.state);
    console.log('Listing Services');
    this.listServices();
  }

  // TODO: Change this pattern. We want to validate all text inputs not just the endpoint
  handleEndpointChange = (newEndpoint: string) => {
    console.log('handling endpoint change');
    console.log(this.state);
    const newEndPointError = this.validateEndpoint(newEndpoint);
    this.setState({
      polyglotSettings: Object.assign({}, this.state.polyglotSettings, { endpoint: newEndpoint }),
      settingsUIState: Object.assign({}, this.state.settingsUIState, { endpointError: newEndPointError })
    });
  }

  validateEndpoint = (newEndpoint: string) => {
    return newEndpoint === '';
  }

  handleMethodClick = (serviceName: string, methodName: string) => {
    console.log('handling method click');
    console.log(this.state);
    try {
      const clickedService = this.state.services.find((service) => {
        return service.name === serviceName;
      }) as Service;
      const clickedMethod = clickedService.methods.find((method) => {
        return method.name === methodName;
      }) as Method;

      // Initially pretty print the templates to make it easy for users to vew the templates.
      // Store and display as simple strings to make subsequent editing easier.
      const parsedRequestTemplate = JSON.parse(clickedMethod.request);
      const prettyPrintedRequestTemplate = JSON.stringify(parsedRequestTemplate, null, 2);

      const parsedResponseTemplate = JSON.parse(clickedMethod.response);
      const prettyPrintedResponseTemplate = JSON.stringify(parsedResponseTemplate, null, 2);

      this.setState({
        polyglotRequestOptions: Object.assign({},
          this.state.polyglotRequestOptions,
          { fullMethod: serviceName + '/' + methodName }),
        request: prettyPrintedRequestTemplate,
        response: prettyPrintedResponseTemplate,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
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
          />
          <div
            style={{ display: 'flex' }}
            className={
              'md-navigation-drawer-content md-navigation-drawer-content--prominent-offset' +
              'md-transition--decceleration md-drawer-relative md-toolbar-relative'
            }
          >
            <RequestBuilder
              request={this.state.request}
              appUIState={this.state.appUIState}
              serviceMethodIdentifier={this.state.polyglotRequestOptions.fullMethod}
              handleRunClick={this.handleRunClick}
              handleRequestChange={this.handleRequestChange}
            />
            <ResponseViewer
              response={this.state.response}
              serviceMethodIdentifier={this.state.polyglotRequestOptions.fullMethod}
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
              label: 'Ok',
            }]
          }
          children={this.state.appUIState.errorDialogExplanation}
        />
      </div>);
  }

  // componentWillUnmount() {
  //   console.log("root will unmount");
  // }

  // componentDidMount() {
  //   console.log("root did mount");
  // }
}

export default Root;