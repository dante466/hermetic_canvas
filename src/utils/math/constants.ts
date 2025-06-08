export const SACRED = {
  PHI: 1.618033988749895, // Golden ratio
  PI: Math.PI,
  E: Math.E,
  
  // Sacred angles in radians
  ANGLES: {
    TRIANGLE: (2 * Math.PI) / 3,
    SQUARE: Math.PI / 2,
    PENTAGON: (2 * Math.PI) / 5,
    HEXAGON: Math.PI / 3,
    OCTAGON: Math.PI / 4,
    ENNEAGON: (2 * Math.PI) / 9,
    DODECAGON: Math.PI / 6
  },
  
  // Platonic solids vertices
  SOLIDS: {
    TETRAHEDRON: 4,
    CUBE: 8,
    OCTAHEDRON: 6,
    DODECAHEDRON: 20,
    ICOSAHEDRON: 12
  },
  
  // Fibonacci sequence generator
  fibonacci: function* (n: number = Infinity) {
    let [a, b] = [0, 1]
    for (let i = 0; i < n; i++) {
      yield a;
      [a, b] = [b, a + b]
    }
  },
  
  // Sacred geometry patterns
  flowerOfLife: (radius: number, circles: number = 7) => {
    const points = []
    for (let i = 0; i < circles; i++) {
      const angle = (i / circles) * Math.PI * 2
      points.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      })
    }
    return points
  }
} 