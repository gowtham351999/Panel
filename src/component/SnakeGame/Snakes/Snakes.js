import React from "react";
import styled from "styled-components";

const SnakeItem = styled.div`
  position: absolute;
  height: 2rem;
  width: 2rem;
  background: gold;
  z-index: 2;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

const Snakes = ({snakeDots}) => {
	return snakeDots.map((item, i) => (
		<SnakeItem key={i} top={`${item[0]}rem`} left={`${item[1]}rem`} />
	));
}

export default Snakes;
