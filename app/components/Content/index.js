import React, { PureComponent } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter, Switch } from 'react-router';

import styled from 'styled-components';
import { connect } from 'react-redux';

import TasksBox from 'components/TasksBox';
import EditTask from 'components/EditTask';
import  CategoryBox from 'components/CategoryBox';

export const Root = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  background-color: white;
  font-size: 22px;
`;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
`;


const Tasks = styled.div `
  display: flex;
  flex-direction: column;
  width: 60%;
`;

export  class Content extends PureComponent {
  render() {
        console.log('content', this.props);
    return (
      <Root>
        <Category>
          <Route><CategoryBox location = {this.props.location}/></Route>
        </Category>
        
        <Tasks>
        <Switch>
           <Route exact path= '/category/:key/edit_task/:taskId' component={EditTask}/>    
           <Route path="/category/:key">
             <TasksBox location = {this.location}/>
           </Route> 
        </Switch>
        </Tasks>

      </Root>
    );
  }


}


 export default withRouter(connect(
    state => ({
    	store: state
    }),
    dispatch => ({

    })
  )(Content));





