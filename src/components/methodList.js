import React from 'react';

import Divider from 'react-md/lib/Dividers';
import ListItem from 'react-md/lib/Lists/ListItem';

export class MethodList extends React.Component {
    render(){
        const methods = this.props.methodlist.map(method =>
            <div key={method.name} onClick={() => this.props.onMethodClick(method.name)}>
                <ListItem  primaryText={method.name}/>
            </div>
        )
        return(
            <div>
                {methods}
            </div>
        );
    }
}

MethodList.propTypes = {
    methodlist: React.PropTypes.array
}