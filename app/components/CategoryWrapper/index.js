import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Route, connect } from 'react-redux'
import  CategoryItem from 'components/CategoryItem'

const Root = styled.div `
  display: flex;
  flex-direction: column-reverse;
`; 

const NestsBox = styled.div `
  margin-left: 10px;
  display: flex;
  flex-direction: column-reverse;
`;

class CategoryWrapper extends PureComponent {
  func(obj) {
    if(obj && obj.nests.length && obj.displayNests) {
      return (obj.nests.map((nest) => 
        <Root> 
          <NestsBox>{ this.func(nest)}</NestsBox>
          <CategoryItem location = {this.props.location}>{nest}</CategoryItem>
        </Root>
      ));
    } return;
  }

  render() { 
   /* console.log('wrapper', this.props);*/
    return (
      <Root>  
        <NestsBox>{ this.func(this.props.children)}</NestsBox>
        <CategoryItem location = {this.props.location} >{this.props.children}</CategoryItem>
      </Root>
    );
  }
}



 export default connect(
    state => ({
      store: state
    }),
    dispatch => ({
      categoryToStore:(category) => {
        dispatch({
          type: 'ADD_CATEGORY', 
          payload: {categories: {
          name: category,
          key: Date.now(),
          redact: false,
          newNest: false, 
          nests: [],
          displayNests: false,
          enable: false
        }}
      });
      },

      deleteCategory: (key) => {
        dispatch({
          type: 'DELETE_CATEGORY', 
          payload: key
        });
      },

      setRedactState: (key) => {
        dispatch({
          type: 'SET_REDACT',
          payload: key
        });
      },



      addNested: (key) => {
        dispatch({
          type: 'ADD_NESTED_CATEGORY',
          payload: key
        });
      },

      saveNested: (name, key) => {
        // dispatch({
       //    type: 'SAVE_NESTED_CATEGORY',
       //    payload: {name, key}
       //  })
       dispatch(saveNestedfunc(name, key));
      },


      categoryEnable: (key) => {
        dispatch(categoryEnableFunc(key));        
      },


      taskToStore: (name, category) => {
        dispatch(taskToStoreFunc(name, category));
      }
    })
  )(CategoryWrapper);

  const displayNestsFunc = (key) => ({
    type: 'DISPLAY_NESTED_CATEGORIES',
    payload: key
  });

   const saveNestedfunc = (name, key) => ({
      type: 'SAVE_NESTED_CATEGORY',
      payload: {name, key}
  });


  const categoryEnableFunc = (key) => ({
    type: 'CATEGORY_ENABLE',
    payload: key
  });



  const taskToStoreFunc = (task, category) => ({
    type: 'ADD_TASK',
    payload: { tasks: {
      name: task,
      categoryId: category,
      id: Date.now()
    }}
  })