/* =========================================================
   BBI Internal Checklist (same engine)
========================================================= */
const $ = (s) => document.querySelector(s);

function showDebug(html) {
  const d = $("#debug");
  if (!d) return;
  d.style.display = "block";
  d.innerHTML = html;
}

window.addEventListener("error", (e) => {
  showDebug(`<b>JS ERROR:</b> ${e.message || e}<br><small>${e.filename || ""}:${e.lineno || ""}</small>`);
});

function must(id){
  const el = document.getElementById(id);
  if (!el) throw new Error(`Missing element #${id} in HTML`);
  return el;
}

const sectionsEl = must("sections");
const submitBtn = must("submitBtn");
const resetShiftBtn = must("resetShiftBtn");
const resetAllBtn = must("resetAllBtn");
const statusEl = must("status");
const pdfIncludeAllEl = must("pdfIncludeAll");
const pdfEmbedPhotosEl = must("pdfEmbedPhotos");

let shift = "am";
const it = (item, standard="", freq="", target="") => ({ item, standard, freq, target });

/* ============================
   PASTE YOUR REAL BBI ITEMS HERE
   Example:
   { title:"FOOD SAFETY", rows:[ it("Thermometers present","Present","Daily",""), ... ] }
============================ */
const CHECKLIST = [
  { title:"PASTE BBI SECTION NAME", rows:[
    it("PASTE ITEM 1","Standard/How","Frequency","Target (optional)"),
    it("PASTE ITEM 2","Standard/How","Frequency","Target (optional)")
  ]}
];

const state = { am:{}, pm:{} };
for (const sec of CHECKLIST) {
  state.am[sec.title] = sec.rows.map(r => ({ ...r, done:false, note:"", photo:null }));
  state.pm[sec.title] = sec.rows.map(r => ({ ...r, done:false, note:"", photo:null }));
}

function setStatus(msg, ok=null){
  statusEl.className = "status" + (ok===true ? " ok" : ok===false ? " err" : "");
  statusEl.textContent = msg;
}

function fileToDataUrl(file){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

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
      <div>✔</div><div>Item</div><div>Standard</div><div>Freq</div><div>Target</div><div>Note</div><div>Photo</div>
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

      const standard = document.createElement("div");
      standard.className = "muted";
      standard.textContent = row.standard || "—";

      const freq = document.createElement("div");
      freq.className = "muted";
      freq.textContent = row.freq || "—";

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

      r.append(cb, item, standard, freq, tgt, note, photo);
      card.appendChild(r);
    }

    sectionsEl.appendChild(card);
  }
}

document.querySelectorAll(".tab").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".tab").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    shift = btn.dataset.shift || "am";
    render();
  });
});

function resetCurrentShift(){
  if (!confirm(`Reset ${shift.toUpperCase()} shift checklist?`)) return;
  for (const sec of CHECKLIST) for (const row of state[shift][sec.title]) { row.done=false; row.note=""; row.photo=null; }
  render();
}

function resetAll(){
  if (!confirm("Reset ALL (AM + PM + header fields)?")) return;

  for (const s of ["am","pm"]) for (const sec of CHECKLIST) for (const row of state[s][sec.title]) { row.done=false; row.note=""; row.photo=null; }

  $("#manager").value = "";
  $("#store").value = "";

  const now = new Date();
  $("#date").value = now.toISOString().slice(0,10);
  $("#time").value = now.toTimeString().slice(0,5);

  pdfIncludeAllEl.checked = false;
  pdfEmbedPhotosEl.checked = false;

  render();
}

resetShiftBtn.addEventListener("click", resetCurrentShift);
resetAllBtn.addEventListener("click", resetAll);

submitBtn.addEventListener("click", async ()=>{
  try{
    setStatus("Building PDF…");

    const includeAll = pdfIncludeAllEl.checked;
    const embedPhotos = pdfEmbedPhotosEl.checked;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit:"pt", format:"letter" });

    const margin = 40;
    const pageH = doc.internal.pageSize.getHeight();
    const pageW = doc.internal.pageSize.getWidth();
    const maxW = pageW - margin*2;
    let y = margin;

    const ensure = (h) => { if (y + h > pageH - margin) { doc.addPage(); y = margin; } };

    const manager = $("#manager").value || "";
    const store = $("#store").value || "";
    const date = $("#date").value || "";
    const time = $("#time").value || "";

    doc.setFont("helvetica","bold"); doc.setFontSize(15);
    doc.text(`BBI Internal — ${shift.toUpperCase()}`, margin, y); y += 18;

    doc.setFont("helvetica","normal"); doc.setFontSize(10);
    const header = [`Manager: ${manager}`, `Store: ${store}`, `Date: ${date}  Time: ${time}`].filter(Boolean).join("   |   ");
    const wrappedHeader = doc.splitTextToSize(header, maxW);
    doc.text(wrappedHeader, margin, y);
    y += wrappedHeader.length * 12 + 10;

    if (!includeAll) {
      let any = false;
      for (const sec of CHECKLIST) {
        for (const row of state[shift][sec.title]) {
          if (row.done || (row.note && row.note.trim()) || row.photo) { any = true; break; }
        }
        if (any) break;
      }
      if (!any) { setStatus("Nothing marked. Check at least one item (or add a note/photo).", false); return; }
    }

    let photoCount = 0;

    for (const sec of CHECKLIST) {
      const secRows = state[shift][sec.title].filter(r => includeAll || r.done || (r.note && r.note.trim()) || r.photo);
      if (!secRows.length) continue;

      ensure(26);
      doc.setFont("helvetica","bold"); doc.setFontSize(12);
      doc.text(sec.title, margin, y); y += 14;

      doc.setFont("helvetica","normal"); doc.setFontSize(9);
      doc.text("Exec | Item | Standard | Freq | Target | Note | Photo", margin, y);
      y += 12;

      for (const row of secRows) {
        const prefix = row.done ? "✅" : "⬜";
        const photoFlag = row.photo ? "YES" : "NO";
        const line = `${prefix} | ${row.item} | ${row.standard || "—"} | ${row.freq || "—"} | ${row.target || "—"} | ${row.note || ""} | ${photoFlag}`;
        const lines = doc.splitTextToSize(line, maxW);

        ensure(lines.length * 12 + 6);
        doc.text(lines, margin, y);
        y += lines.length * 12 + 2;

        if (embedPhotos && row.photo) {
          photoCount++;
          setStatus(`Embedding photo ${photoCount}… (slow)`);
          const dataUrl = await fileToDataUrl(row.photo);
          ensure(150);
          doc.setFont("helvetica","italic"); doc.setFontSize(9);
          doc.text("Photo:", margin, y); y += 10;
          doc.addImage(dataUrl, "JPEG", margin, y, 200, 140);
          y += 150;
          doc.setFont("helvetica","normal"); doc.setFontSize(9);
        }
      }

      y += 10;
    }

    const safeStore = (store || "Store").replace(/[^a-z0-9]+/gi,"-");
    doc.save(`BBI-${shift.toUpperCase()}-${safeStore}-${date || "date"}.pdf`);
    setStatus("PDF downloaded.", true);
  } catch (e) {
    setStatus(`PDF Error: ${e?.message || e}`, false);
    showDebug(`<b>PDF Error:</b> ${e?.message || e}`);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const now = new Date();
  $("#date").value = now.toISOString().slice(0,10);
  $("#time").value = now.toTimeString().slice(0,5);
  render();
});