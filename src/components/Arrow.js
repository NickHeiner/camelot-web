import React from 'react';

const Arrow = ({width, height}) => <svg 
  width={width} height={height} 
  viewBox="0.0 0.0 709.7165354330708 100.0" fill="none" stroke="none" 
  stroke-linecap="square" stroke-miterlimit="10">

  <clipPath id="p.0">
    <path d="m0 0l709.71655 0l0 100.0l-709.71655 0l0 -100.0z" clip-rule="nonzero"/>
  </clipPath>
  <g clip-path="url(#p.0)">
    <path fill="#000000" fill-opacity="0.0" d="m0 0l709.71655 0l0 100.0l-709.71655 0z" fill-rule="evenodd"/>
    <path fill="#000000" fill-opacity="0.0" d="m12.582677 46.727036l691.937 -0.724411" fill-rule="evenodd"/>
    <path stroke="red" stroke-width="12.0" 
      stroke-linejoin="round" stroke-linecap="butt" d="m12.582677 46.727036l619.937 -0.6490326" fill-rule="evenodd"/>
    <path fill="red" stroke="red" stroke-width="12.0" stroke-linecap="butt" 
      d="m632.54047 65.89878l54.4364 -19.877789l-54.477905 -19.763767z" fill-rule="evenodd"/>
  </g>
</svg>;

export default Arrow;
