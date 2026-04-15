let tableData = JSON.parse(localStorage.getItem("tableData")) || [];

function addRow() {
  let row = {
    date: new Date().toLocaleDateString(),
    tag: "",
    location: "",
    status: "",
    remarks: "",
    shift: ""
  };

  tableData.push(row);
  save();
}

function save() {
  localStorage.setItem("tableData", JSON.stringify(tableData));
  render();
}

function render() {
  let tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  tableData.forEach((r, i) => {
    tbody.innerHTML += `
    <tr>
      <td>${i+1}</td>
      <td contenteditable>${r.date}</td>
      <td contenteditable>${r.tag}</td>
      <td contenteditable>${r.location}</td>
      <td contenteditable>${r.status}</td>
      <td contenteditable>${r.remarks}</td>
      <td contenteditable>${r.shift}</td>
      <td><button onclick="deleteRow(${i})">❌</button></td>
    </tr>`;
  });
}

function deleteRow(i){
  tableData.splice(i,1);
  save();
}

render();
