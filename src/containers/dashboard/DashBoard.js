import React from 'react';
import Body from './Body';

class DashBoard extends React.Component {
  render() {
    return (
      
        <Body history={this.props.history}/>
      
    )
  }
}

export default DashBoard;