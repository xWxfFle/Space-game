export default function createAsteroid(containerWidth) {
  const size = 60;
  let x = Math.floor(Math.random() * (containerWidth - size + 1));
  return [size, size, "/scr/img/asteroid.png", x, -size, "image"];
}
