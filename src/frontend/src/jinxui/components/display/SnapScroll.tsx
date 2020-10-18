import React from "react";
import styled from "styled-components";

export const ScrollContainer = styled.div`
overflow-y: scroll;
scroll-snap-type: y mandatory;
&.proximity {
        scroll-snap-type: y proximity;
}
`

export const ScrollChild = styled.div`
scroll-snap-align: start;
`