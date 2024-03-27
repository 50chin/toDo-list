const formNode = document.querySelector('form');
const inputNode = document.querySelector('.toDo__input');
const btnAddNode = document.querySelector('.toDo__btn-add');
const listsNode = document.querySelector('.toDo__lists');
const buttonsNode = document.querySelector('.toDo__buttons');

btnAddNode.addEventListener('click', inputHandler);
formNode.addEventListener('submit', inputHandler);

let toDo = [];

function inputHandler(evt) {
  evt.preventDefault();
  toDo.push(inputNode.value);
  inputNode.value = '';
  renderToDo(toDo);
}

function renderToDo(toDo) {
  listsNode.style.display = 'block';
  listsNode.innerHTML = '';

  toDo.forEach((el, i) => {
    const list = document.createElement('div');
    list.className = 'toDo__list';
    list.innerHTML = `
    <input class="toDo__check" type="checkbox">
    <p class="toDo__text">${el}</p>
    <button class="toDo__button">❌</button>
    `;
    listsNode.append(list);
    const btnDelete = document.querySelectorAll('.toDo__button');
    console.log(btnDelete);
  });
}
