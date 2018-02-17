import React, { PureComponent } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter, Switch } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';

import DefaultMode from 'components/DefaultMode';
import MoveTaskMode from 'components/MoveTaskMode';



class CategoryItem extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path = '/category/:key/edit_task/:taskId'>
          <MoveTaskMode location = {this.location}>{this.props.children}</MoveTaskMode> 
        </Route>
        <Route path = '/'>
           <DefaultMode location = {this.location}>{this.props.children}</DefaultMode>
        </Route>
      </Switch>
    );
  }
}

  export default connect(
    state => ({
      store: state
    }),
    dispatch => ({

    })
  )(CategoryItem);







  