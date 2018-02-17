import React, { PureComponent } from 'react'
import { Route, Link } from 'react-router-dom'
import { withRouter, Switch, Redirect } from 'react-router'
import styled from 'styled-components'
import { connect } from 'react-redux'
import CategoryWrapper from 'components/CategoryWrapper'

import { addCategory } from 'actions/categoryActions'
import { categorySearcher } from 'tools/categorySearcher'

const Root = styled.div`
  display: flex;
  height: 700px;
  flex-direction: column;
`;

const CategoryCreating = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: left;
  width: 90%;
  flex-shrink: 0;
`;

const InputCategory = styled.input`
  border: 1px solid black;
`;

const AddButton = styled.button`
  background-color: green;
  color: white;
  border: 1px solid black;
  border-left: none;
  border-radius: 7%;
  padding: 3px;
  cursor: pointer;
`;

const BoxWrapper = styled.div `
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60vh;
  overflow-x: hidden;
  overflow-y: scroll;
  flex-shrink: 0;
`;

class CategoryBox extends PureComponent {
  handleCategoryClick = () => {
    const input = document.getElementById('inputC');
    if(this.categoryInput) {
      if(this.categoryInput.value.length) {
        this.props.categoryToStore(this.categoryInput.value);
        input.value = '';     
      } 
    } 
  }

  render() {
    let URLarr = this.props.location.pathname.split('/');
    let index = URLarr.indexOf('category');
    this.URLisCorrect = categorySearcher(this.props.store.categories, URLarr[index+1]);
   
    return(
       <Root>
       { !this.URLisCorrect && (<Redirect to="/"/>) }
        <Switch>
          <Route exact path = '/category/:key/edit_task/:taskId'> null</Route>
          <Route path = '/'>
            <CategoryCreating>
              <InputCategory id = 'inputC' innerRef = {(input) => { this.categoryInput = input }} placeholder="Enter category title"></InputCategory>
              <AddButton onClick={this.handleCategoryClick}>Add</AddButton>
            </CategoryCreating>   
          </Route>
        </Switch>

        <BoxWrapper>
        {this.props.store.categories.map((item, index) => (
            <Route><CategoryWrapper location = {this.props.location} >{ item }</CategoryWrapper></Route>
        ))}
        </BoxWrapper>
      </Root>
    );
  }  
}

export default withRouter(connect(
    state => ({
      store: state
    }),
    dispatch => ({
      categoryToStore:(name) => {
        dispatch(addCategory(name));
      }
    })
  )(CategoryBox));
