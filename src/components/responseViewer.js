import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';

export class ResponseViewer extends React.Component{
    render(){
        return (
            <Card style={{ width:"50%" }}>
                <CardTitle
                title="Response Viewer"
                subtitle="View response here..."
                />
            </Card>
        )
    }
}