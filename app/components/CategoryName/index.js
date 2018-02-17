import React, { PureComponent } from 'react'
import { Route, Link } from 'react-router-dom'
import { withRouter, Switch } from 'react-router'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { displayNest } from 'actions/nestedCategoryActions'


const Root = styled.div `
  display: flex;
  align-items: baseline;
`;

const Name = styled.div`
  overflow: hidden;
  margin-left: 10px;
`;

class CategoryName extends PureComponent {
  showNestsHandler(event) {
    this.props.displayNest(event.currentTarget.id, true, this.props.store.categories);
  }

  hideNestsHandler(event) {
    this.props.displayNest(event.currentTarget.id, false, this.props.store.categories);
  }
  render() {
    return (
      <Root>
         { this.props.children.nests.length ? 
           this.props.children.displayNests ? 
           <button id = { this.props.children.key } onClick = { this.hideNestsHandler.bind(this) }>
            <i className="fa fa-caret-up" aria-hidden="true"></i>
          </button>
         : <button id = { this.props.children.key } onClick = { this.showNestsHandler.bind(this) }>
            <i className="fa fa-caret-down" aria-hidden="true"></i>
          </button>
         : <span></span> }
        <Name>{ this.props.children.name }</Name>
 
      </Root>
    )
  }
}

export default connect(
    state => ({
      store: state
    }),
    dispatch => ({
      displayNest: (key, val, categories) => {
        dispatch(displayNest(key, val, categories));
      },
    })
  )(CategoryName);

