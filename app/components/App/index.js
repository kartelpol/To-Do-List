import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import styled from 'styled-components';

import Header from 'components/Header';
import Content, { Root as ContentRoot } from 'components/Content';

const Root = styled.div`

  display: flex;
  flex-direction: column;
  height: 98vh;
  width: 1300px;
  margin: 0 auto;
  margin-top: 10px;
  & ${ContentRoot} {
    flex-grow: 1;
  }
`;

export default class App extends PureComponent {
  render() {
    return (
      <Root>
        <Header/>
        <Route component={Content}/>
      </Root>
    );
  }
}
