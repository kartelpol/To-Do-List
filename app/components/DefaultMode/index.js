import React, { PureComponent } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter, Switch } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';

import CategoryEdit from 'components/CategoryEdit';
import CategoryDisplay from 'components/CategoryDisplay';

import { editCategory} from 'actions/categoryActions';
import {saveNest} from 'actions/nestedCategoryActions';

const Wrapper = styled.div `
  margin-bottom: 3px;
  display: flex;
  padding-left: 8px;
  border: 1px solid black;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: baseline;
  &&:hover {
   background: #f7f7f7;
  }
  width: 100%;
`;


const Root = styled.div `
  display: flex;
  flex-direction: column;
`;

const AddNestWrapper = styled.div `
  margin-left: 10px;
  padding-left: 20px;
  width: 77%;
  border: 1px solid black;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: start;
`;

let styles = {

  click: {
    background: '#f7f7f7',
  },
  'default': {
    background: 'white',
  }
}


const linkStyle = {
  width: '100%', 
  textDecoration: 'none',
  color: 'black'
}


class DefaultMode extends PureComponent {

  defineLink = () => {
    let arr = this.props.location.pathname.split('/');
    let numb = arr.indexOf('category');
    if( numb != -1) {
      arr[numb + 1] = this.props.children.key;
    } else {
      arr.splice(1, 1,'category', this.props.children.key +"");
    }
    return arr.join('/');
  }

  render() {
    let arr = this.props.location.pathname.split('/');
    let numb = arr.indexOf('category');

    if (this.props.children.key != arr[numb+1]) this.kind = 'default';
    else this.kind = 'click';
    return (
      <Root>
        <Wrapper style={styles[this.kind]}>

          { this.props.children.redact ? 
            <CategoryEdit store = { this.props.store } item = { this.props.children } renameCategory = { this.props.editCategory }/>
          : <Link style = {linkStyle} to={this.defineLink()}>
              <CategoryDisplay>{this.props.children}</CategoryDisplay>
            </Link>
          }
        </Wrapper>
        

        { this.props.children.newNest ?
          <AddNestWrapper> 
            <CategoryEdit store = {this.props.store} item = { this.props.children } renameCategory = { this.props.saveNest }>
            { this.props.children }</CategoryEdit>
          </AddNestWrapper>
        : <span/>}
      </Root>
    )
  }
}
    
export default withRouter(connect(
  state => ({
    store: state
  }),
  dispatch => ({
    editCategory: (name, key, categories) => {
      dispatch(editCategory(name, key, categories ));
    },

    saveNest: ( key, category, name) => {
     dispatch(saveNest(key, category, name));
    },

  })
)(DefaultMode));


