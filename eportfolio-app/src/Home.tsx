import React from 'react';
import styled from 'styled-components';
import { SiteLayout, Button } from 'jinxui';


const StickyDiv = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
`

const SiteHeader = styled.header`
  margin-bottom: 1.45rem;

`;

const HeaderDiv = styled.div`
  margin: 0 auto;
  max-width: 90%;
  padding: 0.6rem 0.5rem 0.2rem;
`

const Home = () => {

    return (
        <div>
        <StickyDiv>
            <SiteHeader>
                <HeaderDiv>
                    <a href="/login" >
                        <Button width={null} textColour="#EEEEEE" backgroundColour={null} hoverColour={null} text="Login"/>
                    </a>
                    {/*
                    <a href="/signup" >
                    </a>*/}
                </HeaderDiv>
            </SiteHeader>
        </StickyDiv>
        <SiteLayout>
            
        </SiteLayout>
        </div>
    )
}

export default Home;