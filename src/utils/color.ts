import * as THREE from 'three';

const hexToColor = (hex: string) => new THREE.Color(hex);

export const colorPalettes = {
  sacredFire: [
    '#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'
  ].map(hexToColor),
  
  chakra: [
    '#FF0000', // Root - Red
    '#FF7F00', // Sacral - Orange
    '#FFFF00', // Solar Plexus - Yellow
    '#00FF00', // Heart - Green
    '#0000FF', // Throat - Blue
    '#4B0082', // Third Eye - Indigo
    '#8F00FF'  // Crown - Violet
  ].map(hexToColor),

  goldenRatio: [
    '#F3E5AB', '#DEB887', '#C48A5A', '#AB5C2D', '#922E00'
  ].map(hexToColor),
  
  elemental: [
    '#A52A2A', // Earth - Brown
    '#0000FF', // Water - Blue
    '#FF4500', // Fire - OrangeRed
    '#87CEEB', // Air - SkyBlue
  ].map(hexToColor),
};

export type ColorPalette = keyof typeof colorPalettes; 