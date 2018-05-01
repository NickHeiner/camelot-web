import React from 'react';

const arrowColor = 'black';
const Arrow = ({width, height, style}) => <svg 
  width={width} height={height} {...style}
  viewBox="0.0 0.0 709.7165354330708 100.0" fill="none" stroke="none" 
  strokeLinecap="square" strokeMiterlimit="10">

  <clipPath id="p.0">
    <path d="m0 0l709.71655 0l0 100.0l-709.71655 0l0 -100.0z" clipRule="nonzero"/>
  </clipPath>
  <g clipPath="url(#p.0)">
    <path fill="#000000" fillOpacity="0.0" d="m0 0l709.71655 0l0 100.0l-709.71655 0z" fillRule="evenodd"/>
    <path fill="#000000" fillOpacity="0.0" d="m12.582677 46.727036l691.937 -0.724411" fillRule="evenodd"/>
    <path stroke={arrowColor} strokeWidth="12.0" 
      strokeLinejoin="round" strokeLinecap="butt" d="m12.582677 46.727036l619.937 -0.6490326" fillRule="evenodd"/>
    <path fill={arrowColor} stroke={arrowColor} strokeWidth="12.0" strokeLinecap="butt" 
      d="m632.54047 65.89878l54.4364 -19.877789l-54.477905 -19.763767z" fillRule="evenodd"/>
  </g>
</svg>;

export default Arrow;
