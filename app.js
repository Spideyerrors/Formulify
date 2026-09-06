// app.js — Formulify UI

const SELECT_OPTIONS = {
  "VLOOKUP::q": ["Marketing", "Operations", "Finance", "Sales"],
  "VLOOKUP::col": ["Budget", "Spend", "Owner"],
  "HLOOKUP::q": ["Jan", "Feb", "Mar", "Apr"],
  "HLOOKUP::row": ["Budget", "Actual"],
  "LOOKUP (Array)::q": ["A", "B", "C"],
  "CELL::t": ["address", "row", "col", "contents"],
  "DATEDIF::unit": [
    { v: "d", label: "Days" },
    { v: "m", label: "Months" },
    { v: "y", label: "Years" },
  ],
  "SUMIF::cat": ["Travel", "Software"],
  "COUNTIF::status": ["Overdue", "Paid", "Pending"],
  "TEXT::fmt": [
    { v: "currency", label: "Currency" },
    { v: "percent", label: "Percentage" },
    { v: "thousands", label: "Thousands separator" },
  ],
  "ERROR.TYPE::e": ["#NULL!", "#DIV/0!", "#VALUE!", "#REF!", "#NAME?", "#NUM!", "#N/A"],
  "AND::a": [{ v: "true", label: "TRUE" }, { v: "false", label: "FALSE" }],
  "AND::b": [{ v: "true", label: "TRUE" }, { v: "false", label: "FALSE" }],
  "OR::a": [{ v: "true", label: "TRUE" }, { v: "false", label: "FALSE" }],
  "OR::b": [{ v: "true", label: "TRUE" }, { v: "false", label: "FALSE" }],
  "NOT::a": [{ v: "true", label: "TRUE" }, { v: "false", label: "FALSE" }],
  "N::v": [{ v: "true", label: "TRUE" }, { v: "false", label: "FALSE" }],
  "ISLOGICAL::t": [{ v: "true", label: "TRUE" }, { v: "false", label: "FALSE" }],
  "ISERR::t": ["OK", "#DIV/0!", "#N/A"],
  "ISERROR::t": ["OK", "#DIV/0!", "#N/A"],
  "ISNA::t": ["OK", "#N/A"],
};

["DSUM", "DCOUNT", "DCOUNTA", "DAVERAGE", "DGET", "DMAX", "DMIN"].forEach((n) => {
  SELECT_OPTIONS[`${n}::dept`] = ["Finance", "Marketing"];
});

const byCategory = {};
FUNCTIONS.forEach((fn) => {
  byCategory[fn.category] = byCategory[fn.category] || [];
  byCategory[fn.category].push(fn);
});
const CATEGORY_ORDER = ["Financial", "Lookup & Reference", "Date & Time", "Aggregation", "Statistical", "Math", "Text", "Logical"];

const sidebar = document.getElementById("sidebar");
const landing = document.getElementById("landing");
const detail = document.getElementById("detail");
const searchInput = document.getElementById("search");
const searchCount = document.getElementById("searchCount");

function renderStats() {
  document.getElementById("landingHeadline").innerHTML = `${FUNCTIONS.length} Excel functions.<br>One place to look them up.`;
  const el = document.getElementById("landingStats");
  el.innerHTML = `
    <div><span class="stat-num">${FUNCTIONS.length}</span><span class="stat-label">functions covered</span></div>
    <div><span class="stat-num">${CATEGORY_ORDER.length}</span><span class="stat-label">categories</span></div>
    <div><span class="stat-num">100%</span><span class="stat-label">live, editable examples</span></div>
  `;
}

function renderSidebar(filterText) {
  sidebar.innerHTML = "";
  const q = (filterText || "").trim().toLowerCase();
  CATEGORY_ORDER.forEach((cat) => {
    const fns = (byCategory[cat] || []).filter((f) => !q || f.name.toLowerCase().includes(q));
    if (!fns.length) return;
    const group = document.createElement("div");
    group.className = "cat-group";
    group.innerHTML = `<div class="cat-title"><span>${cat}</span><span class="cat-count">${fns.length}</span></div>`;
    fns.forEach((fn) => {
      const btn = document.createElement("button");
      btn.className = "fn-btn";
      btn.textContent = fn.name;
      btn.dataset.name = fn.name;
      btn.addEventListener("click", () => showDetail(fn.name));
      group.appendChild(btn);
    });
    sidebar.appendChild(group);
  });
}

function fieldHTML(fnName, input) {
  const key = `${fnName}::${input.id}`;
  if (input.type === "select" && SELECT_OPTIONS[key]) {
    const opts = SELECT_OPTIONS[key]
      .map((o) => {
        const val = typeof o === "string" ? o : o.v;
        const label = typeof o === "string" ? o : o.label;
        const sel = String(val) === String(input.default) ? "selected" : "";
        return `<option value="${val}" ${sel}>${label}</option>`;
      })
      .join("");
    return `<div class="field"><label>${input.label}</label><select data-id="${input.id}" data-type="select">${opts}</select></div>`;
  }
  const type = input.type === "number" ? "number" : input.type === "date" ? "date" : "text";
  const step = input.type === "number" ? "any" : null;
  return `<div class="field"><label>${input.label}</label><input data-id="${input.id}" data-type="${input.type}" type="${type}" ${step ? `step="${step}"` : ""} value="${input.default}"></div>`;
}

function readInputs(fn, container) {
  const values = {};
  fn.inputs.forEach((input) => {
    const el = container.querySelector(`[data-id="${input.id}"]`);
    if (!el) return;
    if (input.type === "number") values[input.id] = parseFloat(el.value);
    else values[input.id] = el.value;
  });
  return values;
}

function recalc(fn, container) {
  const values = readInputs(fn, container);
  const result = runFormula(fn, values);
  const box = container.querySelector(".result-box");
  const val = container.querySelector(".result-value");
  box.classList.toggle("is-error", !result.ok);
  let display = result.value;
  if (typeof display === "number") {
    display = Number.isInteger(display) ? display.toString() : Number(display.toFixed(4)).toString();
  } else if (typeof display === "boolean") {
    display = display ? "TRUE" : "FALSE";
  }
  val.textContent = display;
}

function showDetail(name) {
  const fn = FUNCTIONS.find((f) => f.name === name);
  if (!fn) return;
  landing.hidden = true;
  detail.hidden = false;

  document.querySelectorAll(".fn-btn").forEach((b) => b.classList.toggle("active", b.dataset.name === name));

  const inputsHTML = fn.inputs.length
    ? fn.inputs.map((i) => fieldHTML(fn.name, i)).join("")
    : `<p style="color:var(--ink-soft); font-size:13.5px;">This function takes no inputs — the result updates on its own.</p>`;

  detail.innerHTML = `
    <div class="detail-head">
      <div class="detail-cat">${fn.category}</div>
      <h1 class="detail-title">${fn.name}</h1>
      <p class="detail-desc">${fn.desc}</p>
    </div>
    <div class="detail-grid">
      <div>
        <div class="syntax-box">${fn.syntax}</div>
        ${fn.note === "text" ? "" : ""}
      </div>
      <div class="tryit">
        <div class="tryit-title"><span>TRY IT</span><span>live example</span></div>
        <form id="tryitForm">${inputsHTML}</form>
        <div class="result-box">
          <div class="result-label">Result</div>
          <div class="result-value">—</div>
        </div>
      </div>
    </div>
  `;

  const form = detail.querySelector("#tryitForm");
  const panel = detail.querySelector(".tryit");
  form.addEventListener("input", () => recalc(fn, panel));
  form.addEventListener("change", () => recalc(fn, panel));
  recalc(fn, panel);

  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  history.replaceState(null, "", `#${encodeURIComponent(fn.name)}`);
}

searchInput.addEventListener("input", (e) => {
  const q = e.target.value.trim();
  renderSidebar(q);
  const matches = q ? FUNCTIONS.filter((f) => f.name.toLowerCase().includes(q.toLowerCase())) : [];
  searchCount.textContent = q ? `${matches.length} match${matches.length === 1 ? "" : "es"}` : "";
  if (q && matches.length === 1) showDetail(matches[0].name);
});

renderStats();
renderSidebar();

const initial = decodeURIComponent(location.hash.replace("#", ""));
if (initial && FUNCTIONS.some((f) => f.name === initial)) {
  showDetail(initial);
}
