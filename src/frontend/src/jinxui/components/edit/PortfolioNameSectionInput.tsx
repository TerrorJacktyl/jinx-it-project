import React from "react";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import { InputAdornment } from "@material-ui/core";

import CreateIcon from "@material-ui/icons/Create";

import {
  LinkDialog,
  LinkDisplayIcon,
  LinkEditMenu,
  PaperSectionStatic,
  OneColumnSectionDiv,
} from "jinxui";

import {
  TLinkData,
} from "jinxui/types";


const LinksDiv = styled.div`
  display: flex;
  align-items: center;
  flex-flow: wrap;
`;


type TDisplayLinks = {
  links: any,
  setLinks: any,
}

const DisplayLinks = (props: TDisplayLinks) => {
  return (
    <>
      {props.links.map((link: TLinkData) => {
        if (link) {
          return (
            <LinkEditMenu
              key={link.id}
              link={link}
              links={props.links}
              setLinks={props.setLinks}
            />
          );
        }
      })}
    </>
  );
};

type TPortfolioNameSection = {
  title: string,
  children: any,
}

// const PortfolioNameSection = (props: TPortfolioNameSection) => {
//   return (
//     <PaperSectionStatic title={props.title}>
//       <OneColumnSectionDiv>
//         <TextField
//           name={"portfolioName"}
//           label={"Portfolio Name"}
//           defaultValue={portfolio.name}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//             setPortfolio({
//               ...portfolio,
//               name: e.target.value,
//             });
//           }}
//           id="standard-full-width"
//           fullWidth
//           color="secondary"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <CreateIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <p></p>
//         <LinksDiv>
//           <DisplayLinks />
//           <LinkDialog links={links} setLinks={setLinks} />
//         </LinksDiv>
//         {props.children}
//       </OneColumnSectionDiv>
//     </PaperSectionStatic>
//   );
// }

export default DisplayLinks