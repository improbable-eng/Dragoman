import React from 'react';

import ListItem from 'react-md/lib/Lists/ListItem';

export class MethodList extends React.Component {
    render(){
        const methods = this.props.methodlist.map(method =>
            <ListItem 
            key={method.name} 
            primaryText={method.name} 
            onClick={() => this.props.onMethodClick(method.name)}/>
        )
        return(
            <div>
                {methods}
            </div>
        );
    }
}