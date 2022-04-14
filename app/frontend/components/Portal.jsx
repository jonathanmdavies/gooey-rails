import { createPortal } from "react-dom";

// Creates a a div for the portal on the document body
function createWrapperAndAppendToBody(wrapperId) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

function ReactPortal({ children, wrapperId = "portal" }) {
  let element = document.getElementById(wrapperId);
  // if element is not found with wrapperId,
  // create and append to body
  if (!element) {
    element = createWrapperAndAppendToBody(wrapperId);
  }

  return createPortal(children, element);
}

export default ReactPortal;
