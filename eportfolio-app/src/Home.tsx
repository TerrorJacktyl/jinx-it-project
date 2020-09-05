import React from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { SiteLayout } from 'jinxui';

const StickyDiv = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
`

const AccountButton = styled(Button)`
    display: flex;
    float: right;
`;

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
                        <AccountButton color="primary">Login</AccountButton>
                    </a>
                    <a href="/signup" >
                        <AccountButton color="primary">Sign up</AccountButton>
                    </a>
                    <a href="/profile" >
                        <AccountButton color="primary">profile</AccountButton>
                    </a>
                </HeaderDiv>
            </SiteHeader>
        </StickyDiv>
        <SiteLayout>
            
        </SiteLayout>
        </div>
    )
}

export default Home;