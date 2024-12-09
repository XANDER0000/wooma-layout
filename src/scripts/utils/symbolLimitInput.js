// обрезает текст в поле input до максимального количества maxLength
//  и отображает его число в spanTextContent
const symbolLimitInput = (maxLength, e, input, spanTextContent) => {
  let valueInput = e.target.value;
  if (valueInput.length > maxLength) {
    valueInput = valueInput.substring(0, maxLength);
    input.value = valueInput;
  }spanTextContent.textContent = `${valueInput.length}/${maxLength}`;
};

export default symbolLimitInput;
