import React from "react";

// Copy pasting the SVG data into here and using in conjunction with
// material-ui SvgIcon allows the use of custom colours for the
// SVG shape

const UploadIcon = () => {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <title />
      <g data-name="41-Inbox" id="_41-Inbox">
        <path d="M46,30.18A3,3,0,0,0,45,30H33a1,1,0,0,0-1,1v5H16V31a1,1,0,0,0-1-1H3a3,3,0,0,0-1,.18V3A1,1,0,0,1,3,2H22V0H3A3,3,0,0,0,0,3V45a3,3,0,0,0,3,3H45a3,3,0,0,0,3-3V26H46ZM46,45a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V33a1,1,0,0,1,1-1H14v4H10v2H38V36H34V32H45a1,1,0,0,1,1,1Z" />
        <path d="M35,26A13,13,0,1,0,22,13,13,13,0,0,0,35,26ZM35,2A11,11,0,1,1,24,13,11,11,0,0,1,35,2Z" />
        <path d="M34,8.41V16a.92.92,0,0,1-1,1H31v2h2a2.92,2.92,0,0,0,3-3V8.41l2.29,2.29,1.41-1.41-4-4a1,1,0,0,0-1.41,0l-4,4,1.41,1.41Z" />
      </g>
    </svg>
  );
};

const FormIcon = () => {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <title />
      <g data-name="3-Online Document" id="_3-Online_Document">
        <path d="M43,0H5A5,5,0,0,0,0,5V43a5,5,0,0,0,5,5H17V46H5a3,3,0,0,1-3-3V9H46v9h2V5A5,5,0,0,0,43,0Zm3,7H2V5A3,3,0,0,1,5,2H43a3,3,0,0,1,3,3Z" />
        <path d="M40.71,16.29A1,1,0,0,0,40,16H23a3,3,0,0,0-3,3V45a3,3,0,0,0,3,3H45a3,3,0,0,0,3-3V24a1,1,0,0,0-.29-.71ZM41,19.41,44.59,23H42a1,1,0,0,1-1-1ZM46,45a1,1,0,0,1-1,1H23a1,1,0,0,1-1-1V19a1,1,0,0,1,1-1H39v4a3,3,0,0,0,3,3h4Z" />
        <rect height="2" width="10" x="26" y="28" />
        <rect height="2" width="16" x="26" y="34" />
        <rect height="2" width="16" x="26" y="40" />
      </g>
    </svg>
  );
};

const LogoTextIcon = () => {
  return (
    <svg
      width="68"
      height="20"
      viewBox="0 0 68 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.78938 0.783998H6.30138V13.12C6.30138 17.008 5.02938 18.016 2.79738 18.016C2.00538 18.016 1.35738 17.872 0.901376 17.68L0.637376 18.88C1.11738 19.096 2.02938 19.288 2.84538 19.288C5.53338 19.288 7.78938 17.944 7.78938 13.36V0.783998ZM22.4472 2.32C22.4472 1.672 22.0152 1.144 21.3432 1.144C20.6952 1.144 20.2152 1.696 20.2152 2.32C20.2152 2.968 20.6712 3.52 21.3192 3.52C21.9672 3.52 22.4472 3.04 22.4472 2.32ZM22.0632 6.016H20.5752V19H22.0632V6.016ZM45.2545 11.128C45.2545 6.448 42.1345 5.704 40.7905 5.704C38.7025 5.704 37.1425 6.88 36.4465 8.272H36.3985L36.2785 6.016H34.9345C34.9825 7.024 35.0305 7.936 35.0305 9.184V19H36.5185V10.96C36.5185 8.896 38.1745 6.952 40.3585 6.952C42.9265 6.952 43.7665 9.016 43.7665 11.32V19H45.2545V11.128ZM65.2879 5.992L63.2239 9.088C62.7199 9.808 62.2399 10.504 61.7839 11.296H61.7119C61.2319 10.504 60.7999 9.856 60.2959 9.088L58.1839 5.992H56.5279L60.9199 12.352L56.2639 19H57.9439L60.0799 15.784C60.6559 14.92 61.1599 14.2 61.6159 13.36H61.6639C62.1919 14.224 62.6479 14.992 63.1999 15.784L65.3839 19H67.0879L62.5279 12.328L66.9439 5.992H65.2879Z"
        fill="#EEEEEE"
      />
    </svg>
  );
};

export { UploadIcon, FormIcon, LogoTextIcon };
