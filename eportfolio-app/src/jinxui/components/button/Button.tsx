import styled from "styled-components";

const SecondaryButton = styled.button`
  font-family: "Heebo", sans-serif;
  font-style: normal;
  font-weight: normal;
  color: #EEEEEE;
  font-size: 24px;
  line-height: 35px;
  text-align: center;
  margin-left: 0px;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  display: block;
  background-color: transparent;
  border-radius: 5px;
  border: 2px solid #EEEEEE;
  border-radius: 5px;
  max-width: 255px;
  width: 100%;
  height: 43px;
  :hover {
    color: #00FFC2; 
  }
  cursor: pointer;
`;

const PrimaryButton = styled(SecondaryButton)`
  color: #00FFC2;
  border-radius: 5px;
  border: 2px solid #00FFC2;
  border-radius: 5px;
  :hover {
    background-color: #00FFC2;
    color: black; 
  }
`;

export {
  PrimaryButton,
  SecondaryButton
};
