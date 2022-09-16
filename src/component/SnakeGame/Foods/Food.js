import React from "react";
import styled from "styled-components";

const FoodItem = styled.div`
  position: absolute;
  height: 2rem;
  width: 2rem;
  background: tomato;
  border-radius: 50%;
  z-index: 2;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

const Food = ({foodDot}) =>{
	return (
		<FoodItem top={`${foodDot[0]}rem`} left={`${foodDot[1]}rem`} />
	);
}

export default Food;
