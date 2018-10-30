import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BlurbCard = (props) => {
  const BlurbContainer = styled.div`
    text-align: center;
    margin-top: 10px;
    width: 90%;
  `;
  const BlurbHeader = styled.h2`
    text-align: center;
    font-size: 28px;
  `;
  return (
    <div
      style={{
        gridArea: props.gridArea,
        border: `1px dashed ${props.borderColor || `red`}`,
      }}
    >
      <BlurbHeader>{props.title}</BlurbHeader>
      <BlurbContainer>{props.children}</BlurbContainer>
    </div>
  );
};

BlurbCard.propTypes = {
  gridArea: PropTypes.string.isRequired,
  title: PropTypes.string,
  borderColr: PropTypes.string,
};

export default BlurbCard;
