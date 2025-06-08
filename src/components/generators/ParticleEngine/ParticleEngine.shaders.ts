export const particleVertexShader = /* glsl */`
  attribute float size;
  attribute float life;

  varying vec3 vColor;
  varying float vLife;

  void main() {
    vColor = color;
    vLife = life;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const particleFragmentShader = /* glsl */`
  varying vec3 vColor;
  varying float vLife;

  void main() {
    if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
    float alpha = vLife * 0.5; // Simple linear fade
    gl_FragColor = vec4(vColor, alpha);
  }
`; 