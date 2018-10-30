import React, { Component } from 'react';
import styled from 'styled-components';

const SpinnerBase = styled.div`
  background-color: gray;
  border-radius: 4px;
`;

const StaticSpinner = styled.div`
  font-size: 18px;
  border-radius: 4px;
  background-color: red;
  text-align: center;
`;

const SpinningSpinner = styled.div`
  font-size: 18px;
  border-radius: 4px;
  background-color: red;
  text-align: center;
  animation: spinnerBounce 3.5s infinite 0.3s;
`;

export default class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
    };
  }
  render() {
    let spinner = <StaticSpinner>G</StaticSpinner>;
    if (this.state.spinning) {
      spinner = <SpinningSpinner>G</SpinningSpinner>;
    }
    return (
      <SpinnerBase
        onClick={() => {
          this.setState({ spinning: !this.state.spinning });
        }}
      >
        {spinner}
      </SpinnerBase>
    );
  }
}
