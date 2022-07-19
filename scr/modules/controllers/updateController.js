function updateComponent(component, context) {
  context.fillStyle = component.color;
  context.fillRect(component.x, component.y, component.width, component.height);
}

function updateImage(image, context) {
  context.drawImage(image.image, image.x, image.y, image.width, image.height);
  context.drawImage(
    image.image,
    image.x,
    image.y + image.height,
    image.width,
    image.height
  );
}

function updateText(text, context) {
  context.font = text.width + " " + text.height;
  context.fillStyle = text.color;
  context.fillText(text.text, text.x, text.y);
}

export {
  updateComponent as component,
  updateImage as image,
  updateText as text,
};
