// engine.js — Formulify calculation engine
// Implements the multi-row "special case" demos referenced in data.js as *_DEMO
// plus the generic single-expression runner used by most functions.

const CostCentreTable = [
  { dept: "Marketing", budget: 42000, spend: 38650, owner: "R. Adeyemi" },
  { dept: "Operations", budget: 96000, spend: 101200, owner: "S. Novak" },
  { dept: "Finance", budget: 28000, spend: 24310, owner: "J. Okafor" },
  { dept: "Sales", budget: 61000, spend: 59870, owner: "T. Lindqvist" },
];

const MonthTable = {
  headers: ["Jan", "Feb", "Mar", "Apr"],
  rows: {
    Budget: [12000, 12500, 13000, 12800],
    Actual: [11800, 13100, 12950, 12600],
  },
};

const AgeingTable = [
  { id: "INV-0451", status: "Overdue", amount: 4200 },
  { id: "INV-0452", status: "Paid", amount: 1800 },
  { id: "INV-0453", status: "Overdue", amount: 950 },
  { id: "INV-0454", status: "Pending", amount: 3100 },
  { id: "INV-0455", status: "Overdue", amount: 2650 },
];

const TravelSpend = [
  { category: "Travel", amount: 1200 },
  { category: "Travel", amount: 860 },
  { category: "Software", amount: 4400 },
  { category: "Travel", amount: 340 },
  { category: "Software", amount: 990 },
];

const StaffTable = [
  { dept: "Finance", name: "A. Kruger", salary: 42000 },
  { dept: "Finance", name: "B. Iyer", salary: 47500 },
  { dept: "Marketing", name: "C. Dubois", salary: 39000 },
  { dept: "Finance", name: "D. Reyes", salary: 51000 },
];

function fmt(n) {
  return typeof n === "number" ? Number(n.toFixed(4)).toString() : n;
}

const SPECIAL = {
  LOOKUP_TABLE_DEMO(inputs) {
    const row = CostCentreTable.find((r) => r.dept === inputs.q);
    if (!row) return "Not found";
    return row[inputs.col === "Budget" ? "budget" : inputs.col === "Spend" ? "spend" : "owner"];
  },
  HLOOKUP_TABLE_DEMO(inputs) {
    const idx = MonthTable.headers.indexOf(inputs.q);
    if (idx === -1) return "Not found";
    return MonthTable.rows[inputs.row][idx];
  },
  INDEX_TABLE_DEMO(inputs) {
    const table = [
      [12000, 12500, 13000],
      [11800, 13100, 12950],
      [400, -600, 50],
    ];
    const r = Math.min(Math.max(1, Math.round(inputs.row)), 3) - 1;
    const c = Math.min(Math.max(1, Math.round(inputs.col)), 3) - 1;
    return table[r][c];
  },
  MATCH_DEMO(inputs) {
    const labels = ["Q1", "Q2", "Q3", "Q4"];
    const pos = labels.indexOf(inputs.q);
    return pos === -1 ? "Not found" : pos + 1;
  },
  LOOKUP_VECTOR_DEMO(inputs) {
    const bands = [
      [0, "No discount"],
      [1000, "2% discount"],
      [3000, "5% discount"],
      [5000, "8% discount"],
    ];
    let result = bands[0][1];
    for (const [threshold, label] of bands) {
      if (inputs.q >= threshold) result = label;
    }
    return result;
  },
  LOOKUP_ARRAY_DEMO(inputs) {
    const map = { A: "Approved", B: "Blocked", C: "Closed" };
    return map[inputs.q] || "Not found";
  },
  CELL_DEMO(inputs) {
    const map = { address: "$C$4", row: 4, col: 3, contents: 12500 };
    return map[inputs.t];
  },
  DATEDIF_DEMO(inputs) {
    const d1 = new Date(inputs.d1);
    const d2 = new Date(inputs.d2);
    const msPerDay = 86400000;
    const days = Math.round((d2 - d1) / msPerDay);
    if (inputs.unit === "d") return days;
    let months = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
    if (d2.getDate() < d1.getDate()) months--;
    if (inputs.unit === "m") return months;
    let years = d2.getFullYear() - d1.getFullYear();
    if (d2.getMonth() < d1.getMonth() || (d2.getMonth() === d1.getMonth() && d2.getDate() < d1.getDate())) years--;
    return years;
  },
  NETWORKDAYS_DEMO(inputs) {
    let d1 = new Date(inputs.d1);
    const d2 = new Date(inputs.d2);
    let count = 0;
    while (d1 <= d2) {
      const day = d1.getDay();
      if (day !== 0 && day !== 6) count++;
      d1.setDate(d1.getDate() + 1);
    }
    return count;
  },
  WORKDAY_DEMO(inputs) {
    let d = new Date(inputs.d1);
    let remaining = Math.round(inputs.days);
    const step = remaining >= 0 ? 1 : -1;
    remaining = Math.abs(remaining);
    while (remaining > 0) {
      d.setDate(d.getDate() + step);
      const day = d.getDay();
      if (day !== 0 && day !== 6) remaining--;
    }
    return d.toISOString().slice(0, 10);
  },
  EOMONTH_DEMO(inputs) {
    const d = new Date(inputs.d1);
    const target = new Date(d.getFullYear(), d.getMonth() + Math.round(inputs.m) + 1, 0);
    return target.toISOString().slice(0, 10);
  },
  DATE_DEMO(inputs) {
    const d = new Date(inputs.y, inputs.m - 1, inputs.d);
    return d.toISOString().slice(0, 10);
  },
  DATEVALUE_DEMO(inputs) {
    const parts = inputs.t.split(/[\/\-]/);
    if (parts.length === 3) {
      const [dd, mm, yy] = parts;
      const d = new Date(`${yy}-${mm}-${dd}`);
      if (!isNaN(d)) return d.toISOString().slice(0, 10);
    }
    return "Could not parse date";
  },
  DAYS360_DEMO(inputs) {
    const d1 = new Date(inputs.d1);
    const d2 = new Date(inputs.d2);
    const y1 = d1.getFullYear(), m1 = d1.getMonth() + 1, day1 = Math.min(d1.getDate(), 30);
    const y2 = d2.getFullYear(), m2 = d2.getMonth() + 1, day2 = Math.min(d2.getDate(), 30);
    return (y2 - y1) * 360 + (m2 - m1) * 30 + (day2 - day1);
  },
  EDATE_DEMO(inputs) {
    const d = new Date(inputs.d1);
    d.setMonth(d.getMonth() + Math.round(inputs.m));
    return d.toISOString().slice(0, 10);
  },
  YEARFRAC_DEMO(inputs) {
    const d1 = new Date(inputs.d1);
    const d2 = new Date(inputs.d2);
    return ((d2 - d1) / 86400000 / 365).toFixed(4);
  },
  SUMIF_DEMO(inputs) {
    return TravelSpend.filter((r) => r.category === inputs.cat).reduce((s, r) => s + r.amount, 0);
  },
  COUNTIF_DEMO(inputs) {
    return AgeingTable.filter((r) => r.status === inputs.status).length;
  },
  DSUM_DEMO(inputs) {
    return StaffTable.filter((r) => r.dept === inputs.dept).reduce((s, r) => s + r.salary, 0);
  },
  DCOUNT_DEMO(inputs) {
    return StaffTable.filter((r) => r.dept === inputs.dept).length;
  },
  DCOUNTA_DEMO(inputs) {
    return StaffTable.filter((r) => r.dept === inputs.dept).length;
  },
  DAVERAGE_DEMO(inputs) {
    const rows = StaffTable.filter((r) => r.dept === inputs.dept);
    if (!rows.length) return "No match";
    return Math.round(rows.reduce((s, r) => s + r.salary, 0) / rows.length);
  },
  DGET_DEMO(inputs) {
    const rows = StaffTable.filter((r) => r.dept === inputs.dept);
    return rows.length === 1 ? rows[0].name : rows.length > 1 ? "#NUM! (more than one match)" : "Not found";
  },
  DMAX_DEMO(inputs) {
    const rows = StaffTable.filter((r) => r.dept === inputs.dept);
    return rows.length ? Math.max(...rows.map((r) => r.salary)) : "No match";
  },
  DMIN_DEMO(inputs) {
    const rows = StaffTable.filter((r) => r.dept === inputs.dept);
    return rows.length ? Math.min(...rows.map((r) => r.salary)) : "No match";
  },
  TEXT_FORMAT_DEMO(inputs) {
    const n = inputs.n;
    switch (inputs.fmt) {
      case "currency": return "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      case "percent": return (n * 100).toFixed(1) + "%";
      case "thousands": return n.toLocaleString("en-GB");
      default: return String(n);
    }
  },
  ERRTYPE_DEMO(inputs) {
    const map = { "#NULL!": 1, "#DIV/0!": 2, "#VALUE!": 3, "#REF!": 4, "#NAME?": 5, "#NUM!": 6, "#N/A": 7 };
    return map[inputs.e] ?? "Unknown";
  },
};

function runFormula(fn, inputValues) {
  if (SPECIAL[fn.expr]) {
    try {
      return { ok: true, value: SPECIAL[fn.expr](inputValues) };
    } catch (e) {
      return { ok: false, value: "#ERROR!" };
    }
  }
  try {
    const argNames = fn.inputs.map((i) => i.id);
    const argValues = argNames.map((id) => inputValues[id]);
    // eslint-disable-next-line no-new-func
    const runner = new Function(...argNames, "return (" + fn.expr + ")");
    const result = runner(...argValues);
    return { ok: true, value: result };
  } catch (e) {
    return { ok: false, value: "#ERROR!" };
  }
}
