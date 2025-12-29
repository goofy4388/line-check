/* =========================================================
   DAILY KITCHEN EXECUTION (LINE CHECK)
   - AM/PM tabs
   - 1 checkbox per item (Executed)
   - Keeps: Item + Utensil + Shelf Life + Target Temp
   - Note + Photo per item
   - Submit => PDF download
   - Reset shift / reset all
========================================================= */

const $ = (s) => document.querySelector(s);

const sectionsEl = $("#sections");
const submitBtn = $("#submitBtn");
const resetShiftBtn = $("#resetShiftBtn");
const resetAllBtn = $("#resetAllBtn");
const statusEl = $("#status");

let shift = "am";

const it = (item, utensil="", life="", target="") => ({ item, utensil, life, target });

// ✅ Your “Daily Kitchen Execution” list
// (This is the same structure we used before. You can edit the text anytime.)
const CHECKLIST = [
  { title:"APPS", rows:[
    it("Sanitizer Bucket","Test strips","2 HR",""),
    it("Lemons, Wedges","","1 DAY",""),
    it("Salt & Black Pepper","","1 DAY",""),
    it("French Fries","8 WT OZ","FROZEN",""),
    it("Rosemary Parm Seasoning","Shaker","1 DAY",""),
    it("Zucchini","6 WT OZ","2 DAYS",""),
    it("Calamari in Brine","4 OZ SPOODLE","2 DAYS",""),
    it("Calamari Batter","1 CUP","1 DAY",""),
    it("Ricotta Cheese","1 OZ LADLE / soup spoon","3 DAYS",""),
    it("Soup of the Day (Cold)","8 OZ LADLE","5 DAYS",""),
    it("Short Rib","","4 DAYS","")
  ]},
  { title:"SALAD", rows:[
    it("Sanitizer Bucket","Test strips","2 HR",""),
    it("Roasted Red Peppers","½\" x 1½\" strips","3 DAYS",""),
    it("Chopped Basil","Wet paper towel","1 DAY",""),
    it("Romaine","2 CUP MEASURE","3 DAYS","41°F or less"),
    it("Caesar Dressing","1½ OZ LADLE","6 DAYS","41°F or less"),
    it("Vinaigrette Dressing","1½ OZ LADLE","4 DAYS","41°F or less")
  ]},
  { title:"DESSERTS", rows:[
    it("Mint Sprigs","","1 DAY",""),
    it("Powdered Sugar","Shaker / fine lid","1 DAY",""),
    it("Cocoa Powder","Shaker / fine lid","1 DAY",""),
    it("Vanilla Ice Cream","#12 scoop","FROZEN",""),
    it("Cannoli Filling","Pastry bag","5 DAYS","41°F or less")
  ]},
  { title:"GRILL", rows:[
    it("Sanitizer Bucket","Test strips","2 HR",""),
    it("Chicken, 8oz","Ice bag/drip set","3 DAYS","41°F or less"),
    it("Sirloin, 7oz","Drip set","2 DAYS","41°F or less"),
    it("Salmon, 8oz","Ice bag/drip set","3 DAYS","41°F or less"),
    it("Scallops 13/15","Ice bag/drip set","3 DAYS","41°F or less")
  ]},
  { title:"STATION 1", rows:[
    it("Sanitizer Bucket","Test strips","2 HR",""),
    it("Parsley","Shaker","4 HR",""),
    it("Sliced Garlic","1 OZ LADLE","1 DAY","41°F or less"),
    it("Alfredo Base","4 OZ LADLE","5 DAYS","41°F or less"),
    it("Pomodoro Sauce","6 OZ LADLE","4 DAYS","41°F or less")
  ]},
  { title:"STATION 2", rows:[
    it("Sanitizer Bucket","Test strips","2 HR",""),
    it("Vodka","1 OZ LADLE","1 DAY",""),
    it("Chopped Garlic","1 tsp","1 DAY",""),
    it("Parsley","Shaker","4 HR",""),
    it("Meatballs (Cold)","Tongs","4 DAYS","41°F or less"),
    it("Lobster Cream Sauce","4 OZ LADLE","4 DAYS","41°F or less")
  ]},
  { title:"ALTO SHAAM / STEAM WELL", rows:[
    it("Pomodoro","2 & 4 oz ladles","4 HR","150°F"),
    it("Mashed Potatoes","#8 scoop","4 HR","150°F"),
    it("Meatballs","Slotted spoon","4 HR","150°F"),
    it("Lasagne","Spatula","4 HR","150°F")
  ]},
  { title:"TENDER SHACK", rows:[
    it("Pickles","Tongs","3 DAYS","41°F or less"),
    it("Chicken Tenders","Air tight container","7 DAYS","41°F or less"),
    it("Sauce, Ranch","1½ oz portions","7 DAYS","41°F or less"),
    it("Nash Hot Seasoning","Shaker tsp & tbs","14 DAYS","")
  ]}
];

// STATE
const state = { am:{}, pm:{} };
for (const sec of CHECKLIST) {
  state.am[sec.title] = sec.rows.map(r => ({ ...r, done:false, note:"", photo:null }));
  state.pm[sec.title] = sec.rows.map(r => ({ ...r, done:false, note:"", photo:null }));
}

// RENDER
function render(){
  sectionsEl.innerHTML = "";

  for (const sec of CHECKLIST) {
    const card = document.createElement("div");
    card.className = "section";

    const h2 = document.createElement("h2");
    h2.textContent = sec.title;
    card.appendChild(h2);

    const legend = document.createElement("div");
    legend.className = "legend";
    legend.innerHTML = `
      <div>✔</div>
      <div>Item</div>
      <div>Utensil</div>
      <div>Life</div>
      <div>Target</div>
      <div>Note</div>
      <div>Photo</div>
    `;
    card.appendChild(legend);

    for (const row of state[shift][sec.title]) {
      const r = document.createElement("div");
      r.className = "row";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = row.done;
      cb.onchange = () => row.done = cb.checked;

      const item = document.createElement("div");
      item.className = "itemText";
      item.textContent = row.item;

      const ut = document.createElement("div");
      ut.className = "muted";
      ut.textContent = row.utensil || "—";

      const life = document.createElement("div");
      life.className = "muted";
      life.textContent = row.life || "—";

      const tgt = document.createElement("div");
      tgt.className = "muted";
      tgt.textContent = row.target || "—";

      const note = document.createElement("input");
      note.className = "note";
      note.type = "text";
      note.placeholder = "Note (optional)";
      note.value = row.note;
      note.oninput = () => row.note = note.value;

      const photo = document.createElement("input");
      photo.className = "photo";
      photo.type = "file";
      photo.accept = "image/*";
      photo.capture = "environment";
      photo.onchange = (e) => row.photo = e.target.files?.[0] || null;

      r.append(cb, item, ut, life, tgt, note, photo);
      card.appendChild(r);
    }

    sectionsEl.appendChild(card);
  }
}

// TABS
document.querySelectorAll(".tab").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    shift = btn.dataset.shift;
    render();
  });
});

// RESETS
function resetCurrentShift(){
  if (!confirm(`Reset ${shift.toUpperCase()} shift?`)) return;
  for (const sec of CHECKLIST) {
    for (const row of state[shift][sec.title]) {
      row.done = false;
      row.note = "";
      row.photo = null;
    }
  }
  render();
}

function resetAll(){
  if (!confirm("Reset ALL (AM + PM + header fields)?")) return;

  for (const s of ["am","pm"]) {
    for (const sec of CHECKLIST) {
      for (const row of state[s][sec.title]) {
        row.done = false;
        row.note = "";
        row.photo = null;
      }
    }
  }

  $("#manager").value = "";
  $("#store").value = "";
  $("#equipNotes").value = "";
  $("#issues").value = "";

  const now = new Date();
  $("#date").value = now.toISOString().slice(0,10);
  $("#time").value = now.toTimeString().slice(0,5);

  render();
}

resetShiftBtn.addEventListener("click", resetCurrentShift);
resetAllBtn.addEventListener("click", resetAll);

// PDF HELPERS
function fileToDataUrl(file){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// PDF
submitBtn.addEventListener("click", async ()=>{
  statusEl.className = "status";
  statusEl.textContent = "Building PDF…";

  try{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit:"pt", format:"letter" });

    const margin = 40;
    const pageH = doc.internal.pageSize.getHeight();
    const pageW = doc.internal.pageSize.getWidth();
    const maxW = pageW - margin*2;
    let y = margin;

    const ensure = (h) => {
      if (y + h > pageH - margin) { doc.addPage(); y = margin; }
    };

    const manager = $("#manager").value || "";
    const store = $("#store").value || "";
    const date = $("#date").value || "";
    const time = $("#time").value || "";
    const equipNotes = $("#equipNotes").value || "";
    const issues = $("#issues").value || "";

    doc.setFont("helvetica","bold"); doc.setFontSize(15);
    doc.text(`Daily Kitchen Execution — ${shift.toUpperCase()}`, margin, y); y += 18;

    doc.setFont("helvetica","normal"); doc.setFontSize(10);
    const header = [
      manager ? `Manager: ${manager}` : "",
      store ? `Store: ${store}` : "",
      `Date: ${date}  Time: ${time}`,
      equipNotes ? `Equipment: ${equipNotes}` : "",
      issues ? `Issues: ${issues}` : ""
    ].filter(Boolean).join("   |   ");

    const wrapped = doc.splitTextToSize(header, maxW);
    doc.text(wrapped, margin, y);
    y += wrapped.length * 12 + 10;

    for (const sec of CHECKLIST) {
      ensure(24);
      doc.setFont("helvetica","bold"); doc.setFontSize(12);
      doc.text(sec.title, margin, y); y += 12;

      doc.setFont("helvetica","normal"); doc.setFontSize(9);
      const headerRow = "Exec  Item  | Utensil | Life | Target | Note";
      doc.text(headerRow, margin, y); y += 12;

      for (const row of state[shift][sec.title]) {
        const prefix = row.done ? "✅" : "⬜";
        const line = `${prefix} ${row.item} | ${row.utensil || "—"} | ${row.life || "—"} | ${row.target || "—"}${row.note ? " | " + row.note : ""}`;
        const lines = doc.splitTextToSize(line, maxW);
        ensure(lines.length * 12 + 6);
        doc.text(lines, margin, y);
        y += lines.length * 12 + 2;

        if (row.photo) {
          const dataUrl = await fileToDataUrl(row.photo);
          ensure(120);
          doc.addImage(dataUrl, "JPEG", margin, y, 160, 110);
          y += 115;
        }
      }

      y += 8;
    }

    const safeStore = (store || "Store").replace(/[^a-z0-9]+/gi,"-");
    doc.save(`LineCheck-${shift.toUpperCase()}-${safeStore}-${date || "date"}.pdf`);

    statusEl.className = "status ok";
    statusEl.textContent = "PDF downloaded.";
  } catch (e) {
    statusEl.className = "status err";
    statusEl.textContent = `PDF Error: ${e?.message || e}`;
  }
});

// INIT
(() => {
  const now = new Date();
  $("#date").value = now.toISOString().slice(0,10);
  $("#time").value = now.toTimeString().slice(0,5);
  render();
})();