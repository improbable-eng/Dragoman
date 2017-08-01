import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';

export class RequestBuilder extends React.Component{
    render(){
        return (
            <Card style={{width:"50%"}} >
                <CardTitle
                title="Request Builder"
                subtitle="Build request here..."
                />
            </Card>
        );
    }
}