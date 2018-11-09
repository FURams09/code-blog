import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BlurbCard = (props) => {
  const BlurbContainer = styled.div`
    text-align: center;
    grid-area: ${props.gridArea};
    border: 1px dashed ${props.borderColor || `red`};
  `;
  const BlurbHeader = styled.h2`
    text-align: center;
    font-size: 28px;
    margin-top: 10px;
  `;

  const BlurbContent = styled.div`
    text-align: left;
    padding: 0px 10px;
  `;

  return (
    <BlurbContainer gridArea={props.gridArea} borderColor={props.borderColor}>
      <BlurbHeader>{props.title}</BlurbHeader>
      <BlurbContent>{props.children}</BlurbContent>
    </BlurbContainer>
  );
};

BlurbCard.propTypes = {
  gridArea: PropTypes.string.isRequired,
  title: PropTypes.string,
  borderColr: PropTypes.string,
};

export default BlurbCard;
