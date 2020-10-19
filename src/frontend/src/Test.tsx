import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Block } from "@material-ui/icons";
import styled from "styled-components";

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
});

function ClassesNesting() {
  const classes = useStyles();

  return (
    <Block classes={{
      root: classes.root, // class name, e.g. `classes-nesting-root-x`
      // label: classes.label, // class name, e.g. `classes-nesting-label-x`
    }}>
      <Button
      >
        classes nesting
    </Button>
    </Block>
  );
}

const Li = styled.li`
scroll-snap-align: start;

border-bottom: 1px solid white;
padding: 3rem;
font-size: 1.4rem;
color: rgba(white, .5);
background: lightgray;
text-align: center;
display: flex;
flex-flow: column;
justify-content: center;
`

const Snap = styled.div`
flex-basis: 50%;
max-height: 100vh;
border: 1px solid gray;
overflow-y: scroll;
scroll-snap-type: y mandatory;
&.proximity {
        scroll-snap-type: y proximity;
}
`

export default function Test() {
  return (
    <ul>
      <Li>Lorem, ipsum dolor.</Li>
      <Li>Doloremque, maxime id.</Li>
      <Li>MolLitia, qui beatae?</Li>
      <Li>Sit, fuga repellendus!</Li>
      <Li>Reiciendis, commodi asperiores?</Li>
      <Li>Dicta, deleniti tempore?</Li>
      <Li>Recusandae, rerum numquam.</Li>
      <Li>Cumque, quos eveniet?</Li>
      <Li>Accusamus, Libero in.</Li>
      <Li>Reprehenderit, minus debitis.</Li>
      <Li>Minima, dolores nobis?</Li>
      <Li>Iure, consequatur illum!</Li>
      <Li>Atque, nostrum Libero!</Li>
      <Li>Minima, porro veritatis?</Li>
      <Li>ExpLicabo, non itaque.</Li>
      <Li>Quidem, molLitia porro.</Li>
      <Li>Maiores, recusandae voluptatem.</Li>
      <Li>Inventore, autem cupiditate?</Li>
      <Li>Illum, reprehenderit quos.</Li>
      <Li>Sapiente, obcaecati faciLis.</Li>
    </ul>
  )
}