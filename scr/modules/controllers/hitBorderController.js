export default function hitBorder(component, canvas) {
  const bottomBorder = canvas.height - component.height;
  const topBorder = 0;
  const leftBorder = 0;
  const rightBorder = canvas.width - component.width;

  if (component.y > bottomBorder) {
    component.y = bottomBorder;
  }
  if (component.y < topBorder) {
    component.y = topBorder;
  }
  if (component.x > rightBorder) {
    component.x = leftBorder;
  }
  if (component.x < leftBorder) {
    component.x = rightBorder;
  }
}
