const formNode = document.querySelector('form');
const inputNode = document.querySelector('.toDo__input');
const btnAddNode = document.querySelector('.toDo__btn-add');
const listsNode = document.querySelector('.toDo__lists');
const toDoBottomNode = document.querySelector('.toDo__bottom');
const buttonsNode = document.querySelector('.toDo__buttons');
const btnDelNode = document.querySelector('.toDo__btn-deleteFin');
const btnDelAllNode = document.querySelector('.toDo__btn-deleteAll');
const toDoAddListsNode = document.querySelector('.toDo_add-lists');

let toDo = JSON.parse(localStorage.getItem('toDo-lists')) ?? [];

btnDelAllNode.addEventListener('click', btnDelAllHandler);

function btnDelAllHandler() {
  toDo = [];
  renderToDo(toDo);
  toDoAddListsNode.style.display = 'none';
  toDoBottomNode.style.display = 'none';
}
btnAddNode.addEventListener('click', inputHandler);
formNode.addEventListener('submit', inputHandler);

function inputHandler(evt) {
  evt.preventDefault();
  if (inputNode.value.trim()) {
    toDo.push({
      id: new Date().getTime(),
      text: inputNode.value,
      done: false,
    });
  } else {
    return;
  }
  inputNode.value = '';
  renderToDo(toDo);
  listsNode.scrollTop = -listsNode.scrollHeight;
}
//функция на скрытие кнопок
function hiddenBtn() {
  if (!toDo.length) {
    toDoAddListsNode.style.display = 'none';
    toDoBottomNode.style.display = 'none';
  } else {
    toDoAddListsNode.style.display = 'block';
    toDoBottomNode.style.display = 'block';
  }
}
// Функция рендерится ТуДушка
function createToDo({ id, text, done }) {
  // Метод по массиву ТуДу
  const list = document.createElement('li');
  list.className = 'toDo__list';
  list.innerHTML = `
    <span class="toDo__left">
    <input class="toDo__check" type="checkbox">
    <p class="toDo__text">${text}</p>
    </span>
    <button class="toDo__btn-cross">❌</button>
    `;

  const btnDeleteCrossNode = list.querySelector('.toDo__btn-cross');
  btnDeleteCrossNode.addEventListener('click', () => {
    btnDeleteCrossHandler(id);
  });

  const checkboxNode = list.querySelector('.toDo__check');
  checkboxNode.checked = done;
  checkboxNode.addEventListener('change', () => {
    checkboxChecked(id);
  });
  return list;
}

function renderToDo(toDo) {
  listsNode.innerHTML = '';
  toDo.forEach((el) => {
    const create = createToDo(el);
    listsNode.append(create);
  });
  hiddenBtn();
  localStorage.setItem('toDo-lists', JSON.stringify(toDo));
}
renderToDo(toDo);
// Функция изменения Done
function checkboxChecked(id) {
  const check = toDo.find((el) => el.id == id);
  check.done = !check.done;
}
btnDelNode.addEventListener('click', deleteFinish);
// Функция удаления завершенных
function deleteFinish() {
  toDo = toDo.filter((el) => !el.done);
  renderToDo(toDo);
}
//  Функция по удалению клик на крестик
function btnDeleteCrossHandler(id) {
  toDo = toDo.filter((el) => el.id != id);
  renderToDo(toDo);
}

//Функция по фильтру завершеных
function filterFinish(id) {
  toDo = toDo.forEach((el) => {
    if (el.id == id) {
      el.done = !el.done;
    } else {
      el.done = el.done;
    }
    renderToDo(toDo);
  });
}
