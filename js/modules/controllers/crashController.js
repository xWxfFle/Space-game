export default function crashWith(firstComponent, secondComponent) {
    var crash = true;
    if (firstComponent.y + firstComponent.height - 12 < secondComponent.y ||
        firstComponent.y + 12 > secondComponent.y + secondComponent.height ||
        firstComponent.x + firstComponent.width - 12 < secondComponent.x ||
        firstComponent.x + 12 > secondComponent.x + secondComponent.width) {
        crash = false;
    }
    return crash;
}
