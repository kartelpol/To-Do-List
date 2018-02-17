import React, { PureComponent } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {setCompleteness} from 'actions/taskActions';

const Root = styled.div `
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 2%;
  width: 100%;
  height: 10vh;
  align-items: center;
  flex-shrink: 0;
`;

const TaskName = styled.div `
  padding-left: 10px;
  display: flex;
  align-items: baseline;
`;

const Button = styled.div `
  margin: 0;
  margin-right: 10px;
  padding: 0;
  cursor: pointer;
`;

class TaskItem extends PureComponent {

  render() {
    return (
      <Root>
        <TaskName>
        { this.props.children.done ?
          <Button  onClick = { (event) => { this.props.completeness(this.props.children.id, false)}}>
            <i className="fa fa-check-square-o" aria-hidden="<true></true>"></i>
          </Button>
        :  <Button onClick = { (event) => {this.props.completeness(this.props.children.id, true)}}>
            <i className="fa fa-square-o" aria-hidden="true"></i>
          </Button>
        }
          <span>{this.props.children.name}</span>
        </TaskName>
        <Link style = {{color: 'black'}} to = {this.props.match.url + '/edit_task/'+ this.props.children.id}>
          <Button>
           <i className = "fa fa-pencil-square-o" aria-hidden = "true"></i>
          </Button>
         </Link>
      </Root>
    )
  }
}



export default withRouter(connect(
    state => ({
    	store: state
    }),
    dispatch => ({
      completeness:(id, value) => {
        dispatch(setCompleteness(id, value))
      }
    })
  )(TaskItem));