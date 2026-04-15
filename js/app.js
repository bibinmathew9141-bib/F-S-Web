// ===== GET ALL DATA =====
function getAllData() {
  return JSON.parse(localStorage.getItem("tableData")) || [];
}

// ===== SAVE DATA =====
function saveAllData(data) {
  localStorage.setItem("tableData", JSON.stringify(data));
}

// ===== FORMAT DATE (IMPORTANT) =====
function getTodayDate() {
  let today = new Date();
  return today.getFullYear() + "-" +
    String(today.getMonth()+1).padStart(2,'0') + "-" +
    String(today.getDate()).padStart(2,'0');
}

// ===== GET MONTH LIST =====
function getMonthlyList() {
  let data = getAllData();
  let months = {};

  data.forEach(d => {
    if (!d.date) return;
    let parts = d.date.split("-");
    let key = parts[0] + "-" + parts[1]; // YYYY-MM
    months[key] = true;
  });

  return Object.keys(months);
}

// ===== GET YEAR LIST =====
function getYearlyList() {
  let data = getAllData();
  let years = {};

  data.forEach(d => {
    if (!d.date) return;
    let year = d.date.split("-")[0];
    years[year] = true;
  });

  return Object.keys(years);
}

// ===== FILTER BY MONTH =====
function getDataByMonth(month) {
  let data = getAllData();
  return data.filter(d => d.date.startsWith(month));
}

// ===== FILTER BY YEAR =====
function getDataByYear(year) {
  let data = getAllData();
  return data.filter(d => d.date.startsWith(year));
}

// ===== SHOW MONTH BUTTONS =====
function loadMonthlyPage() {
  let container = document.getElementById("list");
  container.innerHTML = "<h2>Monthly Data</h2>";

  let months = getMonthlyList();

  if (months.length === 0) {
    container.innerHTML += "<p>No data available</p>";
    return;
  }

  months.forEach(m => {
    let btn = document.createElement("button");
    btn.innerText = m;
    btn.onclick = () => showMonthData(m);
    container.appendChild(btn);
  });
}

// ===== SHOW MONTH DATA =====
function showMonthData(month) {
  let data = getDataByMonth(month);
  localStorage.setItem("filteredData", JSON.stringify(data));
  window.location.href = "table.html";
}

// ===== SHOW YEAR BUTTONS =====
function loadYearlyPage() {
  let container = document.getElementById("list");
  container.innerHTML = "<h2>Yearly Data</h2>";

  let years = getYearlyList();

  if (years.length === 0) {
    container.innerHTML += "<p>No data available</p>";
    return;
  }

  years.forEach(y => {
    let btn = document.createElement("button");
    btn.innerText = y;
    btn.onclick = () => showYearData(y);
    container.appendChild(btn);
  });
}

// ===== SHOW YEAR DATA =====
function showYearData(year) {
  let data = getDataByYear(year);
  localStorage.setItem("filteredData", JSON.stringify(data));
  window.location.href = "table.html";
}
