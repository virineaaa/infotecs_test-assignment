let rIndex
let tableBody = document.querySelector(".tableData")
const table = document.querySelector("table")
const thead = document.querySelector("thead")
let showForm = document.querySelector(".formOff")

const eyeColorStyle = {
  "blue": "#4682B4",
  "brown": "#8B4513",
  "red": "#FF0000",
  "green": "#008000",
}

//Получение данных
let data = JSON.parse(jsonString);
let personData = data.list;

function initTable() {
  if (!personData || !personData.length) return

  initTableData();
  initForm();

  function initTableData() {
    tableBody.innerHTML = "";
    //Создание строк и столбцов. Добаление данных
    for (let index = 0; index < personData.length; index++) {
      let dataHtml = `<tr class="tr">
                        <td class="td firstNameItem">${personData[index].name.firstName}</td>
                        <td class="td lastNameItem">${personData[index].name.lastName}</td>
                        <td class="td-clamp aboutItem">${personData[index].about}</td>
                        <td class="td bi" >${personData[index].eyeColor}
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="${eyeColorStyle[personData[index].eyeColor]}" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                            </svg>
                        </td>
                  </tr>`
      tableBody.innerHTML += dataHtml
    }
  }
}

//Функция инициализации формы
function initForm() {

  let showForm = document.querySelector(".formOff")

  const rows = [...tableBody.rows]
  dataHtml = [...thead.querySelectorAll(".th")]

  //Заполнение формы данными строки
  for (let index = 0; index < personData.length; index++) {
    tableBody.rows[index].onclick = function () {
      showForm.classList.toggle("formOn")
      rIndex = this.rowIndex
      document.getElementById("firstName").value = this.getElementsByTagName("td")[0].innerHTML
      document.getElementById("lastName").value = this.getElementsByTagName("td")[1].innerHTML
      document.getElementById("about").value = this.getElementsByTagName("td")[2].innerHTML
      document.getElementById("eyeColor").value = this.getElementsByTagName("td")[3].textContent.replace(/\s/g, '')
    }
  }
}

//Функция сортировки таблицы по колонкам
function sortTableByColumn(n, event) {
  const tableBody = table.querySelector("tbody")
  const rows = [...tableBody.rows]
  dataHtml = [...thead.querySelectorAll(".th")]
  desc = false

  //Прямая и обратная сортировка
  dataHtml.map((head) => {
    if (head != event) {
      head.classList.remove("asc", "desc")
    }
  })

  desc = event.classList.contains("asc") ? true : false
  event.classList[desc ? "remove" : "add"]("asc")
  event.classList[desc ? "add" : "remove"]("desc")

  //Сортировка. Сравнение элементов строки
  tableBody.innerHTML = ""
  rows.sort((rowA, rowB) => {
    let x = rowA.getElementsByTagName("td")[n].innerHTML.toLocaleLowerCase()
    let y = rowB.getElementsByTagName("td")[n].innerHTML.toLocaleLowerCase()
    return desc ? (x < y ? 1 : -1) : (x < y ? -1 : 1)
  })
  rows.map((row) => {
    tableBody.appendChild(row)
  })
}

document.addEventListener("DOMContentLoaded", initTable)