import styled from "styled-components";

const PrimaryColumnDiv = styled.div`
height: auto;
width: 920px;
margin: auto;
margin-top: 70px;
margin-bottom: 100px;
display: block;
width: 90%;
display: grid;
grid-template-columns: 1fr minMax(200px, 900px) 1fr;
`;

export default PrimaryColumnDiv;