import * as React from 'react';
import * as ReactMD from 'react-md';

import SideBar from '../components/sideBar';
import RequestBuilder from '../components/requestBuilder';
import ResponseViewer from '../components/responseViewer';
import {
  Service, Method, PolyglotRequestOptions, PolyglotSettings,
  ListServicesOptions, CallServiceOptions, SettingsUIState, AppUIState
} from '../types/index';

import { remote } from 'electron';
const dialog = remote.dialog;
const mainProcess = remote.require('../electron'); // TODO: Can this be done in a nicer TypeScript way?

// TODO: Add option to get information about service, eg whether it is streaming or unary, display in UI
const checkConsoleErrorMessage = 'Check console for full log (Console can be reached from View' +
  ' -> Toggle Developer Tools -> Console)';

class AppContainerState {
  services: Service[] = [];
  polyglotSettings: PolyglotSettings = new PolyglotSettings();
  listServicesOptions: ListServicesOptions = new ListServicesOptions();
  polyglotRequestOptions: PolyglotRequestOptions = new PolyglotRequestOptions();
  request: string = '';
  response: string = '';
  settingsUIState: SettingsUIState = new SettingsUIState();
  appUIState: AppUIState = new AppUIState();
}

export class AppContainer extends React.Component<{}, AppContainerState> {
  constructor() {
    super();
    this.state = new AppContainerState();

    const functionsToBind = ['showDirectoryDialog', 'handleMethodClick', 'listServices', 'listServicesReply',
      'callService', 'callServiceReply', 'handleTextFieldInputChange', 'handleListServicesClick', 
      'handleEndpointChange', 'validateEndpoint', 'handleSettingsClick', 'handleRunClick', 'handleRequestChange',
      'closeErrorDialog', 'openErrorDialog', 'openJsonParseErrorDialog'];

    functionsToBind.forEach((func) => {
      this[func] = this[func].bind(this);
    });
  }

  listServices() {
    this.setState({ request: '', response: '', services: [] });

    // TODO: Validate input is in correct formats
    mainProcess.listServices(
      this.state.polyglotSettings, this.state.polyglotRequestOptions,
      this.state.listServicesOptions, this.listServicesReply);
  }
  listServicesReply(err: Error, reply: string) {
    if (!err) {
      try {
        const parsedResponse = JSON.parse(reply);
        this.setState({ services: parsedResponse });
      } catch (e) {
        this.openErrorDialog('Error parsing list-services response:', checkConsoleErrorMessage);
        console.log(`Error ${e}\n${reply}`);
      }
    } else {
      this.openErrorDialog('Error listing services: ', checkConsoleErrorMessage);
      console.log(`Error ${err}\n${reply}`);
    }
  }

  showDirectoryDialog(id: string, macMessage: string = '', multiSelection: boolean = false) {
    var customProperties = ['openDirectory', 'openFile', 'showHiddenFiles'];

    if (multiSelection) {
      customProperties.push('multiSelections');
    }

    console.log(customProperties);

    const pathList = dialog.showOpenDialog({
      properties: customProperties,
      message: macMessage
    } as Electron.OpenDialogOptions);

    if (multiSelection) {
      this.setState({ polyglotSettings: { [id]: pathList } });
      // path = path.join(',\n'); // TODO: Move this logic to the rendering in multilinetextentry
    } else {
      const path = pathList[0];
      this.setState({ polyglotSettings: { [id]: path } }); // TODO: Test is this the proper syntax?
    }
  }

  callService() {
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

    const callServiceOptions = new CallServiceOptions({ jsonRequest: redactedJsonInput });

    mainProcess.callService(
      this.state.polyglotSettings, this.state.polyglotRequestOptions,
      callServiceOptions, this.callServiceReply);
  }

  callServiceReply(err: Error, reply: string) {
    this.setState({ appUIState: Object.assign({}, this.state.appUIState, { callRequestInProgress: false }) });
    if (!err) {
      const trimmedReply = reply.trim();
      this.setState({ response: trimmedReply });
    } else {
      this.openErrorDialog('Error calling service: ', checkConsoleErrorMessage);
      console.log(`Error ${err}\n${reply}`);
    }
  }

  openJsonParseErrorDialog() {
    this.openErrorDialog('Error parsing request', 'Ensure that the request is valid JSON');
  }

  closeErrorDialog() {
    this.setState({ appUIState: Object.assign({}, this.state.appUIState, { errorDialogVisible: false }) });
  }

  openErrorDialog(title: string, explanation: string) {
    this.setState({
      appUIState: Object.assign({}, this.state.appUIState,
                                {
          errorDialogVisible: false, errorDialogTitle: title,
          errorDialogExplanation: explanation
        })
    });
  }

  handleRequestChange(newValue: string) {
    this.setState({ request: newValue });
  }

  handleRunClick() {
    // Up until this point the endpoint did not need to be filled in.
    if (this.state.polyglotSettings.endpoint == null) {
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

  handleSettingsClick() {
    this.setState({
      settingsUIState: Object.assign({}, this.state.settingsUIState,
                                     { settingsOpen: !this.state.settingsUIState.settingsOpen })
    });
  }

  // Should we validate that this is a valid path? This would have to deal
  // with the various different platforms
  handleTextFieldInputChange(stateId: string, newText: string | number) {
    if (stateId === 'endpoint') {
      this.handleEndpointChange(newText as string);
    }
    this.setState({ polyglotSettings: Object.assign({}, this.state.polyglotSettings, { [stateId]: newText }) });
  }

  handleListServicesClick() {
    console.log('Listing Services');
    this.listServices();
  }

  // TODO: Change this pattern. We want to validate all text inputs not just the endpoint
  handleEndpointChange(newEndpoint: string) {
    const newEndPointError = this.validateEndpoint(newEndpoint);
    this.setState({
      polyglotSettings: Object.assign({}, this.state.polyglotSettings, { endpoint: newEndpoint }),
      settingsUIState: Object.assign({}, this.state.settingsUIState, { endpointError: newEndPointError })
    });
  }

  validateEndpoint(newEndpoint: string) {
    return newEndpoint === '';
  }

  handleMethodClick(serviceName: string, methodName: string) {
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
          visible={this.state.appUIState.errorDialogVisible}
          title={this.state.appUIState.errorDialogTitle}
          modal={true}
          actions={
            [{
              onClick: this.closeErrorDialog,
              primary: true,
              label: 'Ok',
            }]
          }
          children={this.state.appUIState.errorDialogExplanation}
        />
      </div>
    );
  }
}