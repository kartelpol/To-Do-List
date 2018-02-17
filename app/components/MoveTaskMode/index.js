import React, { PureComponent } from 'react'
import { Route, Link } from 'react-router-dom'
import { withRouter, Switch } from 'react-router'
import { connect } from 'react-redux'
import styled from 'styled-components'

import CategoryName from 'components/CategoryName'
import {moveTask} from 'actions/taskActions'

const Root = styled.div `
  border: 1px solid black;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 25px;
  padding-right: 25px;
`;

const Button = styled.button `
  cursor: pointer;
`;

class MoveTaskMode extends PureComponent {
  render() {
/*  	console.log(this.props);*/
    return (
      <Root>
          <CategoryName>{this.props.children}</CategoryName>
          <Button onClick = { () => {let arr = this.props.match.url.split('/'); this.props.changeCategory(this.props.children.key, arr.splice(arr.length-1, 1), this.props.store.tasks)}}>
            <i className="fa fa-hand-o-left" aria-hidden="true"></i>
          </Button>
      </Root>
    )
  }
}


export default withRouter(connect(
    state => ({
      store: state
    }),
    dispatch => ({
    	changeCategory: (category, taskId, tasks) => {
    	  dispatch(moveTask(category, taskId, tasks));	
    	}

    })
  )(MoveTaskMode));
