import React, { Component } from 'react';
import { Header } from '../components/header';
import { Main } from '../components//main';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';

export class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      services : 
      [
        {"name": "TestService1", "methods": [{"name":"method1.1"}, {"name":"method1.2"} , {"name":"method1.3"}]}, 
        {"name": "TestService2", "methods": [{"name":"method2.1"}, {"name":"method2.2"} , {"name":"method2.3"}]},
        {"name": "TestService3", "methods": [{"name":"method3.1"}, {"name":"method3.2"} , {"name":"method3.3"}]}, 
        {"name": "TestService4", "methods": [{"name":"method4.1"}, {"name":"method4.2"} , {"name":"method4.3"}]},
        {"name": "TestService5", "methods": [{"name":"method5.1"}, {"name":"method5.2"} , {"name":"method5.3"}]}, 
        {"name": "TestService6", "methods": [{"name":"method6.1"}, {"name":"method6.2"} , {"name":"method6.3"}]},
        {"name": "TestService7", "methods": [{"name":"method7.1"}, {"name":"method7.2"} , {"name":"method7.3"}]}, 
        {"name": "TestService8", "methods": [{"name":"method8.1"}, {"name":"method8.2"} , {"name":"method8.3"}]}
      ],
      data: {
        "TestService6": {
          "method6.1": {
            "input": "inputExample6.1",
            "output":"outputExample6.1"
          },
          "method6.2": {
            "input": "inputExample6.2",
            "output":"outputExample6.2"
          },
          "method6.3": {
            "input": "inputExample6.3",
            "output":"outputExample6.1"
          }
        }
      },
      currentService: '',
      currentMethod: '',
    };
    this.onMethodClick = this.onMethodClick.bind(this);
  }
  
  onMethodClick(serviceName, methodName){
    try{
      console.log(serviceName + "/" + methodName + ":" + this.state.data[serviceName][methodName]["input"] + "," + this.state.data[serviceName][methodName]["output"]);
    }
    catch (e){
      if (e instanceof TypeError){
        console.log("TypeError, likely can't find service and method:" + serviceName + "/" + methodName);
      }
    }
    

    this.setState({
      currentService: serviceName,
      currentMethod: methodName,
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Main services={this.state.services} onMethodClick={this.onMethodClick}/>
      </div>
    );
  }
}