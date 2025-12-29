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
  const CHECKLIST = [
  { title:"APPS", rows:[
    it("Sanitizer Bucket","Test strips","2 HR",""),
    it("Lemons, Wedges","","1 DAY",""),
    it("Salt & Black Pepper","","1 DAY",""),
    it("French Fries","8 WT OZ","FROZEN",""),
    it("Rosemary Parm Seasoning","Shaker","3 DAYS",""),
    it("Zucchini","6 WT OZ","2 DAYS",""),
    it("Calamari in Brine","4 OZ SPOODLE","2 DAYS",""),
    it("Calamari Batter","1 CUP","1 DAY",""),
    it("Buttermilk","","1 DAY",""),
    it("Ketchup","1½ OZ LADLE","3 DAYS",""),
    it("Roasted Garlic Aioli","1½ OZ LADLE","3 DAYS",""),
    it("Mezze Tubetti","2 OZ SPOODLE","2 DAYS",""),
    it("Mozz Marinara","","2 DAYS",""),
    it("Eggplant, Breaded","","2 DAYS",""),
    it("Mozzarella, Slices","HALVED","4 DAYS",""),
    it("Ricotta Cheese","1 OZ LADLE / SOUP SPOON","3 DAYS",""),
    it("Marinara Sauce","2 & 3 OZ LADLE","4 DAYS",""),
    it("Ricardo Sauce","3 OZ LADLE","4 DAYS",""),
    it("Chix Soup (Cold)","8 OZ LADLE","5 DAYS",""),
    it("Soup of the Day (Cold)","8 OZ LADLE","5 DAYS",""),
    it("Pesto","","4 DAYS",""),
    it("Prepared Garlic Bread","","2 DAYS",""),
    it("Grilled Focaccia","","2 DAYS",""),
    it("Prepared Focaccia Slider Buns","","2 DAYS",""),
    it("Prepared Open Face Focaccia","","2 DAYS",""),
    it("Delimeat Portion","PORTIONED","3 DAYS",""),
    it("Grilled Sliced Sirloin (2mm)","4 WT OZ PORTIONED","2 DAYS",""),
    it("Grilled Sliced Chicken","4 WT OZ PORTIONED","2 DAYS",""),
    it("Chopped Seasoned Burrata","#40 SCOOP","2 DAYS",""),
    it("Tomato Caprese Topping","2 OZ SPOODLE","2 DAYS",""),
    it("Sausage Arancini","6 EACH","2 DAYS",""),
    it("Spinach Arancini","8 EACH","2 DAYS",""),
    it("Marinara Sauce (Hot)","3 OZ LADLE","4 DAYS",""),
    it("Mezzaluna Fritte","4 EACH + 8 EACH","1 DAYS",""),
    it("Sugo Rosa Sauce","2 OZ + 3 OZ LADLE","2 DAYS",""),
    it("Crab Cakes","2 EACH","2 DAYS",""),
    it("Gorgonzola Sauce","1½ OZ LADLE","4 DAYS",""),
    it("Roasted Jumbo Wings","PORTIONED","2 DAYS",""),
    it("Spicy Sicilian Butter","#40 SCOOP","7 DAYS",""),
    it("Gorgonzola Cheese","1½ OZ LADLE","4 DAYS",""),
    it("Short Rib","","4 DAYS","")
  ]},

  { title:"SALAD", rows:[
    it("Sanitizer Bucket","Test strips","2 HR",""),
    it("Roasted Red Peppers","½\" x 1½\" strips","3 DAYS","41°F or less"),
    it("Chopped Basil","Wet paper towel","1 DAY","41°F or less"),
    it("Red Onions","","1 DAY","41°F or less"),
    it("Sliced Carrots","2 OZ SPOODLE","2 DAYS","41°F or less"),
    it("Red Cabbage","3 OZ SPOODLE","2 DAYS","41°F or less"),
    it("Ricotta Salata","GRATER","4 DAYS","41°F or less"),
    it("Pepperoncini","MINI TONGS / DRIP SET","3 DAYS","41°F or less"),
    it("Kalamata Olives","MINI TONGS / DRIP SET","3 DAYS","41°F or less"),
    it("Salt & Black Pepper","","1 DAY",""),
    it("Balsamic Glaze","OG CONTAINER","30 DAYS",""),
    it("EVOO","½ OZ LADLE","30 DAYS",""),
    it("Burrata","SLOTTED SPOON","3 DAYS","41°F or less"),
    it("Romaine","2 CUP MEASURE","3 DAYS","41°F or less"),
    it("Shredded Parm","½ OZ LADLE","3 DAYS","41°F or less"),
    it("Grape Tomatoes","5 EA (SIDE SALAD) / 8 OZ SPOODLE","1 DAY","41°F or less"),
    it("Croutons","","3 DAYS",""),
    it("Gorgonzola Crumbles","1 OZ LADLE","4 DAYS","41°F or less"),
    it("Light Balsamic Dressing","1½ OZ LADLE","7 DAYS","41°F or less"),
    it("Parmesan Dressing","1½ OZ LADLE","6 DAYS","41°F or less"),
    it("Caesar Dressing","1½ OZ LADLE","6 DAYS","41°F or less"),
    it("Vinaigrette Dressing","1½ OZ LADLE","4 DAYS","41°F or less")
  ]},

  { title:"ALTO SHAAM & STEAM WELL", rows:[
    it("Chicken Soup (150°)","8 OZ LADLE","4 HR","150°F"),
    it("Soup of the Day (150°)","8 OZ LADLE","4 HR","150°F"),
    it("Marinara Sauce (150°)","3 OZ LADLE","4 HR","150°F"),
    it("Pomodoro Sauce (150°)","2 & 4 OZ LADLES","4 HR","150°F")
  ]},

  { title:"MERRY CHEF", rows:[
    it("Spiedino Breading","1 TEASPOON","4 DAYS",""),
    it("Stuffed Mushrooms","","3 DAYS",""),
    it("Parsley Sprigs","STORED IN ICE WATER","1 DAY",""),
    it("Sugo Rosa Sauce","2 OZ LADLE","4 DAYS",""),
    it("Meatballs","TONGS","4 DAYS",""),
    it("Pomodoro","2 & 4 OZ LADLES","4 DAYS","")
  ]},

  { title:"TENDER SHACK", rows:[
    it("Pickles","TONGS","3 DAYS","41°F or less"),
    it("Shredded Romaine","½ MEASURING CUP","2 DAYS","41°F or less"),
    it("Choc. Chunk Cookie","","2 DAYS",""),
    it("Brioche Buns","AIR TIGHT CONTAINER","7 DAYS",""),
    it("Chicken Tenders","ICE BAG/DRIP SET","3 DAYS","41°F or less"),
    it("Prepped Chx Tenders","PLASTIC WRAP/ICE BAG","2 DAYS","41°F or less"),
    it("Soda Batter","WIRE WHIP","2 DAYS",""),
    it("Chicken Breader","BREADER STATION SETUP","",""),
    it("Creole Seasoning","SHAKER","1 DAY",""),
    it("Tender Shack Sauce","1½ OZ LADLE & 1½ PORTIONS","7 DAYS","41°F or less"),
    it("Sauce, Ranch","1½ OZ PORTIONS","7 DAYS","41°F or less"),
    it("Sauce, Buffalo","1½ OZ PORTIONS","8 DAYS","41°F or less"),
    it("Sauce, Honey Mustard","1½ OZ PORTIONS","7 DAYS","41°F or less"),
    it("Sauce, BBQ","1½ OZ PORTIONS","7 DAYS","41°F or less"),
    it("Nash, Hot Seasoning","SHAKER TSP & TBS","14 DAYS","")
  ]},

  { title:"DESSERTS", rows:[
    it("Mint Sprigs","","1 DAY",""),
    it("Powdered Sugar","SHAKER/FINE LID","1 DAY",""),
    it("Cocoa Powder","SHAKER/FINE LID","1 DAY",""),
    it("Pistachios","","3 DAYS",""),
    it("Mini Cannoli Shells","ROOM TEMP","3 DAYS",""),
    it("Cannoli Filling","PASTRY BAG","5 DAYS","41°F or less"),
    it("Cannoli Cake","DESSERT SPATULA","3 DAYS","41°F or less"),
    it("John Cole Nuts","3 OZ SPOODLE","2 DAYS",""),
    it("Salted Caramel","1 & 1½ OZ LADLES","5 DAYS",""),
    it("Vanilla Ice Cream","#12 SCOOP","FROZEN",""),
    it("Choc Shavings","","2 DAYS",""),
    it("Tiramisu","DESSERT SPATULA","3 DAYS","41°F or less"),
    it("Strawberry Sauce","1½ OZ LADLE","6 DAYS","41°F or less"),
    it("Cheesecake","DESSERT SPATULA","3 DAYS","41°F or less"),
    it("Sogno","DESSERT SPATULA","3 DAYS","41°F or less"),
    it("Chocolate Sauce","SQUEEZE BTL, 1½ OZ LADLE","4 HR",""),
    it("Peanut Butter Brownie","DESSERT SPATULA","3 DAYS",""),
    it("Walnut Brittle","½ OZ LADLE","4 DAYS","")
  ]},

  { title:"GRILL (LINE CHECK)", rows:[
    it("Sanitizer Bucket","Test strips","2 HR",""),
    it("Soybean Oil","Towel, spray bottle","1 DAY",""),
    it("Spiedino Breading","Mixing bowl","1 DAY",""),
    it("Salt & White Pepper","","1 DAY",""),
    it("Chicken, 8 oz","Ice bag/drip set","3 DAYS","41°F or less"),
    it("Prepped Rosa","","",""),
    it("Filet, 9 oz","Drip set","2 DAYS","41°F or less"),
    it("Sirloin, 7 & 10 oz","Drip set","2 DAYS","41°F or less"),
    it("Ribeye, 16 oz","Drip set","2 DAYS","41°F or less"),
    it("Pork Chop, 8 oz","Drip set","2 DAYS","41°F or less"),
    it("Salmon, 8 oz","Ice bag/drip set","3 DAYS","41°F or less"),
    it("Branzino","Ice bag/drip set","3 DAYS","41°F or less"),
    it("Scallops 13/15","Ice bag/drip set","3 DAYS","41°F or less"),
    it("Shrimp 21/25","Ice bag/drip set","3 DAYS","41°F or less"),
    it("Spiedinos","","1 DAY",""),
    it("Grill Baste","Brush, ice bag","6 DAYS",""),
    it("Grill Seasoning","Shaker","1 DAY",""),
    it("Goat Cheese Slices","","4 DAYS","41°F or less"),
    it("Pesto","Tablespoon","4 DAYS","41°F or less")
  ]},

  { title:"STATION 1 (LINE CHECK)", rows:[
    it("Sanitizer Bucket","Test strips","2 HR",""),
    it("Parsley","Shaker","4 HR",""),
    it("Lemons, Wedges","","1 DAY",""),
    it("Basil Leaves, Whole","","1 DAY",""),
    it("Basil, Chopped","","1 DAY",""),
    it("Gluten Free Pasta","3 WT OZ / 7 WT OZ","1 DAY",""),
    it("Salt & Black Pepper","","1 DAY",""),
    it("Salt for Water","2 OZ SPOODLE","2 DAYS",""),
    it("Boiling, Salted Water","","",""),
    it("Broccoli, Veg Oil","6 WT OZ","2 DAYS",""),
    it("Broccoli, Plain","5 WT OZ","2 DAYS",""),
    it("Asparagus","4 WT OZ","2 DAYS",""),
    it("Sun-dried Tomatoes","Tongs","3 DAYS",""),
    it("Spinach, Cleaned","","2 DAYS",""),
    it("Sliced Garlic","1 OZ LADLE","1 DAY",""),
    it("Grated Cheese Blend","½ & 2 OZ SPOODLE","4 DAYS",""),
    it("Sautéed Mushrooms","1½ OZ LADLE/DRIP SET","3 DAYS",""),
    it("Alfredo Base","4 OZ LADLE","5 DAYS",""),
    it("Pomodoro Sauce","6 OZ LADLE","4 DAYS",""),
    it("Pic Pac","","4 DAYS",""),
    it("Gorgonzola Crumbles","1 OZ LADLE","4 DAYS",""),
    it("Linguine Fini","12 WT OZ","2 DAYS",""),
    it("Penne","1½ CUPS","2 DAYS",""),
    it("Garlic Mash","#8 SCOOP","2 DAYS",""),
    it("Lemon Butter, Cold","1½ OZ LADLE","4 DAYS",""),
    it("Marsala Sauce, Cold","1½ OZ LADLE","4 DAYS",""),
    it("Spicy Sicilian Butter","#60 SCOOP","7 DAYS",""),
    it("Mac n Cheese Sauce","#12 SCOOP","7 DAYS",""),
    it("Chives, 1/8 bias cut","","4 HR",""),
    it("Blanched Carrots","","2 DAYS",""),
    it("Rosemary Honey Ginger Glaze","1 OZ LADLE","5 DAYS",""),
    it("Rosemary Parm Seasoning","Shaker","3 DAYS",""),
    it("Rosemary Sprig","","",""),
    it("Browned Butter","#40 SCOOP","5 DAYS",""),
    it("Cacio e Pepe Ravioli","2 EACH","FROZEN","")
  ]},

  { title:"STATION 2 (LINE CHECK)", rows:[
    it("Sanitizer Bucket","Test strips","2 HR",""),
    it("Soybean Oil","1½ OZ LADLE, spray bottle","1 DAY",""),
    it("Vodka","1 OZ LADLE","1 DAY",""),
    it("Chopped Garlic","1 TEASPOON","1 DAY",""),
    it("Green Onions","½ OZ LADLE","1 DAY",""),
    it("Chopped Basil","","1 DAY",""),
    it("Parsley","Shaker","4 HR",""),
    it("M.M. Breadcrumbs","","1 DAY",""),
    it("Salt & White Pepper","","1 DAY",""),
    it("Black Pepper","","1 DAY",""),
    it("Lobster Ravioli","9 RAVIOLI","FROZEN",""),
    it("Kid Ravioli","5 RAVIOLI","FROZEN",""),
    it("Mezzaluna","7 RAVIOLI","FROZEN",""),
    it("Shrimp 21/25","Ice bag/drip set","3 DAYS",""),
    it("Scallops 13/15","Ice bag/drip set","3 DAYS",""),
    it("Peas","2 OZ SPOODLE","2 DAYS",""),
    it("Chicken Parmesan","","1½ DAYS",""),
    it("Chicken, Pounded","Ice bag/drip set","2 DAYS",""),
    it("Flour","","1 DAY",""),
    it("Grated Cheese Blend","½, 1 & 4 OZ SPOODLE","4 DAYS",""),
    it("Fettuccine","NESTS","2 DAYS",""),
    it("Spaghetti","6 WT OZ","2 DAYS",""),
    it("Linguine Fini","12 WT OZ","2 DAYS",""),
    it("Rigatoni","8 WT OZ","2 DAYS",""),
    it("Lemon Butter, Cold","1½ OZ + 2 OZ LADLES","4 DAYS",""),
    it("Chicken Stock","1 OZ LADLE","5 DAYS",""),
    it("Mozzarella, Slices","HALVED","4 DAYS",""),
    it("Goat Cheese Slices","","4 DAYS",""),
    it("Crumbled Sausage, ½ in","4 WT OZ","3 DAYS",""),
    it("Meatballs (Cold)","Tongs","4 DAYS",""),
    it("Alfredo Base","8 OZ LADLE","5 DAYS",""),
    it("Sugo Rosa","4 & 5 OZ LADLES","4 DAYS",""),
    it("Marinara","5 OZ LADLE","4 DAYS",""),
    it("Pomodoro Sauce","3 & 5 OZ LADLES","4 DAYS",""),
    it("Meat Sauce","6 OZ SPOODLE","4 DAYS",""),
    it("Lobster Cream Sauce","4 OZ LADLE","4 DAYS",""),
    it("Diced Tomatoes","1 OZ LADLE","1 DAY",""),
    it("Sun-dried Tomatoes","Tongs","3 DAYS",""),
    it("Ricotta Salata","Grater","4 DAYS",""),
    it("Sautéed Mushrooms","2 OZ SPOODLE/DRIP SET","3 DAYS",""),
    it("Capers, Drained","1 TSP","3 DAYS",""),
    it("Lemon Wheel","HOBART, 4mm","1 DAY",""),
    it("Shredded Mozzarella","2 OZ SPOODLE","4 DAYS",""),
    it("Liquid Gold Sauce","5 OZ LADLE","4 DAYS","")
  ]},

  { title:"ALTO SHAAM / HOT SIDE STEAM WELL", rows:[
    it("Pomodoro (150°)","2 & 4 OZ LADLES","4 HR","150°F"),
    it("Mashed Potatoes (150°)","#8 SCOOP","4 HR","150°F"),
    it("Meatballs (150°)","SLOTTED SPOON","4 HR","150°F"),
    it("Marsala (150°)","1½ OZ LADLE","4 HR","150°F"),
    it("Mush. Marsala (150°)","3 OZ SPOODLE","2 HR","150°F"),
    it("Lemon Butter (150°)","2 OZ LADLE","4 HR","150°F"),
    it("Mush. Lb Sauce (150°)","3 OZ SPOODLE","2 HR","150°F"),
    it("Lasagne (150°)","SPATULA","4 HR","150°F")
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