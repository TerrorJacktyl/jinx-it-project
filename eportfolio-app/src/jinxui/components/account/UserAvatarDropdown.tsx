import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useUser } from "jinxui";

const StyledName = styled.h3`

`;

const NameDiv = styled.div`

`;

const UserAvatarDropdown = () => {

    const [firstName, setFirstName] = useState("");
    const { getAccountDetails } = useUser();

    const getName = () => {
        const auth = Cookies.get("authToken");
        if (auth){
            var name = Cookies.get("firstName");
            const config = {
                headers: {
                  Authorization: "Token " + auth,
                },
            };
            if (name === undefined){
                getAccountDetails(config)
                .then(function (response: any) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
            }   
        }
    }

    useEffect(() => {
        getName();
    });

    return(
        <NameDiv>
            <StyledName>{firstName}</StyledName>
        </NameDiv>
    );
};

export default UserAvatarDropdown;