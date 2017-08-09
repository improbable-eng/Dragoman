import React, { Component } from 'react';

import Toolbar from 'react-md/lib/Toolbars';
import Dialog from 'react-md/lib/Dialogs';

import { SideBar } from '../components/sideBar';
import { RequestBuilder } from '../components/requestBuilder';
import { ResponseViewer } from '../components/responseViewer';

const { ipcRenderer, remote } = window.require('electron');
const dialog = remote.dialog;
const mainProcess = remote.require('../public/electron');

//TODO: Add option to get information about service, eg whether it is streaming or unary, display in UI
const checkConsoleErrorMessage = "Check console for full log (Console can be reached from View" +
                                 " -> Toggle Developer Tools -> Console)";

export class AppContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      services : [],
      fullMethod: 'Service/Method',
      request: "",
      response: "",
      serviceFilter: "",
      methodFilter: "",
      errorDialogVisible: false,

      //Settings
      previousProtoDiscoveryRoot: "",
      currentProtoDiscoveryRoot: "",
      endpoint: "",
      settingsOpen: true,
      endpointRequired: false,
      endpointError: false,
      configSetPath: "",
      addProtocIncludes: "",
      callRequestInProgress: false,
      configName: "",
      tlsCaCertPath: "",
      deadlineMs: "",
      };
    
    const functionsToBind = ["showDirectoryDialog", "handleMethodClick", "listServices", "listServicesReply", 
    "callService", "callServiceReply", "handleTextChange", "handleProtoPathBlur", "handleEndpointChange", 
    "validateEndpoint", "handleSettingsClick", "handleRunClick", "handleRequestChange", "closeErrorDialog", 
    "openErrorDialog", "openJsonParseErrorDialog"];

    functionsToBind.forEach((func) => {
      this[func] = this[func].bind(this);
    });
  }

  listServices(){
    //Don't waste time listing services with the same discovery root
    //TODO: Maybe give manual control of this to allow override
    //TODO: Validate input is in correct formats
    if (this.state.currentProtoDiscoveryRoot !== this.state.previousProtoDiscoveryRoot) {
      mainProcess.listServices(
        this.state.currentProtoDiscoveryRoot, this.state.serviceFilter, this.state.methodFilter,
        this.state.configSetPath, this.state.configName, this.state.addProtocIncludes,
        this.state.deadlineMs, this.state.tlsCaCertPath ,this.listServicesReply);

      this.setState({previousProtoDiscoveryRoot: this.state.currentProtoDiscoveryRoot, 
        request: "", response: "", services: []});
    }
  }

  listServicesReply(err, reply){
    if (!err){
      try{
        const parsedResponse = JSON.parse(reply);
        this.setState({services: parsedResponse});
      } catch(e) {
        this.openErrorDialog("Error parsing list-services response:", checkConsoleErrorMessage);
        console.log(`Error ${e}\n${reply}`);
      }
    } else {
      this.openErrorDialog("Error listing services: ", checkConsoleErrorMessage);
      console.log(`Error ${err}\n${reply}`);
    }
  }

  showDirectoryDialog(id, macMessage, multiSelection){
    var customProperties = ['openDirectory', 'openFile', 'showHiddenFiles'];
    if (multiSelection) {
      customProperties.push('multiSelections');
    }
    console.log(customProperties)
    var path = dialog.showOpenDialog({
        properties: customProperties,
        message: macMessage
      });
    console.log(path);
    if(path instanceof Array){
      path = path.join(",\n");
    }
    console.log(path);
    this.setState({[id]: path});
    console.log(this.state);
  }

  callService(){
    const jsonInput = this.state.request;
    //Remove the annotations eg. [<optional> <repeated>] from the request. 
    //Note (Edge Case): If the actual JSON body contains these strings they will be removed.
    const redactedJsonInput = jsonInput.replace(/\[<(optional|required)> <(single|repeated)>\]/g, "");
    
    try {
      JSON.parse(redactedJsonInput);
    } catch(e) {
      this.openJsonParseErrorDialog();
      this.setState({callRequestInProgress: false});
    }

  //  this.props.ipcRenderer.send(
  //     "call-service",
  //     this.state.currentProtoDiscoveryRoot,
  //     redactedJsonInput,
  //     this.state.endpoint,
  //     this.state.fullMethod
  //   )

    mainProcess.callService(
      this.state.currentProtoDiscoveryRoot,
      redactedJsonInput,
      this.state.endpoint,
      this.state.fullMethod,
      this.callServiceReply
    );
  }

  callServiceReply(err, reply) {
    if (!err){
        const trimmedReply = reply.trim();
        this.setState({response: trimmedReply, callRequestInProgress: false});
      } else {
        this.setState({callRequestInProgress: false});
        this.openErrorDialog("Error calling service: ", checkConsoleErrorMessage);
        console.log(`Error ${err}\n${reply}`);
      }
  }

  openJsonParseErrorDialog(){
    this.openErrorDialog("Error parsing request", "Ensure that the request is valid JSON");
  }

  closeErrorDialog(){
    this.setState({errorDialogVisible: false});
  }

  openErrorDialog(title, explanation){
    this.setState({
      errorDialogVisible: true, 
      errorDialogTitle: title, 
      errorDialogExplanation: explanation
    });
  }

  handleRequestChange(newValue){
    this.setState({request: newValue});
  }

  handleRunClick(){
    //Up until this point the endpoint did not need to be filled in.
    if(this.state.endpoint === ""){ 
      this.setState({settingsOpen: true, endpointError: true, endpointRequired: true});
    } else {
      this.setState({endpointRequired: true, callRequestInProgress: true});
      this.callService();
    }
  }

  handleSettingsClick(){
    this.setState({settingsOpen: !this.state.settingsOpen});
  }

  //Should we validate that this is a valid path? This would have to deal
  //with the various different platforms
  handleTextChange(stateId, newText){
    if (stateId === "endpoint"){
      this.handleEndpointChange(newText)
    }
    this.setState({[stateId]: newText});
  }

  //TODO: Replace this with a list services button
  handleProtoPathBlur(){
    this.listServices();
  }

  handleEndpointChange(newEndpoint){
    const newEndPointError = this.validateEndpoint(newEndpoint);
    this.setState({endpoint: newEndpoint, endpointError: newEndPointError});
  }

  validateEndpoint(newEndpoint){
    return newEndpoint === "";
  }
  
  handleMethodClick(serviceName, methodName){
    try{
      const clickedService = this.state.services.find((service) => {
        return service["name"] === serviceName;
      });
      const clickedMethod = clickedService["methods"].find((method) => {
        return method["name"] === methodName;
      });

      //Initially pretty print the templates to make it easy for users to view the templates.
      //Store and display as simple strings to make subsequent editing easier.
      const parsedRequestTemplate = JSON.parse(clickedMethod["requestMessage"]);
      const prettyPrintedRequestTemplate= JSON.stringify(parsedRequestTemplate, null, 2);

      const parsedResponseTemplate = JSON.parse(clickedMethod["responseMessage"]);
      const prettyPrintedResponseTemplate= JSON.stringify(parsedResponseTemplate, null, 2);
      
      this.setState({
      fullMethod: serviceName + "/" + methodName,
      request: prettyPrintedRequestTemplate,
      response: prettyPrintedResponseTemplate,
    });
    }
    catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <Toolbar
          title="Dragoman"
          className="md-toolbar--fixed"
          colored={true}
        />
        <div>
          <SideBar 
          //******** Service & Method List ********//
          services={this.state.services} 
          onMethodClick={this.handleMethodClick}
          //**************************************//

          //************** Settings **************//
          settingsOpen={this.state.settingsOpen}
          handleSettingsClick={this.handleSettingsClick}
          protoPath={this.state.currentProtoDiscoveryRoot}
          handleProtoPathBlur={this.handleProtoPathBlur}
          handleTextChange={this.handleTextChange}
          configSetPath={this.state.configSetPath}
          endpoint={this.state.endpoint}
          handleEndpointChange={this.handleEndpointChange}
          endpointError={this.state.endpointError}
          endpointRequired={this.state.endpointRequired}
          addProtocIncludes={this.state.addProtocIncludes}
          configName={this.state.configName}
          tlsCaCertPath={this.state.tlsCaCertPath}
          deadlineMs={this.state.deadlineMs}
          handlePathDoubleClick={this.showDirectoryDialog}
          //**************************************//
          />
          <div 
          style={{display:"flex"}} 
          className={"md-navigation-drawer-content md-navigation-drawer-content--prominent-offset" +
          "md-transition--decceleration md-drawer-relative md-toolbar-relative"}>
            <RequestBuilder 
            request={this.state.request}
            serviceMethodIdentifier={this.state.fullMethod}
            handleRunClick={this.handleRunClick}
            handleRequestChange={this.handleRequestChange}
            callRequestInProgress={this.state.callRequestInProgress}/>
            <ResponseViewer 
            response={this.state.response}
            serviceMethodIdentifier={this.state.fullMethod}/>
          </div>
        </div>
        <Dialog
          id="errorDialog"
          visible={this.state.errorDialogVisible}
          title={this.state.errorDialogTitle}
          modal
          actions={[{
            onClick: this.closeErrorDialog,
            primary: true,
            label: 'Ok',
          }]}
          children={this.state.errorDialogExplanation}
        >
        </Dialog>
      </div>
    );
  }
}