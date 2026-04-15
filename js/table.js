let tableData = JSON.parse(localStorage.getItem("filteredData")) ||
                JSON.parse(localStorage.getItem("tableData")) || [];

// ================= ADD ROW =================
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
  localStorage.setItem("tableData", JSON.stringify(tableData));
  render();
}

// ================= DELETE =================
function deleteRow(index) {
  tableData.splice(index, 1);
  localStorage.setItem("tableData", JSON.stringify(tableData));
  render();
}

// ================= RENDER =================
function render() {
  let tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  tableData.forEach((r, i) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${i+1}</td>
      <td contenteditable="true">${r.date}</td>
      <td contenteditable="true">${r.tag}</td>
      <td contenteditable="true">${r.location}</td>
      <td contenteditable="true">${r.status}</td>
      <td contenteditable="true">${r.remarks}</td>
      <td contenteditable="true">${r.shift}</td>
      <td><button onclick="deleteRow(${i})">❌</button></td>
    `;

    tbody.appendChild(row);
  });
}

// ================= FILTER =================
function filterTable() {
  let input = document.getElementById("filter").value.toLowerCase();
  let rows = document.querySelectorAll("#dataTable tbody tr");

  rows.forEach(row => {
    let text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
}

// ================= INIT =================
render();
