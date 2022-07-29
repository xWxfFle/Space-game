export default function crashWith(firstComponent, secondComponent) {
  let crash = true;
  if (
    firstComponent.y + firstComponent.height < secondComponent.y ||
    firstComponent.y > secondComponent.y + secondComponent.height ||
    firstComponent.x + firstComponent.width < secondComponent.x ||
    firstComponent.x > secondComponent.x + secondComponent.width 
  ) {
    crash = false;
  }
  return crash;
}
