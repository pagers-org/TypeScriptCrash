import styled, { createGlobalStyle, css } from 'styled-components';
import palette from './lib/styles/palette';

export const theme = {
  gray: palette.gray,
  red: palette.red,
  pink: palette.pink,
  grape: palette.grape,
  violet: palette.violet,
  indigo: palette.indigo,
  blue: palette.blue,
  cyan: palette.cyan,
  teal: palette.teal,
  green: palette.green,
  lime: palette.lime,
  yellow: palette.yellow,
  orange: palette.orange,
};

const resetCSS = css`
  /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
  */
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${resetCSS};

  body {
    font-family: 'Noto Sans KR', sans-serif;
    color: ${theme.gray[6]};
  }

  input, button {
    font-family: inherit;
    color: inherit;
  }

  * {
    box-sizing: border-box;
  }
`;

export const BaseLayout = styled.div`
  padding: 0 1rem;
  margin: 0 auto;
  min-width: 320px;
  max-width: 1320px;
`;