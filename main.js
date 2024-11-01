
const elems = document.getElementById('elems')
const addElem  = () => {
  const elem = document.createElement('div')
  elem.className = 'elem'
  elems.appendChild(elem)
};

const generateCharacter = () => {
  return String.fromCharCode(Math.floor(Math.random() * (91 - 65) + 65))
}

const generateString = () => {
  const stringLength = Math.round(Math.random() * (10 - 5) + 5)
  let randomString = ""
  for (let i = 0; i < stringLength; i++){
    randomString += generateCharacter()
  }
  return randomString
}

const attachStringToRandomElement = () => {
  const chosenElemIndex = Math.floor(Math.random() * elems.children.length)
  if (elems.children[chosenElemIndex].children.length === 9) return
  const span = document.createElement("span")
  span.className = "text"
  span.textContent = generateString()
  elems.children[chosenElemIndex].appendChild(span)
}

const interval = setInterval(() => {
  if (elems.children.length < 20) addElem()
  else (clearInterval(interval))
}, 200);

setInterval(() => {
  if (elems.children.length) attachStringToRandomElement()
}, 100);

/**
 * 
 * @param {HTMLElement} element 
 */
const attachClassToNode = (element) => {
  element.classList.add('add-captured')
  setTimeout(( ) => {
    element.classList.remove('add-captured')
  }, 200) 
}

// Create an observer instance
const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') { 
      for(let node of mutation.addedNodes) {
        if (node.nodeName === "SPAN") {
          attachClassToNode(node.parentElement)
        }
      }
    }
  }
});

// Start observing the `texts` element for child node changes
if (elems) {
  observer.observe(elems, {
    childList: true,    // Watch for changes to the child nodes
    attributes: false,  // Not observing attribute changes
    subtree: true      // Only observe direct children, not nested elements
  });
}