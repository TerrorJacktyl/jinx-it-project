import styled from "styled-components"

// Provides automatic layout for however many full length, single line text
// fields are required.
//
// Spacing ensures errors don't overlay labels and that the div doesn't 
// change size on validation failure
//
// Upon further testing, it appears that it requires elements to be within
// divs that are at least 93px high, if there are more than two, making
// this somewhat less useful / elegent. I'm still going to leave it here for 
// the moment though.

const FormSectionsDiv = styled.div`
  margin: 30px;
  display: grid;
  grid-template-rows: repeat(auto-fit, 93px);
`;

export default FormSectionsDiv