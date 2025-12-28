/* =====================================================
   DAILY KITCHEN EXECUTION CHECKLIST (AM/PM)
   - Keeps: Item + Utensil + Shelf Life + Target Temp (what it should be)
   - Changes: ONE checkbox per item ("Executed / Looked At")
   - Adds: Note + Photo per item
   - Submit => Download PDF
===================================================== */

const $ = sel => document.querySelector(sel);
const sectionsEl = $("#sections");
const submitBtn = $("#submitBtn");

let shift = "am";

// Helper for items with info columns
const it = (item, utensil="", life="", targetTemp="") => ({
  item, utensil, life, targetTemp
});

/* =====================================================
   FULL LIST
   NOTE: I am preserving your item list AND adding the
   columns back (utensil / life / target temp).
   If any single utensil/life/temp is different on your sheet,
   you can edit the values directly below (data only).
===================================================== */

const CHECKLIST = [
  {
    title: "APPS",
    rows: [
      it("Sanitizer Bucket","Test strips","2 HR",""),
      it("Lemons, Wedges","","1 DAY",""),
      it("Salt & Black Pepper","","1 DAY",""),
      it("French Fries","8 WT OZ","FROZEN",""),
      it("Rosemary Parm Seasoning","","1 DAY",""),
      it("Zucchini","6 WT OZ","2 DAYS",""),
      it("Calamari in Brine","4 OZ SPOODLE","2 DAYS",""),
      it("Calamari Batter","1 CUP","1 DAY",""),
      it("Buttermilk","","",""),
      it("Ketchup","","",""),
      it("Roasted Garlic Aioli","","",""),
      it("Mezze Tubetti","","",""),
      it("Mozz Marinara","","",""),
      it("Eggplant, Breaded","","",""),
      it("Mozzarella, Slices","","",""),
      it("Ricotta Cheese","1 OZ LADLE / SOUP SPOON","3 DAYS",""),
      it("Marinara Sauce","","",""),
      it("Ricardo Sauce","","",""),
      it("Chix Soup (Cold)","","",""),
      it("Soup of the Day (Cold)","8 OZ LADLE","5 DAYS",""),
      it("Pesto","","",""),
      it("Prepared Garlic Bread","","",""),
      it("Grilled Focaccia","","",""),
      it("Prepared Focaccia Slider Buns","","",""),
      it("Prepared Open Face Focaccia","","",""),
      it("Delimeat Portion","","",""),
      it("Grilled Sliced Sirloin (2mm)","","",""),
      it("Grilled Sliced Chicken","","",""),
      it("Chopped Seasoned Burrata","","",""),
      it("Tomato Caprese Topping","","",""),
      it("Sausage Arancini","","",""),
      it("Spinach Arancini","","",""),
      it("Marinara Sauce (Hot)","","",""),
      it("Mezzaluna Fritte","","",""),
      it("Sugo Rosa Sauce","","",""),
      it("Crab Cakes","","",""),
      it("Gorgonzola Sauce","","",""),
      it("Roasted Jumbo Wings","","",""),
      it("Spicy Sicilian Butter","","",""),
      it("Gorgonzola Cheese","","",""),
      it("Short Rib","","","")
    ]
  },
  {
    title: "SALAD",
    rows: [
      it("Sanitizer Bucket","Test strips","2 HR",""),
      it("Roasted Red Peppers","½\" x 1½\" strips","3 DAYS",""),
      it("Chopped Basil","Wet paper towel","1 DAY",""),
      it("Red Onions","","1 DAY",""),
      it("Sliced Carrots","","",""),
      it("Red Cabbage","","",""),
      it("Ricotta Salata","","",""),
      it("Pepperoncini","","",""),
      it("Kalamata Olives","","",""),
      it("Salt & Black Pepper","","1 DAY",""),
      it("Balsamic Glaze","","",""),
      it("EVOO","","",""),
      it("Burrata","","",""),
      it("Romaine","2 CUP MEASURE","3 DAYS",""),
      it("Shredded Parm","","",""),
      it("Grape Tomatoes","5 EA (side) / 8 OZ SPOODLE","1 DAY",""),
      it("Croutons","","3 DAYS",""),
      it("Gorgonzola Crumbles","","",""),
      it("Light Balsamic Dressing","","",""),
      it("Parmesan Dressing","","",""),
      it("Caesar Dressing","1½ OZ LADLE","6 DAYS",""),
      it("Vinaigrette Dressing","","","")
    ]
  },
  {
    title: "DESSERTS",
    rows: [
      it("Mint Sprigs","","1 DAY",""),
      it("Powdered Sugar","Shaker / fine lid","1 DAY",""),
      it("Cocoa Powder","Shaker / fine lid","1 DAY",""),
      it("Pistachios","","",""),
      it("Mini Cannoli Shells","","",""),
      it("Cannoli Filling","Pastry bag","5 DAYS",""),
      it("Cannoli Cake","","",""),
      it("John Cole Nuts","3 OZ SPOODLE","2 DAYS",""),
      it("Salted Caramel","","",""),
      it("Vanilla Ice Cream","#12 scoop","FROZEN",""),
      it("Choc Shavings","","",""),
      it("Tiramisu","","",""),
      it("Strawberry Sauce","","",""),
      it("Cheesecake","","",""),
      it("Sogno","","",""),
      it("Chocolate Sauce","","",""),
      it("Peanut Butter Brownie","","",""),
      it("Walnut Brittle","","","")
    ]
  },
  {
    title: "GRILL",
    rows: [
      it("Sanitizer Bucket","Test strips","2 HR",""),
      it("Soybean Oil","Towel, spray btl","1 DAY",""),
      it("Spiedino Breading","Mixing bowl","1 DAY",""),
      it("Salt & White Pepper","","1 DAY",""),
      it("Chicken, 8oz","Ice bag/drip set","3 DAYS",""),
      it("Prepped Rosa","","",""),
      it("Filet, 8oz","","",""),
      it("Sirloin, 7oz","Drip set","2 DAYS",""),
      it("Sirloin, 10oz","Drip set","2 DAYS",""),
      it("Ribeye, 16oz","","",""),
      it("Pork Chop, 8oz","","",""),
      it("Salmon, 8oz","Ice bag/drip set","3 DAYS",""),
      it("Branzino","","",""),
      it("Scallops 13/15","Ice bag/drip set","3 DAYS",""),
      it("Shrimp 21/25","","",""),
      it("Spiedinos","","",""),
      it("Grill Baste","","",""),
      it("Grill Seasoning","","",""),
      it("Goat Cheese Slices","","",""),
      it("Pesto","","","")
    ]
  },
  {
    title: "STATION 1",
    rows: [
      it("Sanitizer Bucket","Test strips","2 HR",""),
      it("Parsley","Shaker","4 HR",""),
      it("Lemons, Wedges","","1 DAY",""),
      it("Basil Leaves, Whole","","1 DAY",""),
      it("Basil, Chopped","","1 DAY",""),
      it("Gluten Free Pasta","","",""),
      it("Salt & Black Pepper","","1 DAY",""),
      it("Salt for Water","","",""),
      it("Boiling, Salted Water","","",""),
      it("Broccoli, Veg Oil","","",""),
      it("Broccoli, Plain","","",""),
      it("Asparagus","","",""),
      it("Sun-dried Tomatoes","","",""),
      it("Spinach, Cleaned","","",""),
      it("Sliced Garlic","1 OZ LADLE","1 DAY",""),
      it("Grated Cheese Blend","","",""),
      it("Sautéed Mushrooms","","",""),
      it("Alfredo Base","4 OZ LADLE","5 DAYS",""),
      it("Pomodoro Sauce","6 OZ LADLE","4 DAYS",""),
      it("Pic Pac","","",""),
      it("Gorgonzola Crumbles","","",""),
      it("Linguine Fini","","",""),
      it("Penne","","",""),
      it("Garlic Mash","","",""),
      it("Lemon Butter (Cold)","","",""),
      it("Marsala Sauce (Cold)","","",""),
      it("Spicy Sicilian Butter","","",""),
      it("Mac n Cheese Sauce","","",""),
      it("Chives, 1/8 Bias Cut","","",""),
      it("Blanched Carrots","","",""),
      it("Rosemary Honey Ginger Glaze","","",""),
      it("Rosemary Parm Seasoning","","",""),
      it("Rosemary Sprig","","",""),
      it("Browned Butter","","",""),
      it("Cacio e Pepe Ravioli","","","")
    ]
  },
  {
    title: "STATION 2",
    rows: [
      it("Sanitizer Bucket","Test strips","2 HR",""),
      it("Soybean Oil","1½ OZ LADLE, spray btl","",""),
      it("Vodka","1 OZ LADLE","1 DAY",""),
      it("Chopped Garlic","1 TEASPOON","1 DAY",""),
      it("Green Onions","½ OZ LADLE","1 DAY",""),
      it("Chopped Basil","","1 DAY",""),
      it("Parsley","Shaker","4 HR",""),
      it("M.M. Breadcrumbs","","",""),
      it("Salt & White Pepper","","",""),
      it("Black Pepper","","",""),
      it("Lobster Ravioli","","",""),
      it("Kid Ravioli","","",""),
      it("Mezzaluna","","",""),
      it("Shrimp 21/25","","",""),
      it("Scallops 13/15","","",""),
      it("Peas","","",""),
      it("Chicken Parmesan","","",""),
      it("Chicken, Pounded","","",""),
      it("Flour","","",""),
      it("Grated Cheese Blend","","",""),
      it("Fettuccine","","",""),
      it("Spaghetti","","",""),
      it("Linguine Fini","","",""),
      it("Rigatoni","","",""),
      it("Lemon Butter (Cold)","","",""),
      it("Chicken Stock","","",""),
      it("Mozzarella, Slices","","",""),
      it("Goat Cheese Slices","","",""),
      it("Crumbled Sausage, 1in","","",""),
      it("Meatballs (Cold)","Tongs","4 DAYS",""),
      it("Alfredo Base","","",""),
      it("Sugo Rosa","","",""),
      it("Marinara","","",""),
      it("Pomodoro Sauce","","",""),
      it("Meat Sauce","","",""),
      it("Lobster Cream Sauce","","",""),
      it("Diced Tomatoes","","",""),
      it("Sun-dried Tomatoes","","",""),
      it("Ricotta Salata","","",""),
      it("Sautéed Mushrooms","","",""),
      it("Capers, Drained","","",""),
      it("Lemon Wheel","","",""),
      it("Shredded Mozzarella","","",""),
      it("Liquid Gold Sauce","","","")
    ]
  },
  {
    title: "ALTO SHAAM / STEAM WELL",
    rows: [
      it("Pomodoro","2 & 4 OZ LADLES","4 HR","150°F"),
      it("Mashed Potatoes","#8 scoop","4 HR","150°F"),
      it("Meatballs","Slotted spoon","4 HR","150°F"),
      it("Marsala","1½ OZ LADLE","4 HR","150°F"),
      it("Mushroom Marsala","3 OZ SPOODLE","2 HR","150°F"),
      it("Lemon Butter","","","150°F"),
      it("Mushroom Sauce","","","150°F"),
      it("Lasagne","","","150°F")
    ]
  },
  {
    title: "TENDER SHACK",
    rows: [
      it("Pickles","","",""),
      it("Shredded Romaine","","",""),
      it("Choc Chunk Cookie","","",""),
      it("Brioche Buns","","",""),
      it("Chicken Tenders","","",""),
      it("Prepped Chicken Tenders","","",""),
      it("Soda Batter","","",""),
      it("Chicken Breader","","",""),
      it("Creole Seasoning","","",""),
      it("Tender Shack Sauce","","",""),
      it("Sauce, Ranch","","",""),
      it("Sauce, Buffalo","","",""),
      it("Sauce, Honey Mustard","","",""),
      it("Sauce, BBQ","","",""),
      it("Nash Hot Seasoning","","","")
    ]
  }
];

// STATE: AM + PM
const state = { am: {}, pm: {} };
CHECKLIST.forEach(sec => {
  state.am[sec.title] = sec.rows.map(r => ({ ...r, done:false, note:"", photo:null }));
  state.pm[sec.title] = sec.rows.map(r => ({ ...r, done:false, note:"", photo:null }));
});

// RENDER
function render(){
  sectionsEl.innerHTML = "";

  CHECKLIST.forEach(section => {
    const card = document.createElement("div");
    card.className = "section";

    const h2 = document.createElement("h2");
    h2.textContent = section.title;
    card.appendChild(h2);

    const legend = document.createElement("div");
    legend.className = "legend";
    legend.innerHTML = `
      <div class="muted">✔</div>
      <div class="muted">Item</div>
      <div class="muted">Utensil</div>
      <div class="muted">Life</div>
      <div class="muted">Target</div>
      <div class="muted">Note</div>
      <div class="muted">Photo</div>
    `;
    card.appendChild(legend);

    state[shift][section.title].forEach((row) => {
      const r = document.createElement("div");
      r.className = "row";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = row.done;
      cb.onchange = () => row.done = cb.checked;

      const itemCell = document.createElement("div");
      itemCell.className = "cell";
      itemCell.textContent = row.item;

      const utCell = document.createElement("div");
      utCell.className = "cell muted";
      utCell.textContent = row.utensil || "—";

      const lifeCell = document.createElement("div");
      lifeCell.className = "cell muted";
      lifeCell.textContent = row.life || "—";

      const tgtCell = document.createElement("div");
      tgtCell.className = "cell muted";
      tgtCell.textContent = row.targetTemp || "—";

      const note = document.createElement("input");
      note.type = "text";
      note.placeholder = "Note (optional)";
      note.value = row.note;
      note.oninput = () => row.note = note.value;

      const photo = document.createElement("input");
      photo.type = "file";
      photo.className = "photo";
      photo.accept = "image/*";
      photo.onchange = e => row.photo = e.target.files[0] || null;

      r.append(cb, itemCell, utCell, lifeCell, tgtCell, note, photo);
      card.appendChild(r);
    });

    sectionsEl.appendChild(card);
  });
}

// TABS
document.querySelectorAll(".tab").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    shift = btn.dataset.shift;
    render();
  };
});

// INIT
(() => {
  const now = new Date();
  $("#date").value = now.toISOString().slice(0,10);
  $("#time").value = now.toTimeString().slice(0,5);
  render();
})();

// PDF GENERATION (includes the columns)
submitBtn.onclick = async () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "letter" });

  const margin = 40;
  let y = margin;
  const pageH = doc.internal.pageSize.getHeight();

  const ensure = (h) => {
    if (y + h > pageH - margin) { doc.addPage(); y = margin; }
  };

  doc.setFont("helvetica","bold");
  doc.setFontSize(16);
  doc.text("Daily Kitchen Execution Checklist", margin, y); y += 20;

  doc.setFont("helvetica","normal");
  doc.setFontSize(11);
  doc.text(`Shift: ${shift.toUpperCase()}`, margin, y); y += 14;
  doc.text(`Manager: ${$("#manager").value || ""}`, margin, y); y += 14;
  doc.text(`Store: ${$("#store").value || ""}`, margin, y); y += 14;
  doc.text(`Date: ${$("#date").value || ""}   Time: ${$("#time").value || ""}`, margin, y); y += 20;

  for (const sec of CHECKLIST) {
    ensure(24);
    doc.setFont("helvetica","bold");
    doc.setFontSize(12);
    doc.text(sec.title, margin, y); y += 14;

    doc.setFont("helvetica","normal");
    doc.setFontSize(9);

    // header row
    ensure(14);
    doc.text("Exec", margin, y);
    doc.text("Item", margin + 40, y);
    doc.text("Utensil", margin + 250, y);
    doc.text("Life", margin + 370, y);
    doc.text("Target", margin + 430, y);
    doc.text("Note", margin + 490, y);
    y += 10;

    const rows = state[shift][sec.title];

    for (const r of rows) {
      ensure(14);
      doc.text(r.done ? "✅" : "⬜", margin, y);

      const item = (r.item || "").slice(0, 38);
      const ut = (r.utensil || "—").slice(0, 18);
      const life = (r.life || "—").slice(0, 10);
      const tgt = (r.targetTemp || "—").slice(0, 10);
      const note = (r.note || "").slice(0, 25);

      doc.text(item, margin + 40, y);
      doc.text(ut, margin + 250, y);
      doc.text(life, margin + 370, y);
      doc.text(tgt, margin + 430, y);
      doc.text(note, margin + 490, y);

      y += 12;
    }

    y += 10;
  }

  doc.save(`Kitchen_Checklist_${shift.toUpperCase()}_${$("#date").value}.pdf`);
};