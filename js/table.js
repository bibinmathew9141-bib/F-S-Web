// ===== LOAD DATA =====
let tableData = JSON.parse(localStorage.getItem("filteredData")) ||
                JSON.parse(localStorage.getItem("tableData")) || [];

// ===== SAVE TO LOCALSTORAGE =====
function saveData() {
  localStorage.setItem("tableData", JSON.stringify(tableData));
}

// ===== ADD ROW =====
function addRow() {
  let row = {
    date: getTodayDate(),
    tag: "",
    location: "",
    status: "",
    remarks: "",
    shift: ""
  };

  tableData.push(row);
  saveData();
  render();
}

// ===== DELETE ROW =====
function deleteRow(index) {
  tableData.splice(index, 1);
  saveData();
  render();
}

// ===== UPDATE DATA WHEN EDITING =====
function updateCell(index, field, value) {
  tableData[index][field] = value;
  saveData();
}

// ===== RENDER TABLE =====
function render() {
  let tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  tableData.forEach((r, i) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${i+1}</td>
      <td contenteditable oninput="updateCell(${i}, 'date', this.innerText)">${r.date}</td>
      <td contenteditable oninput="updateCell(${i}, 'tag', this.innerText)">${r.tag}</td>
      <td contenteditable oninput="updateCell(${i}, 'location', this.innerText)">${r.location}</td>
      <td contenteditable oninput="updateCell(${i}, 'status', this.innerText)">${r.status}</td>
      <td contenteditable oninput="updateCell(${i}, 'remarks', this.innerText)">${r.remarks}</td>
      <td contenteditable oninput="updateCell(${i}, 'shift', this.innerText)">${r.shift}</td>
      <td><button onclick="deleteRow(${i})">❌</button></td>
    `;

    tbody.appendChild(row);
  });
}

// ===== FILTER =====
function filterTable() {
  let input = document.getElementById("filter").value.toLowerCase();
  let rows = document.querySelectorAll("#dataTable tbody tr");

  rows.forEach(row => {
    let text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
}

// ===== INIT =====
render();
