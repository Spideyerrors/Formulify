const FUNCTIONS = [
 {
  "name": "SLN",
  "category": "Financial",
  "syntax": "=SLN(Cost,Salvage,Life)",
  "desc": "Straight-line depreciation: spreads an asset's cost evenly over its useful life.",
  "inputs": [
   {
    "id": "Cost",
    "label": "Asset cost (\u00a3)",
    "type": "number",
    "default": 25000
   },
   {
    "id": "Salvage",
    "label": "Salvage value (\u00a3)",
    "type": "number",
    "default": 5000
   },
   {
    "id": "Life",
    "label": "Useful life (years)",
    "type": "number",
    "default": 4
   }
  ],
  "expr": "(Cost-Salvage)/Life",
  "note": null
 },
 {
  "name": "SYD",
  "category": "Financial",
  "syntax": "=SYD(Cost,Salvage,Life,Period)",
  "desc": "Sum-of-years-digits depreciation: an accelerated method that expenses more in early years.",
  "inputs": [
   {
    "id": "Cost",
    "label": "Asset cost (\u00a3)",
    "type": "number",
    "default": 25000
   },
   {
    "id": "Salvage",
    "label": "Salvage value (\u00a3)",
    "type": "number",
    "default": 5000
   },
   {
    "id": "Life",
    "label": "Useful life (years)",
    "type": "number",
    "default": 4
   },
   {
    "id": "Period",
    "label": "Period to calculate",
    "type": "number",
    "default": 1
   }
  ],
  "expr": "((Cost-Salvage)*(Life-Period+1)*2)/(Life*(Life+1))",
  "note": null
 },
 {
  "name": "DB",
  "category": "Financial",
  "syntax": "=DB(Cost,Salvage,Life,Period)",
  "desc": "Fixed-declining-balance depreciation for a given period, front-loading expense like real-world asset wear.",
  "inputs": [
   {
    "id": "Cost",
    "label": "Asset cost (\u00a3)",
    "type": "number",
    "default": 25000
   },
   {
    "id": "Salvage",
    "label": "Salvage value (\u00a3)",
    "type": "number",
    "default": 5000
   },
   {
    "id": "Life",
    "label": "Useful life (years)",
    "type": "number",
    "default": 5
   },
   {
    "id": "Period",
    "label": "Period to calculate",
    "type": "number",
    "default": 1
   }
  ],
  "expr": "(()=>{const rate=1-Math.pow(Salvage/Cost,1/Life);const r=Math.round(rate*1000)/1000;let bv=Cost;let dep=0;for(let p=1;p<=Period;p++){dep=(bv)*r;bv-=dep;}return dep;})()",
  "note": null
 },
 {
  "name": "VLOOKUP",
  "category": "Lookup & Reference",
  "syntax": "=VLOOKUP(LookupValue, TableRange, ColIndex, FALSE)",
  "desc": "Searches the first column of a table for a value, then returns a value from another column in the same row \u2014 the classic way to pull a rate, cost centre or department name onto a report.",
  "inputs": [
   {
    "id": "q",
    "label": "Cost centre to find",
    "type": "select",
    "default": "Marketing"
   },
   {
    "id": "col",
    "label": "Column to return",
    "type": "select",
    "default": "Budget"
   }
  ],
  "expr": "LOOKUP_TABLE_DEMO",
  "note": null
 },
 {
  "name": "HLOOKUP",
  "category": "Lookup & Reference",
  "syntax": "=HLOOKUP(LookupValue, TableRange, RowIndex, FALSE)",
  "desc": "Like VLOOKUP but searches across the top row of a table and returns a value from a row below it \u2014 useful when your headings run left to right (e.g. months across the top).",
  "inputs": [
   {
    "id": "q",
    "label": "Month to find",
    "type": "select",
    "default": "Feb"
   },
   {
    "id": "row",
    "label": "Row to return",
    "type": "select",
    "default": "Actual"
   }
  ],
  "expr": "HLOOKUP_TABLE_DEMO",
  "note": null
 },
 {
  "name": "INDEX",
  "category": "Lookup & Reference",
  "syntax": "=INDEX(Range, RowNum, ColNum)",
  "desc": "Returns the value at a given row/column position within a range \u2014 the building block for flexible two-way lookups.",
  "inputs": [
   {
    "id": "row",
    "label": "Row number",
    "type": "number",
    "default": 2
   },
   {
    "id": "col",
    "label": "Column number",
    "type": "number",
    "default": 3
   }
  ],
  "expr": "INDEX_TABLE_DEMO",
  "note": null
 },
 {
  "name": "MATCH",
  "category": "Lookup & Reference",
  "syntax": "=MATCH(LookupValue, Range, 0)",
  "desc": "Finds the position of a value within a range, rather than the value itself \u2014 usually paired with INDEX for flexible lookups.",
  "inputs": [
   {
    "id": "q",
    "label": "Value to find",
    "type": "select",
    "default": "Q3"
   }
  ],
  "expr": "MATCH_DEMO",
  "note": null
 },
 {
  "name": "LOOKUP (Vector)",
  "category": "Lookup & Reference",
  "syntax": "=LOOKUP(Value, LookupVector, ResultVector)",
  "desc": "A simpler lookup for a single sorted row or column of data \u2014 finds the closest match at or below the value you supply.",
  "inputs": [
   {
    "id": "q",
    "label": "Spend amount (\u00a3)",
    "type": "number",
    "default": 4200
   }
  ],
  "expr": "LOOKUP_VECTOR_DEMO",
  "note": null
 },
 {
  "name": "LOOKUP (Array)",
  "category": "Lookup & Reference",
  "syntax": "=LOOKUP(Value, ArrayRange)",
  "desc": "Searches the first row or column of an array and returns a value from the last row or column \u2014 an older, simpler cousin of VLOOKUP.",
  "inputs": [
   {
    "id": "q",
    "label": "Value to find",
    "type": "select",
    "default": "B"
   }
  ],
  "expr": "LOOKUP_ARRAY_DEMO",
  "note": null
 },
 {
  "name": "CHOOSE",
  "category": "Lookup & Reference",
  "syntax": "=CHOOSE(IndexNum, Value1, Value2, ...)",
  "desc": "Picks one value out of a list based on a position number \u2014 handy for mapping a quarter number (1-4) to a label.",
  "inputs": [
   {
    "id": "idx",
    "label": "Index number (1-4)",
    "type": "number",
    "default": 2
   }
  ],
  "expr": "['Q1','Q2','Q3','Q4'][Math.max(1,Math.min(4,Math.round(idx)))-1]",
  "note": null
 },
 {
  "name": "ADDRESS",
  "category": "Lookup & Reference",
  "syntax": "=ADDRESS(RowNum, ColNum)",
  "desc": "Builds a cell reference (like 'C4') from a row and column number \u2014 useful when a formula needs to construct a reference dynamically.",
  "inputs": [
   {
    "id": "row",
    "label": "Row number",
    "type": "number",
    "default": 4
   },
   {
    "id": "col",
    "label": "Column number",
    "type": "number",
    "default": 3
   }
  ],
  "expr": "(()=>{let c=col,s='';while(c>0){let m=(c-1)%26;s=String.fromCharCode(65+m)+s;c=Math.floor((c-1)/26);}return s+row;})()",
  "note": null
 },
 {
  "name": "AREAS",
  "category": "Lookup & Reference",
  "syntax": "=AREAS(Reference)",
  "desc": "Counts how many separate ranges (areas) are referenced in a formula \u2014 a diagnostic function, rarely needed day to day.",
  "inputs": [
   {
    "id": "n",
    "label": "Number of ranges selected",
    "type": "number",
    "default": 2
   }
  ],
  "expr": "Math.round(n)",
  "note": null
 },
 {
  "name": "TRANSPOSE",
  "category": "Lookup & Reference",
  "syntax": "=TRANSPOSE(Range)",
  "desc": "Flips rows into columns (or vice versa) \u2014 turning a row of monthly figures into a column, or a column into a row.",
  "inputs": [
   {
    "id": "r1",
    "label": "Value 1",
    "type": "number",
    "default": 10
   },
   {
    "id": "r2",
    "label": "Value 2",
    "type": "number",
    "default": 20
   },
   {
    "id": "r3",
    "label": "Value 3",
    "type": "number",
    "default": 30
   }
  ],
  "expr": "`[${r1}, ${r2}, ${r3}] becomes a column: ${r1} / ${r2} / ${r3}`",
  "note": "text"
 },
 {
  "name": "INDIRECT",
  "category": "Lookup & Reference",
  "syntax": "=INDIRECT(RefText)",
  "desc": "Turns a text string like \"C4\" into a real cell reference \u2014 lets a formula point at a cell chosen dynamically, e.g. from a dropdown.",
  "inputs": [
   {
    "id": "ref",
    "label": "Cell reference text",
    "type": "text",
    "default": "C4"
   }
  ],
  "expr": "`Refers to whatever value currently sits in cell ${ref}`",
  "note": "text"
 },
 {
  "name": "CELL",
  "category": "Lookup & Reference",
  "syntax": "=CELL(InfoType, Reference)",
  "desc": "Returns information about a cell \u2014 its formatting, address, contents type \u2014 mostly used for building smart templates.",
  "inputs": [
   {
    "id": "t",
    "label": "Info type",
    "type": "select",
    "default": "address"
   }
  ],
  "expr": "CELL_DEMO",
  "note": "text"
 },
 {
  "name": "INFO",
  "category": "Lookup & Reference",
  "syntax": "=INFO(TypeText)",
  "desc": "Returns information about the current operating environment (e.g. Excel version, OS) \u2014 used in advanced template building.",
  "inputs": [],
  "expr": "'Environment details, e.g. \"Microsoft Excel\" or the current OS name'",
  "note": "text"
 },
 {
  "name": "DATEDIF",
  "category": "Date & Time",
  "syntax": "=DATEDIF(StartDate, EndDate, \"y\")",
  "desc": "Calculates the difference between two dates in days, months or years \u2014 perfect for tenure, contract length or ageing calculations.",
  "inputs": [
   {
    "id": "d1",
    "label": "Start date",
    "type": "date",
    "default": "2019-01-01"
   },
   {
    "id": "d2",
    "label": "End date",
    "type": "date",
    "default": "2026-09-06"
   },
   {
    "id": "unit",
    "label": "Return as",
    "type": "select",
    "default": "y"
   }
  ],
  "expr": "DATEDIF_DEMO",
  "note": null
 },
 {
  "name": "NETWORKDAYS",
  "category": "Date & Time",
  "syntax": "=NETWORKDAYS(StartDate, EndDate)",
  "desc": "Counts the working days between two dates, excluding weekends \u2014 used for SLA tracking and payment-term calculations.",
  "inputs": [
   {
    "id": "d1",
    "label": "Start date",
    "type": "date",
    "default": "2026-09-01"
   },
   {
    "id": "d2",
    "label": "End date",
    "type": "date",
    "default": "2026-09-30"
   }
  ],
  "expr": "NETWORKDAYS_DEMO",
  "note": null
 },
 {
  "name": "WORKDAY",
  "category": "Date & Time",
  "syntax": "=WORKDAY(StartDate, Days)",
  "desc": "Adds a number of working days to a date, skipping weekends \u2014 useful for calculating a due date a set number of business days out.",
  "inputs": [
   {
    "id": "d1",
    "label": "Start date",
    "type": "date",
    "default": "2026-09-01"
   },
   {
    "id": "days",
    "label": "Working days to add",
    "type": "number",
    "default": 10
   }
  ],
  "expr": "WORKDAY_DEMO",
  "note": null
 },
 {
  "name": "EOMONTH",
  "category": "Date & Time",
  "syntax": "=EOMONTH(StartDate, Months)",
  "desc": "Returns the last day of a month, a set number of months before or after a date \u2014 handy for month-end reporting cut-offs.",
  "inputs": [
   {
    "id": "d1",
    "label": "Start date",
    "type": "date",
    "default": "2026-09-06"
   },
   {
    "id": "m",
    "label": "Months forward/back",
    "type": "number",
    "default": 1
   }
  ],
  "expr": "EOMONTH_DEMO",
  "note": null
 },
 {
  "name": "DATE",
  "category": "Date & Time",
  "syntax": "=DATE(Year, Month, Day)",
  "desc": "Builds a proper date from separate year, month and day numbers \u2014 useful when those parts come from other cells or a form.",
  "inputs": [
   {
    "id": "y",
    "label": "Year",
    "type": "number",
    "default": 2026
   },
   {
    "id": "m",
    "label": "Month",
    "type": "number",
    "default": 9
   },
   {
    "id": "d",
    "label": "Day",
    "type": "number",
    "default": 6
   }
  ],
  "expr": "DATE_DEMO",
  "note": null
 },
 {
  "name": "DATEVALUE",
  "category": "Date & Time",
  "syntax": "=DATEVALUE(DateText)",
  "desc": "Converts a date stored as text into a real Excel date, so it can be used in calculations.",
  "inputs": [
   {
    "id": "t",
    "label": "Date text",
    "type": "text",
    "default": "06/09/2026"
   }
  ],
  "expr": "DATEVALUE_DEMO",
  "note": null
 },
 {
  "name": "DAY",
  "category": "Date & Time",
  "syntax": "=DAY(Date)",
  "desc": "Extracts just the day-of-month number from a date.",
  "inputs": [
   {
    "id": "d",
    "label": "Date",
    "type": "date",
    "default": "2026-09-06"
   }
  ],
  "expr": "new Date(d).getDate()",
  "note": null
 },
 {
  "name": "MONTH",
  "category": "Date & Time",
  "syntax": "=MONTH(Date)",
  "desc": "Extracts just the month number from a date.",
  "inputs": [
   {
    "id": "d",
    "label": "Date",
    "type": "date",
    "default": "2026-09-06"
   }
  ],
  "expr": "new Date(d).getMonth()+1",
  "note": null
 },
 {
  "name": "YEAR",
  "category": "Date & Time",
  "syntax": "=YEAR(Date)",
  "desc": "Extracts just the year from a date.",
  "inputs": [
   {
    "id": "d",
    "label": "Date",
    "type": "date",
    "default": "2026-09-06"
   }
  ],
  "expr": "new Date(d).getFullYear()",
  "note": null
 },
 {
  "name": "WEEKDAY",
  "category": "Date & Time",
  "syntax": "=WEEKDAY(Date)",
  "desc": "Returns which day of the week a date falls on, as a number (1 = Sunday) \u2014 used to flag weekend transactions.",
  "inputs": [
   {
    "id": "d",
    "label": "Date",
    "type": "date",
    "default": "2026-09-06"
   }
  ],
  "expr": "new Date(d+'T00:00:00').getDay()+1",
  "note": null
 },
 {
  "name": "DAYS360",
  "category": "Date & Time",
  "syntax": "=DAYS360(StartDate, EndDate)",
  "desc": "Calculates days between two dates using a 360-day year (12\u00d730-day months) \u2014 a convention used in some bond and interest calculations.",
  "inputs": [
   {
    "id": "d1",
    "label": "Start date",
    "type": "date",
    "default": "2026-01-01"
   },
   {
    "id": "d2",
    "label": "End date",
    "type": "date",
    "default": "2026-09-06"
   }
  ],
  "expr": "DAYS360_DEMO",
  "note": null
 },
 {
  "name": "EDATE",
  "category": "Date & Time",
  "syntax": "=EDATE(StartDate, Months)",
  "desc": "Shifts a date forward or back by a whole number of months, keeping the same day of month \u2014 great for renewal or review dates.",
  "inputs": [
   {
    "id": "d1",
    "label": "Start date",
    "type": "date",
    "default": "2026-09-06"
   },
   {
    "id": "m",
    "label": "Months forward/back",
    "type": "number",
    "default": 3
   }
  ],
  "expr": "EDATE_DEMO",
  "note": null
 },
 {
  "name": "HOUR",
  "category": "Date & Time",
  "syntax": "=HOUR(Time)",
  "desc": "Extracts the hour component from a time value.",
  "inputs": [
   {
    "id": "t",
    "label": "Time (HH:MM)",
    "type": "text",
    "default": "14:30"
   }
  ],
  "expr": "parseInt(t.split(':')[0],10)",
  "note": null
 },
 {
  "name": "MINUTE",
  "category": "Date & Time",
  "syntax": "=MINUTE(Time)",
  "desc": "Extracts the minutes component from a time value.",
  "inputs": [
   {
    "id": "t",
    "label": "Time (HH:MM)",
    "type": "text",
    "default": "14:30"
   }
  ],
  "expr": "parseInt(t.split(':')[1],10)",
  "note": null
 },
 {
  "name": "SECOND",
  "category": "Date & Time",
  "syntax": "=SECOND(Time)",
  "desc": "Extracts the seconds component from a time value.",
  "inputs": [
   {
    "id": "t",
    "label": "Time (HH:MM:SS)",
    "type": "text",
    "default": "14:30:45"
   }
  ],
  "expr": "parseInt((t.split(':')[2]||'0'),10)",
  "note": null
 },
 {
  "name": "TIME",
  "category": "Date & Time",
  "syntax": "=TIME(Hour, Minute, Second)",
  "desc": "Builds a time value from separate hour, minute and second numbers.",
  "inputs": [
   {
    "id": "h",
    "label": "Hour",
    "type": "number",
    "default": 14
   },
   {
    "id": "m",
    "label": "Minute",
    "type": "number",
    "default": 30
   },
   {
    "id": "s",
    "label": "Second",
    "type": "number",
    "default": 0
   }
  ],
  "expr": "`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`",
  "note": "text"
 },
 {
  "name": "TIMEVALUE",
  "category": "Date & Time",
  "syntax": "=TIMEVALUE(TimeText)",
  "desc": "Converts a time stored as text into a real Excel time value that can be used in calculations.",
  "inputs": [
   {
    "id": "t",
    "label": "Time text",
    "type": "text",
    "default": "2:30 PM"
   }
  ],
  "expr": "`Recognised as a time fraction of a 24-hour day`",
  "note": "text"
 },
 {
  "name": "TODAY",
  "category": "Date & Time",
  "syntax": "=TODAY()",
  "desc": "Returns today's date, updating automatically whenever the sheet recalculates.",
  "inputs": [],
  "expr": "new Date().toISOString().slice(0,10)",
  "note": null
 },
 {
  "name": "NOW",
  "category": "Date & Time",
  "syntax": "=NOW()",
  "desc": "Returns the current date and time, updating automatically whenever the sheet recalculates.",
  "inputs": [],
  "expr": "new Date().toLocaleString()",
  "note": "text"
 },
 {
  "name": "YEARFRAC",
  "category": "Date & Time",
  "syntax": "=YEARFRAC(StartDate, EndDate)",
  "desc": "Expresses the gap between two dates as a fraction of a year \u2014 used for pro-rating annual figures like interest or accrued leave.",
  "inputs": [
   {
    "id": "d1",
    "label": "Start date",
    "type": "date",
    "default": "2026-01-01"
   },
   {
    "id": "d2",
    "label": "End date",
    "type": "date",
    "default": "2026-09-06"
   }
  ],
  "expr": "YEARFRAC_DEMO",
  "note": null
 },
 {
  "name": "SUM",
  "category": "Aggregation",
  "syntax": "=SUM(Range)",
  "desc": "Adds up a range of numbers \u2014 the most-used formula in any spreadsheet.",
  "inputs": [
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 1200
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 950
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 640
   }
  ],
  "expr": "a+b+c",
  "note": null
 },
 {
  "name": "SUMIF",
  "category": "Aggregation",
  "syntax": "=SUMIF(Range, \"Criteria\", SumRange)",
  "desc": "Totals only the values in a range that match a condition \u2014 e.g. total spend for one supplier only.",
  "inputs": [
   {
    "id": "cat",
    "label": "Category to total",
    "type": "select",
    "default": "Travel"
   }
  ],
  "expr": "SUMIF_DEMO",
  "note": null
 },
 {
  "name": "SUMPRODUCT",
  "category": "Aggregation",
  "syntax": "=SUMPRODUCT(Range1, Range2)",
  "desc": "Multiplies corresponding entries in two or more ranges and adds up the results \u2014 e.g. quantity \u00d7 unit price across many rows without helper columns.",
  "inputs": [
   {
    "id": "q1",
    "label": "Qty 1",
    "type": "number",
    "default": 5
   },
   {
    "id": "p1",
    "label": "Price 1",
    "type": "number",
    "default": 20
   },
   {
    "id": "q2",
    "label": "Qty 2",
    "type": "number",
    "default": 3
   },
   {
    "id": "p2",
    "label": "Price 2",
    "type": "number",
    "default": 45
   }
  ],
  "expr": "(q1*p1)+(q2*p2)",
  "note": null
 },
 {
  "name": "COUNT",
  "category": "Aggregation",
  "syntax": "=COUNT(Range)",
  "desc": "Counts how many cells in a range contain numbers.",
  "inputs": [
   {
    "id": "n",
    "label": "Cells filled with numbers",
    "type": "number",
    "default": 7
   }
  ],
  "expr": "Math.round(n)",
  "note": null
 },
 {
  "name": "COUNTA",
  "category": "Aggregation",
  "syntax": "=COUNTA(Range)",
  "desc": "Counts how many cells in a range are not empty, whether text or numbers.",
  "inputs": [
   {
    "id": "n",
    "label": "Non-empty cells",
    "type": "number",
    "default": 9
   }
  ],
  "expr": "Math.round(n)",
  "note": null
 },
 {
  "name": "COUNTBLANK",
  "category": "Aggregation",
  "syntax": "=COUNTBLANK(Range)",
  "desc": "Counts how many cells in a range are empty \u2014 useful for spotting missing entries.",
  "inputs": [
   {
    "id": "n",
    "label": "Empty cells",
    "type": "number",
    "default": 2
   }
  ],
  "expr": "Math.round(n)",
  "note": null
 },
 {
  "name": "COUNTIF",
  "category": "Aggregation",
  "syntax": "=COUNTIF(Range, \"Criteria\")",
  "desc": "Counts cells that match a condition \u2014 e.g. how many invoices are still marked 'Overdue'.",
  "inputs": [
   {
    "id": "status",
    "label": "Status to count",
    "type": "select",
    "default": "Overdue"
   }
  ],
  "expr": "COUNTIF_DEMO",
  "note": null
 },
 {
  "name": "DSUM",
  "category": "Aggregation",
  "syntax": "=DSUM(Database, Field, Criteria)",
  "desc": "Sums a column in a table where rows match a set of criteria defined in a separate criteria range \u2014 like SUMIF but for multiple conditions.",
  "inputs": [
   {
    "id": "dept",
    "label": "Department",
    "type": "select",
    "default": "Finance"
   }
  ],
  "expr": "DSUM_DEMO",
  "note": null
 },
 {
  "name": "DCOUNT",
  "category": "Aggregation",
  "syntax": "=DCOUNT(Database, Field, Criteria)",
  "desc": "Counts numeric entries in a column of a table that match multi-condition criteria.",
  "inputs": [
   {
    "id": "dept",
    "label": "Department",
    "type": "select",
    "default": "Finance"
   }
  ],
  "expr": "DCOUNT_DEMO",
  "note": null
 },
 {
  "name": "DCOUNTA",
  "category": "Aggregation",
  "syntax": "=DCOUNTA(Database, Field, Criteria)",
  "desc": "Counts non-empty entries in a column of a table that match multi-condition criteria.",
  "inputs": [
   {
    "id": "dept",
    "label": "Department",
    "type": "select",
    "default": "Finance"
   }
  ],
  "expr": "DCOUNTA_DEMO",
  "note": null
 },
 {
  "name": "DAVERAGE",
  "category": "Aggregation",
  "syntax": "=DAVERAGE(Database, Field, Criteria)",
  "desc": "Averages a column in a table where rows match multi-condition criteria.",
  "inputs": [
   {
    "id": "dept",
    "label": "Department",
    "type": "select",
    "default": "Finance"
   }
  ],
  "expr": "DAVERAGE_DEMO",
  "note": null
 },
 {
  "name": "DGET",
  "category": "Aggregation",
  "syntax": "=DGET(Database, Field, Criteria)",
  "desc": "Pulls a single matching value out of a table given criteria \u2014 errors if more than one row matches.",
  "inputs": [
   {
    "id": "dept",
    "label": "Department",
    "type": "select",
    "default": "Finance"
   }
  ],
  "expr": "DGET_DEMO",
  "note": null
 },
 {
  "name": "DMAX",
  "category": "Aggregation",
  "syntax": "=DMAX(Database, Field, Criteria)",
  "desc": "Finds the largest value in a column of a table matching given criteria.",
  "inputs": [
   {
    "id": "dept",
    "label": "Department",
    "type": "select",
    "default": "Finance"
   }
  ],
  "expr": "DMAX_DEMO",
  "note": null
 },
 {
  "name": "DMIN",
  "category": "Aggregation",
  "syntax": "=DMIN(Database, Field, Criteria)",
  "desc": "Finds the smallest value in a column of a table matching given criteria.",
  "inputs": [
   {
    "id": "dept",
    "label": "Department",
    "type": "select",
    "default": "Finance"
   }
  ],
  "expr": "DMIN_DEMO",
  "note": null
 },
 {
  "name": "AVERAGE",
  "category": "Statistical",
  "syntax": "=AVERAGE(Range)",
  "desc": "Calculates the mean of a set of numbers.",
  "inputs": [
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 120
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 150
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 90
   }
  ],
  "expr": "(a+b+c)/3",
  "note": null
 },
 {
  "name": "MAX",
  "category": "Statistical",
  "syntax": "=MAX(Range)",
  "desc": "Returns the largest value in a set of numbers.",
  "inputs": [
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 320
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 410
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 275
   }
  ],
  "expr": "Math.max(a,b,c)",
  "note": null
 },
 {
  "name": "MIN",
  "category": "Statistical",
  "syntax": "=MIN(Range)",
  "desc": "Returns the smallest value in a set of numbers.",
  "inputs": [
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 320
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 410
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 275
   }
  ],
  "expr": "Math.min(a,b,c)",
  "note": null
 },
 {
  "name": "MEDIAN",
  "category": "Statistical",
  "syntax": "=MEDIAN(Range)",
  "desc": "Returns the middle value of a set of numbers when sorted \u2014 less skewed by outliers than AVERAGE.",
  "inputs": [
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 100
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 900
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 250
   }
  ],
  "expr": "[a,b,c].sort((x,y)=>x-y)[1]",
  "note": null
 },
 {
  "name": "MODE",
  "category": "Statistical",
  "syntax": "=MODE(Range)",
  "desc": "Returns the most frequently occurring value in a set of numbers.",
  "inputs": [
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 5
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 5
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 8
   }
  ],
  "expr": "(()=>{const arr=[a,b,c];const counts={};arr.forEach(v=>counts[v]=(counts[v]||0)+1);let best=arr[0],bc=0;for(const k in counts){if(counts[k]>bc){bc=counts[k];best=k;}}return bc>1?Number(best):'No repeated value';})()",
  "note": null
 },
 {
  "name": "STDEV",
  "category": "Statistical",
  "syntax": "=STDEV(Range)",
  "desc": "Measures how spread out a sample of numbers is from the average \u2014 a common way to gauge volatility.",
  "inputs": [
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 100
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 120
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 80
   }
  ],
  "expr": "(()=>{const arr=[a,b,c];const m=arr.reduce((s,v)=>s+v,0)/arr.length;const v=arr.reduce((s,x)=>s+(x-m)**2,0)/(arr.length-1);return Math.sqrt(v);})()",
  "note": null
 },
 {
  "name": "STDEVP",
  "category": "Statistical",
  "syntax": "=STDEVP(Range)",
  "desc": "Like STDEV, but treats the numbers as the entire population rather than a sample.",
  "inputs": [
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 100
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 120
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 80
   }
  ],
  "expr": "(()=>{const arr=[a,b,c];const m=arr.reduce((s,v)=>s+v,0)/arr.length;const v=arr.reduce((s,x)=>s+(x-m)**2,0)/arr.length;return Math.sqrt(v);})()",
  "note": null
 },
 {
  "name": "VAR",
  "category": "Statistical",
  "syntax": "=VAR(Range)",
  "desc": "Measures variance \u2014 the average squared difference from the mean \u2014 for a sample of numbers.",
  "inputs": [
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 100
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 120
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 80
   }
  ],
  "expr": "(()=>{const arr=[a,b,c];const m=arr.reduce((s,v)=>s+v,0)/arr.length;return arr.reduce((s,x)=>s+(x-m)**2,0)/(arr.length-1);})()",
  "note": null
 },
 {
  "name": "VARP",
  "category": "Statistical",
  "syntax": "=VARP(Range)",
  "desc": "Like VAR, but treats the numbers as the entire population.",
  "inputs": [
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 100
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 120
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 80
   }
  ],
  "expr": "(()=>{const arr=[a,b,c];const m=arr.reduce((s,v)=>s+v,0)/arr.length;return arr.reduce((s,x)=>s+(x-m)**2,0)/arr.length;})()",
  "note": null
 },
 {
  "name": "LARGE",
  "category": "Statistical",
  "syntax": "=LARGE(Range, k)",
  "desc": "Returns the k-th largest value in a set \u2014 e.g. the 2nd biggest expense.",
  "inputs": [
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 90
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 340
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 210
   },
   {
    "id": "k",
    "label": "k-th largest",
    "type": "number",
    "default": 2
   }
  ],
  "expr": "[a,b,c].sort((x,y)=>y-x)[Math.max(1,Math.round(k))-1]",
  "note": null
 },
 {
  "name": "SMALL",
  "category": "Statistical",
  "syntax": "=SMALL(Range, k)",
  "desc": "Returns the k-th smallest value in a set \u2014 e.g. the cheapest quote.",
  "inputs": [
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 90
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 340
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 210
   },
   {
    "id": "k",
    "label": "k-th smallest",
    "type": "number",
    "default": 1
   }
  ],
  "expr": "[a,b,c].sort((x,y)=>x-y)[Math.max(1,Math.round(k))-1]",
  "note": null
 },
 {
  "name": "RANK",
  "category": "Statistical",
  "syntax": "=RANK(Number, Range)",
  "desc": "Returns the rank of a number within a list \u2014 1st, 2nd, 3rd place and so on.",
  "inputs": [
   {
    "id": "n",
    "label": "Number to rank",
    "type": "number",
    "default": 340
   },
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 90
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 340
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 210
   }
  ],
  "expr": "[a,b,c].sort((x,y)=>y-x).indexOf(n)+1",
  "note": null
 },
 {
  "name": "QUARTILE",
  "category": "Statistical",
  "syntax": "=QUARTILE(Range, Quart)",
  "desc": "Splits a dataset into four equal parts and returns the value at a given quartile boundary.",
  "inputs": [
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 10
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 20
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 30
   },
   {
    "id": "d",
    "label": "Value 4",
    "type": "number",
    "default": 40
   },
   {
    "id": "q",
    "label": "Quartile (0-4)",
    "type": "number",
    "default": 2
   }
  ],
  "expr": "(()=>{const arr=[a,b,c,d].sort((x,y)=>x-y);const pos=(q/4)*(arr.length-1);const lo=Math.floor(pos),hi=Math.ceil(pos);return arr[lo]+(arr[hi]-arr[lo])*(pos-lo);})()",
  "note": null
 },
 {
  "name": "FORECAST",
  "category": "Statistical",
  "syntax": "=FORECAST(X, KnownYs, KnownXs)",
  "desc": "Predicts a future value along a linear trend, based on existing data \u2014 a quick way to project next month's figure from history.",
  "inputs": [
   {
    "id": "y1",
    "label": "Month 1 value",
    "type": "number",
    "default": 100
   },
   {
    "id": "y2",
    "label": "Month 2 value",
    "type": "number",
    "default": 120
   },
   {
    "id": "y3",
    "label": "Month 3 value",
    "type": "number",
    "default": 140
   },
   {
    "id": "x",
    "label": "Month to forecast",
    "type": "number",
    "default": 4
   }
  ],
  "expr": "(()=>{const xs=[1,2,3],ys=[y1,y2,y3];const n=3;const sx=xs.reduce((s,v)=>s+v,0),sy=ys.reduce((s,v)=>s+v,0);const sxy=xs.reduce((s,v,i)=>s+v*ys[i],0);const sx2=xs.reduce((s,v)=>s+v*v,0);const slope=(n*sxy-sx*sy)/(n*sx2-sx*sx);const intercept=(sy-slope*sx)/n;return slope*x+intercept;})()",
  "note": null
 },
 {
  "name": "CORREL",
  "category": "Statistical",
  "syntax": "=CORREL(Range1, Range2)",
  "desc": "Measures how closely two sets of numbers move together, from -1 to +1.",
  "inputs": [
   {
    "id": "a1",
    "label": "Series A - 1",
    "type": "number",
    "default": 10
   },
   {
    "id": "a2",
    "label": "Series A - 2",
    "type": "number",
    "default": 20
   },
   {
    "id": "a3",
    "label": "Series A - 3",
    "type": "number",
    "default": 30
   },
   {
    "id": "b1",
    "label": "Series B - 1",
    "type": "number",
    "default": 15
   },
   {
    "id": "b2",
    "label": "Series B - 2",
    "type": "number",
    "default": 18
   },
   {
    "id": "b3",
    "label": "Series B - 3",
    "type": "number",
    "default": 33
   }
  ],
  "expr": "(()=>{const A=[a1,a2,a3],B=[b1,b2,b3];const n=3;const ma=A.reduce((s,v)=>s+v,0)/n,mb=B.reduce((s,v)=>s+v,0)/n;let num=0,da=0,db=0;for(let i=0;i<n;i++){num+=(A[i]-ma)*(B[i]-mb);da+=(A[i]-ma)**2;db+=(B[i]-mb)**2;}return num/Math.sqrt(da*db);})()",
  "note": null
 },
 {
  "name": "FREQUENCY",
  "category": "Statistical",
  "syntax": "=FREQUENCY(DataRange, BinsRange)",
  "desc": "Counts how many values fall into each of several ranges (bins) \u2014 e.g. how many invoices fall into each ageing bucket.",
  "inputs": [
   {
    "id": "v1",
    "label": "Value 1",
    "type": "number",
    "default": 15
   },
   {
    "id": "v2",
    "label": "Value 2",
    "type": "number",
    "default": 42
   },
   {
    "id": "v3",
    "label": "Value 3",
    "type": "number",
    "default": 67
   },
   {
    "id": "bin",
    "label": "Bin upper bound",
    "type": "number",
    "default": 30
   }
  ],
  "expr": "[v1,v2,v3].filter(v=>v<=bin).length",
  "note": null
 },
 {
  "name": "PERMUT",
  "category": "Statistical",
  "syntax": "=PERMUT(Number, NumberChosen)",
  "desc": "Counts how many ordered arrangements are possible when choosing a subset from a set.",
  "inputs": [
   {
    "id": "n",
    "label": "Set size",
    "type": "number",
    "default": 5
   },
   {
    "id": "k",
    "label": "Chosen",
    "type": "number",
    "default": 2
   }
  ],
  "expr": "(()=>{const fact=x=>x<=1?1:x*fact(x-1);return fact(n)/fact(n-k);})()",
  "note": null
 },
 {
  "name": "COMBIN",
  "category": "Statistical",
  "syntax": "=COMBIN(Number, NumberChosen)",
  "desc": "Counts how many unordered combinations are possible when choosing a subset from a set.",
  "inputs": [
   {
    "id": "n",
    "label": "Set size",
    "type": "number",
    "default": 5
   },
   {
    "id": "k",
    "label": "Chosen",
    "type": "number",
    "default": 2
   }
  ],
  "expr": "(()=>{const fact=x=>x<=1?1:x*fact(x-1);return fact(n)/(fact(k)*fact(n-k));})()",
  "note": null
 },
 {
  "name": "ABS",
  "category": "Math",
  "syntax": "=ABS(Number)",
  "desc": "Returns the absolute (always positive) value of a number \u2014 useful for comparing variances without sign getting in the way.",
  "inputs": [
   {
    "id": "n",
    "label": "Number (e.g. a variance)",
    "type": "number",
    "default": -1250
   }
  ],
  "expr": "Math.abs(n)",
  "note": null
 },
 {
  "name": "ROUND",
  "category": "Math",
  "syntax": "=ROUND(Number, Digits)",
  "desc": "Rounds a number to a chosen number of decimal places.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 1234.5678
   },
   {
    "id": "d",
    "label": "Decimal places",
    "type": "number",
    "default": 2
   }
  ],
  "expr": "(()=>{const f=Math.pow(10,d);return Math.round(n*f)/f;})()",
  "note": null
 },
 {
  "name": "ROUNDUP",
  "category": "Math",
  "syntax": "=ROUNDUP(Number, Digits)",
  "desc": "Always rounds a number away from zero, regardless of the next digit.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 1234.121
   },
   {
    "id": "d",
    "label": "Decimal places",
    "type": "number",
    "default": 1
   }
  ],
  "expr": "(()=>{const f=Math.pow(10,d);return Math.ceil(n*f)/f;})()",
  "note": null
 },
 {
  "name": "ROUNDDOWN",
  "category": "Math",
  "syntax": "=ROUNDDOWN(Number, Digits)",
  "desc": "Always rounds a number towards zero (truncates), regardless of the next digit.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 1234.999
   },
   {
    "id": "d",
    "label": "Decimal places",
    "type": "number",
    "default": 1
   }
  ],
  "expr": "(()=>{const f=Math.pow(10,d);return Math.floor(n*f)/f;})()",
  "note": null
 },
 {
  "name": "CEILING",
  "category": "Math",
  "syntax": "=CEILING(Number, Multiple)",
  "desc": "Rounds a number up to the nearest multiple you specify \u2014 e.g. rounding a price up to the nearest 5p.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 23.4
   },
   {
    "id": "m",
    "label": "Round up to nearest",
    "type": "number",
    "default": 5
   }
  ],
  "expr": "Math.ceil(n/m)*m",
  "note": null
 },
 {
  "name": "FLOOR",
  "category": "Math",
  "syntax": "=FLOOR(Number, Multiple)",
  "desc": "Rounds a number down to the nearest multiple you specify.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 23.4
   },
   {
    "id": "m",
    "label": "Round down to nearest",
    "type": "number",
    "default": 5
   }
  ],
  "expr": "Math.floor(n/m)*m",
  "note": null
 },
 {
  "name": "MROUND",
  "category": "Math",
  "syntax": "=MROUND(Number, Multiple)",
  "desc": "Rounds a number to the nearest multiple you specify (up or down, whichever is closer).",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 23
   },
   {
    "id": "m",
    "label": "Nearest multiple",
    "type": "number",
    "default": 5
   }
  ],
  "expr": "Math.round(n/m)*m",
  "note": null
 },
 {
  "name": "INT",
  "category": "Math",
  "syntax": "=INT(Number)",
  "desc": "Rounds a number down to the nearest whole number.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 47.89
   }
  ],
  "expr": "Math.floor(n)",
  "note": null
 },
 {
  "name": "TRUNC",
  "category": "Math",
  "syntax": "=TRUNC(Number, Digits)",
  "desc": "Removes the decimal part of a number without rounding, optionally keeping a set number of digits.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 47.896
   },
   {
    "id": "d",
    "label": "Digits to keep",
    "type": "number",
    "default": 1
   }
  ],
  "expr": "(()=>{const f=Math.pow(10,d);return Math.trunc(n*f)/f;})()",
  "note": null
 },
 {
  "name": "EVEN",
  "category": "Math",
  "syntax": "=EVEN(Number)",
  "desc": "Rounds a number up to the nearest even integer.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 7
   }
  ],
  "expr": "(()=>{const r=Math.ceil(Math.abs(n));return (Math.sign(n)||1)*(r%2===0?r:r+1);})()",
  "note": null
 },
 {
  "name": "ODD",
  "category": "Math",
  "syntax": "=ODD(Number)",
  "desc": "Rounds a number up to the nearest odd integer.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 8
   }
  ],
  "expr": "(()=>{const r=Math.ceil(Math.abs(n));return (Math.sign(n)||1)*(r%2===1?r:r+1);})()",
  "note": null
 },
 {
  "name": "MOD",
  "category": "Math",
  "syntax": "=MOD(Number, Divisor)",
  "desc": "Returns the remainder after dividing one number by another.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 17
   },
   {
    "id": "d",
    "label": "Divisor",
    "type": "number",
    "default": 5
   }
  ],
  "expr": "n%d",
  "note": null
 },
 {
  "name": "QUOTIENT",
  "category": "Math",
  "syntax": "=QUOTIENT(Numerator, Denominator)",
  "desc": "Returns just the whole-number part of a division, discarding the remainder.",
  "inputs": [
   {
    "id": "n",
    "label": "Numerator",
    "type": "number",
    "default": 17
   },
   {
    "id": "d",
    "label": "Denominator",
    "type": "number",
    "default": 5
   }
  ],
  "expr": "Math.trunc(n/d)",
  "note": null
 },
 {
  "name": "POWER",
  "category": "Math",
  "syntax": "=POWER(Number, Power)",
  "desc": "Raises a number to a given power.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 1.05
   },
   {
    "id": "p",
    "label": "Power",
    "type": "number",
    "default": 10
   }
  ],
  "expr": "Math.pow(n,p)",
  "note": null
 },
 {
  "name": "PRODUCT",
  "category": "Math",
  "syntax": "=PRODUCT(Range)",
  "desc": "Multiplies together a set of numbers.",
  "inputs": [
   {
    "id": "a",
    "label": "Value 1",
    "type": "number",
    "default": 4
   },
   {
    "id": "b",
    "label": "Value 2",
    "type": "number",
    "default": 5
   },
   {
    "id": "c",
    "label": "Value 3",
    "type": "number",
    "default": 3
   }
  ],
  "expr": "a*b*c",
  "note": null
 },
 {
  "name": "SIGN",
  "category": "Math",
  "syntax": "=SIGN(Number)",
  "desc": "Returns 1 for a positive number, -1 for negative, or 0 \u2014 a quick way to flag favourable vs unfavourable variances.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": -450
   }
  ],
  "expr": "Math.sign(n)",
  "note": null
 },
 {
  "name": "FACT",
  "category": "Math",
  "syntax": "=FACT(Number)",
  "desc": "Returns the factorial of a number (n \u00d7 n-1 \u00d7 ... \u00d7 1) \u2014 used in combinatorics and probability.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 5
   }
  ],
  "expr": "(()=>{const f=x=>x<=1?1:x*f(x-1);return f(Math.round(n));})()",
  "note": null
 },
 {
  "name": "GCD",
  "category": "Math",
  "syntax": "=GCD(Number1, Number2)",
  "desc": "Finds the greatest common divisor of two numbers.",
  "inputs": [
   {
    "id": "a",
    "label": "Number 1",
    "type": "number",
    "default": 48
   },
   {
    "id": "b",
    "label": "Number 2",
    "type": "number",
    "default": 18
   }
  ],
  "expr": "(()=>{const gcd=(x,y)=>y===0?x:gcd(y,x%y);return gcd(Math.round(a),Math.round(b));})()",
  "note": null
 },
 {
  "name": "LCM",
  "category": "Math",
  "syntax": "=LCM(Number1, Number2)",
  "desc": "Finds the lowest common multiple of two numbers.",
  "inputs": [
   {
    "id": "a",
    "label": "Number 1",
    "type": "number",
    "default": 4
   },
   {
    "id": "b",
    "label": "Number 2",
    "type": "number",
    "default": 6
   }
  ],
  "expr": "(()=>{const gcd=(x,y)=>y===0?x:gcd(y,x%y);return Math.abs(a*b)/gcd(Math.round(a),Math.round(b));})()",
  "note": null
 },
 {
  "name": "PI",
  "category": "Math",
  "syntax": "=PI()",
  "desc": "Returns the mathematical constant \u03c0 to 15 digits.",
  "inputs": [],
  "expr": "Math.PI",
  "note": null
 },
 {
  "name": "RAND",
  "category": "Math",
  "syntax": "=RAND()",
  "desc": "Returns a random decimal between 0 and 1, recalculating every time the sheet changes.",
  "inputs": [],
  "expr": "Math.random()",
  "note": null
 },
 {
  "name": "RANDBETWEEN",
  "category": "Math",
  "syntax": "=RANDBETWEEN(Bottom, Top)",
  "desc": "Returns a random whole number between two values you specify.",
  "inputs": [
   {
    "id": "lo",
    "label": "Bottom",
    "type": "number",
    "default": 1
   },
   {
    "id": "hi",
    "label": "Top",
    "type": "number",
    "default": 100
   }
  ],
  "expr": "Math.floor(Math.random()*(hi-lo+1))+lo",
  "note": null
 },
 {
  "name": "MMULT",
  "category": "Math",
  "syntax": "=MMULT(Array1, Array2)",
  "desc": "Multiplies two matrices together \u2014 used in more advanced modelling such as portfolio calculations.",
  "inputs": [
   {
    "id": "a11",
    "label": "A row1",
    "type": "number",
    "default": 1
   },
   {
    "id": "a12",
    "label": "A row1 col2",
    "type": "number",
    "default": 2
   },
   {
    "id": "b11",
    "label": "B row1",
    "type": "number",
    "default": 3
   },
   {
    "id": "b21",
    "label": "B row2",
    "type": "number",
    "default": 4
   }
  ],
  "expr": "(a11*b11)+(a12*b21)",
  "note": null
 },
 {
  "name": "DELTA",
  "category": "Math",
  "syntax": "=DELTA(Number1, Number2)",
  "desc": "Tests whether two numbers are exactly equal, returning 1 if they match and 0 if not.",
  "inputs": [
   {
    "id": "a",
    "label": "Number 1",
    "type": "number",
    "default": 100
   },
   {
    "id": "b",
    "label": "Number 2",
    "type": "number",
    "default": 100
   }
  ],
  "expr": "a===b?1:0",
  "note": null
 },
 {
  "name": "GESTEP",
  "category": "Math",
  "syntax": "=GESTEP(Number, Step)",
  "desc": "Tests whether a number is greater than or equal to a threshold, returning 1 or 0.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 120
   },
   {
    "id": "s",
    "label": "Threshold",
    "type": "number",
    "default": 100
   }
  ],
  "expr": "n>=s?1:0",
  "note": null
 },
 {
  "name": "BIN2DEC",
  "category": "Math",
  "syntax": "=BIN2DEC(Binary)",
  "desc": "Converts a binary number to decimal.",
  "inputs": [
   {
    "id": "b",
    "label": "Binary",
    "type": "text",
    "default": "1010"
   }
  ],
  "expr": "parseInt(b,2)",
  "note": null
 },
 {
  "name": "DEC2BIN",
  "category": "Math",
  "syntax": "=DEC2BIN(Decimal)",
  "desc": "Converts a decimal number to binary.",
  "inputs": [
   {
    "id": "n",
    "label": "Decimal",
    "type": "number",
    "default": 10
   }
  ],
  "expr": "Number(n).toString(2)",
  "note": "text"
 },
 {
  "name": "DEC2HEX",
  "category": "Math",
  "syntax": "=DEC2HEX(Decimal)",
  "desc": "Converts a decimal number to hexadecimal.",
  "inputs": [
   {
    "id": "n",
    "label": "Decimal",
    "type": "number",
    "default": 255
   }
  ],
  "expr": "Number(n).toString(16).toUpperCase()",
  "note": "text"
 },
 {
  "name": "HEX2DEC",
  "category": "Math",
  "syntax": "=HEX2DEC(Hex)",
  "desc": "Converts a hexadecimal number to decimal.",
  "inputs": [
   {
    "id": "h",
    "label": "Hex",
    "type": "text",
    "default": "FF"
   }
  ],
  "expr": "parseInt(h,16)",
  "note": null
 },
 {
  "name": "ROMAN",
  "category": "Math",
  "syntax": "=ROMAN(Number)",
  "desc": "Converts a whole number into a Roman numeral.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 1994
   }
  ],
  "expr": "(()=>{const vals=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let num=Math.round(n),out='';for(const [v,s] of vals){while(num>=v){out+=s;num-=v;}}return out;})()",
  "note": "text"
 },
 {
  "name": "CONVERT",
  "category": "Math",
  "syntax": "=CONVERT(Number, FromUnit, ToUnit)",
  "desc": "Converts a number between measurement units, e.g. miles to kilometres.",
  "inputs": [
   {
    "id": "n",
    "label": "Miles",
    "type": "number",
    "default": 10
   }
  ],
  "expr": "n*1.60934",
  "note": null
 },
 {
  "name": "CONCATENATE",
  "category": "Text",
  "syntax": "=CONCATENATE(Text1, Text2, ...)",
  "desc": "Joins several pieces of text into one \u2014 e.g. combining first and last name.",
  "inputs": [
   {
    "id": "a",
    "label": "First name",
    "type": "text",
    "default": "Jamie"
   },
   {
    "id": "b",
    "label": "Last name",
    "type": "text",
    "default": "Chan"
   }
  ],
  "expr": "a+' '+b",
  "note": "text"
 },
 {
  "name": "LEFT",
  "category": "Text",
  "syntax": "=LEFT(Text, NumChars)",
  "desc": "Returns a chosen number of characters from the start of a text string.",
  "inputs": [
   {
    "id": "t",
    "label": "Text",
    "type": "text",
    "default": "INV-2026-0451"
   },
   {
    "id": "n",
    "label": "Characters",
    "type": "number",
    "default": 3
   }
  ],
  "expr": "t.slice(0,Math.round(n))",
  "note": "text"
 },
 {
  "name": "RIGHT",
  "category": "Text",
  "syntax": "=RIGHT(Text, NumChars)",
  "desc": "Returns a chosen number of characters from the end of a text string.",
  "inputs": [
   {
    "id": "t",
    "label": "Text",
    "type": "text",
    "default": "INV-2026-0451"
   },
   {
    "id": "n",
    "label": "Characters",
    "type": "number",
    "default": 4
   }
  ],
  "expr": "t.slice(-Math.round(n))",
  "note": "text"
 },
 {
  "name": "MID",
  "category": "Text",
  "syntax": "=MID(Text, StartNum, NumChars)",
  "desc": "Returns a chunk of characters from the middle of a text string.",
  "inputs": [
   {
    "id": "t",
    "label": "Text",
    "type": "text",
    "default": "INV-2026-0451"
   },
   {
    "id": "s",
    "label": "Start position",
    "type": "number",
    "default": 5
   },
   {
    "id": "n",
    "label": "Characters",
    "type": "number",
    "default": 4
   }
  ],
  "expr": "t.substr(Math.round(s)-1,Math.round(n))",
  "note": "text"
 },
 {
  "name": "LEN",
  "category": "Text",
  "syntax": "=LEN(Text)",
  "desc": "Counts how many characters are in a text string.",
  "inputs": [
   {
    "id": "t",
    "label": "Text",
    "type": "text",
    "default": "INV-2026-0451"
   }
  ],
  "expr": "t.length",
  "note": null
 },
 {
  "name": "LOWER",
  "category": "Text",
  "syntax": "=LOWER(Text)",
  "desc": "Converts text to all lower case.",
  "inputs": [
   {
    "id": "t",
    "label": "Text",
    "type": "text",
    "default": "Finance Team"
   }
  ],
  "expr": "t.toLowerCase()",
  "note": "text"
 },
 {
  "name": "UPPER",
  "category": "Text",
  "syntax": "=UPPER(Text)",
  "desc": "Converts text to all upper case.",
  "inputs": [
   {
    "id": "t",
    "label": "Text",
    "type": "text",
    "default": "Finance Team"
   }
  ],
  "expr": "t.toUpperCase()",
  "note": "text"
 },
 {
  "name": "PROPER",
  "category": "Text",
  "syntax": "=PROPER(Text)",
  "desc": "Capitalises the first letter of each word.",
  "inputs": [
   {
    "id": "t",
    "label": "Text",
    "type": "text",
    "default": "finance team meeting"
   }
  ],
  "expr": "t.replace(/\\w\\S*/g, w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase())",
  "note": "text"
 },
 {
  "name": "TRIM",
  "category": "Text",
  "syntax": "=TRIM(Text)",
  "desc": "Removes extra spaces from text, leaving single spaces between words \u2014 great for cleaning up pasted data.",
  "inputs": [
   {
    "id": "t",
    "label": "Text",
    "type": "text",
    "default": "  Finance   Team  "
   }
  ],
  "expr": "t.trim().replace(/\\s+/g,' ')",
  "note": "text"
 },
 {
  "name": "CLEAN",
  "category": "Text",
  "syntax": "=CLEAN(Text)",
  "desc": "Strips out non-printable characters, often left behind when data is imported from other systems.",
  "inputs": [
   {
    "id": "t",
    "label": "Text",
    "type": "text",
    "default": "Finance\\tTeam"
   }
  ],
  "expr": "t.replace(/[\\t\\n\\r]/g,'')",
  "note": "text"
 },
 {
  "name": "SUBSTITUTE",
  "category": "Text",
  "syntax": "=SUBSTITUTE(Text, OldText, NewText)",
  "desc": "Replaces occurrences of specific text within a string.",
  "inputs": [
   {
    "id": "t",
    "label": "Text",
    "type": "text",
    "default": "Q1 Budget Report"
   },
   {
    "id": "o",
    "label": "Find",
    "type": "text",
    "default": "Q1"
   },
   {
    "id": "nw",
    "label": "Replace with",
    "type": "text",
    "default": "Q2"
   }
  ],
  "expr": "t.split(o).join(nw)",
  "note": "text"
 },
 {
  "name": "REPLACE",
  "category": "Text",
  "syntax": "=REPLACE(Text, StartNum, NumChars, NewText)",
  "desc": "Replaces part of a text string, based on a start position and length, with new text.",
  "inputs": [
   {
    "id": "t",
    "label": "Text",
    "type": "text",
    "default": "INV-2026-0451"
   },
   {
    "id": "s",
    "label": "Start position",
    "type": "number",
    "default": 5
   },
   {
    "id": "n",
    "label": "Characters to replace",
    "type": "number",
    "default": 4
   },
   {
    "id": "nw",
    "label": "New text",
    "type": "text",
    "default": "2027"
   }
  ],
  "expr": "t.slice(0,Math.round(s)-1)+nw+t.slice(Math.round(s)-1+Math.round(n))",
  "note": "text"
 },
 {
  "name": "FIND",
  "category": "Text",
  "syntax": "=FIND(FindText, WithinText)",
  "desc": "Finds the position of one text string within another \u2014 case-sensitive.",
  "inputs": [
   {
    "id": "f",
    "label": "Find",
    "type": "text",
    "default": "2026"
   },
   {
    "id": "t",
    "label": "Within text",
    "type": "text",
    "default": "INV-2026-0451"
   }
  ],
  "expr": "t.indexOf(f)+1",
  "note": null
 },
 {
  "name": "EXACT",
  "category": "Text",
  "syntax": "=EXACT(Text1, Text2)",
  "desc": "Checks whether two text strings are identical, including capitalisation.",
  "inputs": [
   {
    "id": "a",
    "label": "Text 1",
    "type": "text",
    "default": "Finance"
   },
   {
    "id": "b",
    "label": "Text 2",
    "type": "text",
    "default": "finance"
   }
  ],
  "expr": "a===b",
  "note": "text"
 },
 {
  "name": "REPT",
  "category": "Text",
  "syntax": "=REPT(Text, NumTimes)",
  "desc": "Repeats a piece of text a set number of times \u2014 often used to build simple in-cell bar charts.",
  "inputs": [
   {
    "id": "t",
    "label": "Text",
    "type": "text",
    "default": "*"
   },
   {
    "id": "n",
    "label": "Times",
    "type": "number",
    "default": 5
   }
  ],
  "expr": "t.repeat(Math.max(0,Math.round(n)))",
  "note": "text"
 },
 {
  "name": "CODE",
  "category": "Text",
  "syntax": "=CODE(Text)",
  "desc": "Returns the numeric character code for the first letter of a text string.",
  "inputs": [
   {
    "id": "t",
    "label": "Text",
    "type": "text",
    "default": "A"
   }
  ],
  "expr": "t.charCodeAt(0)",
  "note": null
 },
 {
  "name": "CHAR",
  "category": "Text",
  "syntax": "=CHAR(Number)",
  "desc": "Returns the character that corresponds to a numeric character code.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 65
   }
  ],
  "expr": "String.fromCharCode(Math.round(n))",
  "note": "text"
 },
 {
  "name": "VALUE",
  "category": "Text",
  "syntax": "=VALUE(Text)",
  "desc": "Converts text that looks like a number into a true number, so it can be used in calculations.",
  "inputs": [
   {
    "id": "t",
    "label": "Text",
    "type": "text",
    "default": "1,250.50"
   }
  ],
  "expr": "parseFloat(t.replace(/,/g,''))",
  "note": null
 },
 {
  "name": "TEXT",
  "category": "Text",
  "syntax": "=TEXT(Number, \"Format\")",
  "desc": "Converts a number into text, formatted the way you choose \u2014 e.g. as currency or a percentage.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 1250.5
   },
   {
    "id": "fmt",
    "label": "Format",
    "type": "select",
    "default": "currency"
   }
  ],
  "expr": "TEXT_FORMAT_DEMO",
  "note": "text"
 },
 {
  "name": "DOLLAR",
  "category": "Text",
  "syntax": "=DOLLAR(Number, Decimals)",
  "desc": "Converts a number into text formatted as currency, with a set number of decimal places.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 1250.5
   },
   {
    "id": "d",
    "label": "Decimals",
    "type": "number",
    "default": 2
   }
  ],
  "expr": "'\u00a3'+n.toFixed(Math.round(d))",
  "note": "text"
 },
 {
  "name": "FIXED",
  "category": "Text",
  "syntax": "=FIXED(Number, Decimals)",
  "desc": "Rounds a number and converts it to text with a fixed number of decimal places and thousand separators.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 1250.5
   },
   {
    "id": "d",
    "label": "Decimals",
    "type": "number",
    "default": 2
   }
  ],
  "expr": "n.toLocaleString('en-GB',{minimumFractionDigits:Math.round(d),maximumFractionDigits:Math.round(d)})",
  "note": "text"
 },
 {
  "name": "IF",
  "category": "Logical",
  "syntax": "=IF(Condition, ValueIfTrue, ValueIfFalse)",
  "desc": "Tests a condition and returns one value if it's true and another if it's false \u2014 the backbone of most business logic in spreadsheets.",
  "inputs": [
   {
    "id": "n",
    "label": "Invoice amount (\u00a3)",
    "type": "number",
    "default": 6000
   },
   {
    "id": "t",
    "label": "Approval threshold (\u00a3)",
    "type": "number",
    "default": 5000
   }
  ],
  "expr": "n>t?'Needs manager approval':'Auto-approved'",
  "note": "text"
 },
 {
  "name": "AND",
  "category": "Logical",
  "syntax": "=AND(Condition1, Condition2, ...)",
  "desc": "Returns TRUE only if every condition supplied is true.",
  "inputs": [
   {
    "id": "a",
    "label": "Invoice approved",
    "type": "select",
    "default": "true"
   },
   {
    "id": "b",
    "label": "Budget available",
    "type": "select",
    "default": "true"
   }
  ],
  "expr": "(a==='true')&&(b==='true')",
  "note": "text"
 },
 {
  "name": "OR",
  "category": "Logical",
  "syntax": "=OR(Condition1, Condition2, ...)",
  "desc": "Returns TRUE if at least one of the conditions supplied is true.",
  "inputs": [
   {
    "id": "a",
    "label": "Over budget",
    "type": "select",
    "default": "false"
   },
   {
    "id": "b",
    "label": "Missing PO number",
    "type": "select",
    "default": "true"
   }
  ],
  "expr": "(a==='true')||(b==='true')",
  "note": "text"
 },
 {
  "name": "NOT",
  "category": "Logical",
  "syntax": "=NOT(Condition)",
  "desc": "Reverses TRUE to FALSE and FALSE to TRUE.",
  "inputs": [
   {
    "id": "a",
    "label": "Condition",
    "type": "select",
    "default": "true"
   }
  ],
  "expr": "!(a==='true')",
  "note": "text"
 },
 {
  "name": "N",
  "category": "Logical",
  "syntax": "=N(Value)",
  "desc": "Converts a value to a number: TRUE becomes 1, text becomes 0.",
  "inputs": [
   {
    "id": "v",
    "label": "Value",
    "type": "select",
    "default": "true"
   }
  ],
  "expr": "v==='true'?1:0",
  "note": null
 },
 {
  "name": "NA",
  "category": "Logical",
  "syntax": "=NA()",
  "desc": "Deliberately returns the #N/A error, often used as a placeholder in charts or checks.",
  "inputs": [],
  "expr": "'#N/A'",
  "note": "text"
 },
 {
  "name": "T",
  "category": "Logical",
  "syntax": "=T(Value)",
  "desc": "Returns the text itself if the value is text, or an empty string if it's a number.",
  "inputs": [
   {
    "id": "v",
    "label": "Value",
    "type": "text",
    "default": "Finance"
   }
  ],
  "expr": "v",
  "note": "text"
 },
 {
  "name": "ERROR.TYPE",
  "category": "Logical",
  "syntax": "=ERROR.TYPE(ErrorValue)",
  "desc": "Identifies which type of error a cell contains, returning a number code for each error type.",
  "inputs": [
   {
    "id": "e",
    "label": "Error",
    "type": "select",
    "default": "#DIV/0!"
   }
  ],
  "expr": "ERRTYPE_DEMO",
  "note": null
 },
 {
  "name": "ISBLANK",
  "category": "Logical",
  "syntax": "=ISBLANK(Value)",
  "desc": "Checks whether a cell is empty.",
  "inputs": [
   {
    "id": "t",
    "label": "Cell contents",
    "type": "text",
    "default": ""
   }
  ],
  "expr": "t===''",
  "note": "text"
 },
 {
  "name": "ISNUMBER",
  "category": "Logical",
  "syntax": "=ISNUMBER(Value)",
  "desc": "Checks whether a value is a number.",
  "inputs": [
   {
    "id": "t",
    "label": "Value",
    "type": "text",
    "default": "1250"
   }
  ],
  "expr": "!isNaN(parseFloat(t))&&isFinite(t)",
  "note": "text"
 },
 {
  "name": "ISTEXT",
  "category": "Logical",
  "syntax": "=ISTEXT(Value)",
  "desc": "Checks whether a value is text.",
  "inputs": [
   {
    "id": "t",
    "label": "Value",
    "type": "text",
    "default": "Finance"
   }
  ],
  "expr": "isNaN(parseFloat(t))",
  "note": "text"
 },
 {
  "name": "ISNONTEXT",
  "category": "Logical",
  "syntax": "=ISNONTEXT(Value)",
  "desc": "Checks whether a value is anything other than text.",
  "inputs": [
   {
    "id": "t",
    "label": "Value",
    "type": "text",
    "default": "1250"
   }
  ],
  "expr": "!isNaN(parseFloat(t))",
  "note": "text"
 },
 {
  "name": "ISLOGICAL",
  "category": "Logical",
  "syntax": "=ISLOGICAL(Value)",
  "desc": "Checks whether a value is TRUE or FALSE.",
  "inputs": [
   {
    "id": "t",
    "label": "Value",
    "type": "select",
    "default": "true"
   }
  ],
  "expr": "t==='true'||t==='false'",
  "note": "text"
 },
 {
  "name": "ISERR",
  "category": "Logical",
  "syntax": "=ISERR(Value)",
  "desc": "Checks whether a value is any error except #N/A.",
  "inputs": [
   {
    "id": "t",
    "label": "Value",
    "type": "select",
    "default": "#DIV/0!"
   }
  ],
  "expr": "t!=='OK'&&t!=='#N/A'",
  "note": "text"
 },
 {
  "name": "ISERROR",
  "category": "Logical",
  "syntax": "=ISERROR(Value)",
  "desc": "Checks whether a value is any kind of error, including #N/A \u2014 commonly wrapped around risky formulas.",
  "inputs": [
   {
    "id": "t",
    "label": "Value",
    "type": "select",
    "default": "#DIV/0!"
   }
  ],
  "expr": "t!=='OK'",
  "note": "text"
 },
 {
  "name": "ISNA",
  "category": "Logical",
  "syntax": "=ISNA(Value)",
  "desc": "Checks specifically for the #N/A error, usually from a failed lookup.",
  "inputs": [
   {
    "id": "t",
    "label": "Value",
    "type": "select",
    "default": "#N/A"
   }
  ],
  "expr": "t==='#N/A'",
  "note": "text"
 },
 {
  "name": "ISEVEN",
  "category": "Logical",
  "syntax": "=ISEVEN(Number)",
  "desc": "Checks whether a number is even.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 8
   }
  ],
  "expr": "Math.round(n)%2===0",
  "note": "text"
 },
 {
  "name": "ISODD",
  "category": "Logical",
  "syntax": "=ISODD(Number)",
  "desc": "Checks whether a number is odd.",
  "inputs": [
   {
    "id": "n",
    "label": "Number",
    "type": "number",
    "default": 7
   }
  ],
  "expr": "Math.abs(Math.round(n)%2)===1",
  "note": "text"
 },
 {
  "name": "ISREF",
  "category": "Logical",
  "syntax": "=ISREF(Value)",
  "desc": "Checks whether a value is a valid cell reference.",
  "inputs": [
   {
    "id": "t",
    "label": "Reference text",
    "type": "text",
    "default": "C4"
   }
  ],
  "expr": "/^[A-Za-z]+[0-9]+$/.test(t)",
  "note": "text"
 }
];
