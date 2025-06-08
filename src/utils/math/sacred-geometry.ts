// Fibonacci sequence generator
export function* fibonacci(n: number = Infinity) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Sacred geometry patterns
export const flowerOfLife = (radius: number, circles: number = 7) => {
  const points = [];
  for (let i = 0; i < circles; i++) {
    const angle = (i / circles) * Math.PI * 2;
    points.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    });
  }
  return points;
}; 