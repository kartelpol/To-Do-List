import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
  height: 15px;
  margin-top: 40px;
  border: 1px solid black;
  border-radius: 5%;
`;

  
const Progress = styled.div`
  height: 100%;
  background-color: gray;  
  border: 1px solid black;
`;

class Progressline extends PureComponent {
  constructor(props) {
    super(props);
    this.searchDone.bind(this);
    this.progressCounter.bind(this);
    this.defineCategoryId.bind(this);
    this.activeTasks.bind(this);
  }

  searchDone(arr) {
    if(!arr) {
      return;
    } else {
      let array = arr.filter((item) => {
        if(item.done) {
          return item;
        }
      });
      return array;
    }
  }

  activeTasks(key, array) {
    return array.filter((item) => {
      if(item.categoryId == key) {
        return item;
      }
    });
  }

  defineCategoryId() {
    let arr = this.props.location.pathname.split('/');
    let category = arr.indexOf('category');
    let categoryId;
    if(category != -1 ) {
     return  categoryId = arr[category+1];
    }
  }


  progressCounter() {
    let id = this.defineCategoryId();
    if(!id) return width = '0%';
    let tasks = this.activeTasks(id, this.props.store.tasks);
    if(!tasks.length) return '100%';
    let progress;
    let width;
    let doneTasks = this.searchDone(tasks);
    if( Array.isArray(doneTasks)) {
      progress = doneTasks.length * 100 / tasks.length;
      return width = Math.round(progress) + '%';
    } else 
      return width = '0%';
  }

  render() {
    return (
      <Root>
        <Progress style = {{width: this.progressCounter()}}></Progress>
      </Root>
      );
	}
}



export default withRouter(connect(
    state => ({
      store: state
    }),
    dispatch => ({
      completeness:(id, val) => {
        dispatch({
          type: 'CHANGE_TASK_COMPLETENESS', 
          payload: {id, val}
      })
      }
    })
  )(Progressline));