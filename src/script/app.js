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

function addToDo(text) {
  toDo.push({
    id: new Date().getTime(),
    text: text,
    done: false,
  });
}

function inputHandler(evt) {
  evt.preventDefault();
  if (inputNode.value.trim()) {
    addToDo(inputNode.value);
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
  let value = text;
  // Метод по массиву ТуДу
  const list = document.createElement('li');
  list.className = 'toDo__list';
  list.innerHTML = `
    <div class="toDo__left">
    <input class="toDo__check" type="checkbox">
    <p class="toDo__text">${value}</p>
    </div>
     <div class="toDo__right">
    <button class="toDo__btn-edit">✏️</button>
    <button class="toDo__btn-done" style="display:none">✅</button>
    <button class="toDo__btn-cross">🗑</button>
    </div>
    `;

  const btnEditNode = list.querySelector('.toDo__btn-edit');
  const btnDoneNode = list.querySelector('.toDo__btn-done');
  const toDoTextNode = list.querySelector('.toDo__text');

  // При нажатии редактировать текст
  btnEditNode.addEventListener('click', () => {
    btnEditNode.style.display = 'none';
    btnDoneNode.style.display = 'block';
    toDoTextNode.innerHTML = `
    <form action="" class="toDo__form-edit">
    <input 
      class="toDo__input-edit"
      type="text"
      value="${value}"
    />
    </form>`;
    const toDoFormEditNode = toDoTextNode.querySelector('.toDo__form-edit');
    const toDoInputEditNode = toDoTextNode.querySelector('.toDo__input-edit');
    toDoFormEditNode.addEventListener('submit', (evt) => {
      evt.preventDefault();
      editText();
    });
    // Фокус на Input
    toDoInputEditNode.focus();
    let endText = toDoInputEditNode.value.length; // получаем длину текста в инпуте
    toDoInputEditNode.setSelectionRange(endText, endText); // устанавливаем курсор в конец текста

    // При нажатии на кнопку Done ✅
    btnDoneNode.addEventListener('click', editText);

    function editText() {
      btnEditNode.style.display = 'block';
      btnDoneNode.style.display = 'none';
      const newValue = toDoInputEditNode.value;
      if (!newValue.trim()) {
        toDoTextNode.innerHTML = value;
      } else {
        toDoTextNode.innerHTML = newValue;
        value = newValue;
        editTextSave(id);
      }
    }

    //Функция по изменению текста завершенных
    function editTextSave(id) {
      toDo = toDo.forEach((el) => {
        if (el.id == id) {
          el.text = value;
        } else {
          value = value;
        }
        renderToDo(toDo);
      });
    }
  });

  const btnDeleteCrossNode = list.querySelector('.toDo__btn-cross');

  btnDeleteCrossNode.addEventListener('click', () => {
    btnDeleteCrossHandler(id);
  });

  const checkboxNode = list.querySelector('.toDo__check');
  checkboxNode.checked = done;
  checkboxNode.addEventListener('change', () => checkboxChecked(id));
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
  const check = toDo.find((el) => el.id === id);
  console.log(check.id);
  // if (check) {
  //   check.done = !check.done;
  //   filterFinish(check.id);
  // } else {
  //   filterFinish(id);
  // }
}
btnDelNode.addEventListener('click', deleteFinish);
// Функция удаления завершенных
function deleteFinish() {
  toDo = toDo.filter((el) => !el.done);
  renderToDo(toDo);
}
//  Функция по удалению клик на крестик 🗑
function btnDeleteCrossHandler(id) {
  toDo = toDo.filter((el) => el.id != id);
  renderToDo(toDo);
}

//Функция по фильтру завершенных
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
