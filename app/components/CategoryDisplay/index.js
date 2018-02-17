import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router';
import styled from 'styled-components';

import CategoryName from 'components/CategoryName';

import {deleteCategory, setEditState} from 'actions/categoryActions';
import {addNest} from 'actions/nestedCategoryActions';


const Root = styled.div `
  display: flex;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

const Wrapper = styled.div `
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-right: 10px;
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: flex-end;
  color: black;
`;

const Button = styled.button`
  cursor: pointer;
  color: black;
  display: flex;
  align-items: flex-end;
  height: 100%;
`;


 class CategoryDisplay extends PureComponent {

  handleDelete = (event) => {
    if(confirm("Do you want delete all nested categories and tasks?"))
      this.props.deleteCategory(event.currentTarget.id, this.props.store.categories, this.props.store.tasks );
  }

  redactHandler = (event) => {
    this.props.setEditState(event.currentTarget.id, this.props.store.categories);
  }

  addingNestedCategory = (event) => {
    this.props.addNest(event.currentTarget.id, this.props.store.categories);
  }


  render() {
    return (
      <Root>
         <Wrapper>
         <CategoryName>{this.props.children}</CategoryName>
        <ButtonsBox>
          <Button id = { this.props.children.key } onClick = { this.redactHandler}>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </Button>
           { this.props.children.enable ? 
          <Link style={{ textDecoration: 'none', color: 'black', height: '100%' }} to = '/'>
            <Button id = { this.props.children.key } onClick = {this.handleDelete}>
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </Button>
          </Link>
          : <Button id = { this.props.children.key } onClick = {this.handleDelete}>
             <i className="fa fa-trash-o" aria-hidden="true"></i>
            </Button>
          }
          
          <Button id = { this.props.children.key } onClick = { this.addingNestedCategory}>
            <i className="fa fa-plus-square-o" aria-hidden="true"></i>
          </Button>
        </ButtonsBox>
        </Wrapper>
       </Root>
    );
  }
}


export default connect(
    state => ({
      store: state
    }),
    dispatch => ({
      deleteCategory: (key, categories, tasks) => {
        dispatch(deleteCategory(key, categories, tasks));
      },

      setEditState: (key, categories) => {
        dispatch(setEditState(key, categories));
      },

      addNest: (key, category) => {
        dispatch(addNest(key, category));
      },
    })
  )(CategoryDisplay);

