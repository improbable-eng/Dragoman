import React, { Component } from 'react';

import Toolbar from 'react-md/lib/Toolbars';
import Dialog from 'react-md/lib/Dialogs';

import { SideBar } from '../components/sideBar';
import { RequestBuilder } from '../components/requestBuilder';
import { ResponseViewer } from '../components/responseViewer';

//TODO: Add option to get information about service, eg whether it is streaming or unary, display in UI

export class AppContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      services : [],
      fullMethod: 'Service/Method',
      request: "",
      response: "",
      previousProtoDiscoveryRoot: "",
      currentProtoDiscoveryRoot: "",
      serviceFilter: "",
      methodFilter: "",
      endpoint: "",
      settingsOpen: true,
      endpointRequired: false,
      endpointError: false,
      dialogVisible: false,
      };

    this.registerListeners = this.registerListeners.bind(this);
    this.handleMethodClick = this.handleMethodClick.bind(this);
    this.listServices = this.listServices.bind(this);
    this.callService = this.callService.bind(this);
    this.handleProtoPathTextChange = this.handleProtoPathTextChange.bind(this);
    this.handleProtoPathBlur = this.handleProtoPathBlur.bind(this);
    this.handleEndpointChange = this.handleEndpointChange.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.handleRunClick = this.handleRunClick.bind(this);
    this.handleRequestChange = this.handleRequestChange.bind(this);

    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);

    this.registerListeners(this.props.ipcRenderer);
  }

  listServices(){
    //Don't waste time getting the same request again and again
    if (this.state.currentProtoDiscoveryRoot !== this.state.previousProtoDiscoveryRoot) {
      this.props.ipcRenderer.send(
        "list-services",
        this.state.currentProtoDiscoveryRoot, 
        this.state.serviceFilter,
        this.state.methodFilter
      );
      this.setState({previousProtoDiscoveryRoot: this.state.currentProtoDiscoveryRoot});
    }
  }

  callService(validateRequest){
    console.log(`Calling service with validation ${validateRequest}`);
    const jsonInput = this.state.request;
    const redactedJsonInput = jsonInput.replace(/\[<(optional|required)> <(single|repeated)>\]/g, "");
    
    if(validateRequest){
      //Checking that the request can be parsed properly. If not this can cause polyglot problems.
      try {
        JSON.parse(redactedJsonInput);
      } catch(e) {
        this.openDialog();
      }
    }

   this.props.ipcRenderer.send(
      "call-service",
      this.state.currentProtoDiscoveryRoot,
      redactedJsonInput,
      this.state.endpoint,
      this.state.fullMethod
    )
  }

  //Asynchronous callbacks from the main process. These return polyglot's 
  //responses to list and call services
  registerListeners(ipcRenderer){
    ipcRenderer.on('list-services-reply', (event, err, reply) => {
      if (!err){
        try{
          const parsedResponse = JSON.parse(reply);
          this.setState({services: parsedResponse});
        } catch(e) {
          console.log("Error parsing list-services response, error: ", e, ". Reply: ", reply);
        }
      } else {
        alert("Error listing services, inspect console for polyglot's response.");
        console.log(reply);
      }
    });

    ipcRenderer.on('call-service-reply', (event, err, reply) => {
      if (!err){
        const trimmedReply = reply.trim();
        this.setState({response: trimmedReply});
      }
    });
  }

  closeDialog(accepted){
    if (accepted){
      this.callService(false);
    }
    this.setState({dialogVisible: false});
  }

  openDialog(){
    this.setState({dialogVisible: true});
  }

  handleRequestChange(newValue){
    this.setState({request: newValue});
  }

  handleRunClick(){
    //Up until this point the endpoint did not need to be filled in.
    if(this.state.endpointError === ""){ 
      this.setState({settingsOpen: true, endpointError: true, endpointRequired:true});
    } else {
      this.callService(true);
    }
  }

  handleSettingsClick(){
    this.setState({settingsOpen: !this.state.settingsOpen});
  }

  //Should we validate that this is a valid path? This would have to deal
  //with the various different platforms
  handleProtoPathTextChange(newPath){
    this.setState({currentProtoDiscoveryRoot: newPath});
  }

  handleProtoPathBlur(){
    this.listServices();
  }

  handleEndpointChange(newEndpoint){
    const newEndPointError = this.validateEndpoint(newEndpoint);
    this.setState({endpoint: newEndpoint, endpointError: newEndPointError});
  }

  //Are there other potential values other than IPv4 addresses? e.g. IPv6?
  validateEndpoint(newEndpoint){
    // const matchesIPPattern = /([0-9]+.[0-9]+.[0-9]+.[0-9]+|localhost):[0-9]+/.test(newEndpoint);
    // return !matchesIPPattern;
    return newEndpoint !== "";
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
          handleProtoPathTextChange={this.handleProtoPathTextChange}
          handleProtoPathBlur={this.handleProtoPathBlur}
          endpoint={this.state.endpoint}
          handleEndpointChange={this.handleEndpointChange}
          endpointError={this.state.endpointError}
          endpointRequired={this.state.endpointRequired}
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
            handleRequestChange={this.handleRequestChange}/>
            <ResponseViewer 
            response={this.state.response}
            serviceMethodIdentifier={this.state.fullMethod}/>
          </div>
        </div>
        <Dialog
          id="speedBoost"
          visible={this.state.dialogVisible}
          title="Error parsing request. Do you want to proceed anyway?"
          onHide={() => this.closeDialog(false)}
          modal
          actions={[{
            onClick: () => this.closeDialog(true),
            primary: true,
            label: 'Yes',
          }, {
            onClick: () => this.closeDialog(false),
            primary: true,
            label: 'Cancel',
          }]}
        >
        <p>Submitting a request which cannot be parsed to JSON can cause polyglot problems</p>
        </Dialog>
      </div>
    );
  }
}