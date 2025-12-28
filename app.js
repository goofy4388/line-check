/* =====================================================
   DAILY KITCHEN EXECUTION CHECKLIST
   - ALL items from printed sheets
   - ONE checkbox per item ("Executed")
   - Note + Photo per item
   - AM / PM shifts
   - PDF handled in PART 2
===================================================== */

const $ = sel => document.querySelector(sel);
const sectionsEl = $("#sections");
const submitBtn = $("#submitBtn");

let shift = "am";

/* ---------- FULL ITEM LIST (FROM YOUR PHOTOS) ---------- */

const CHECKLIST = [
  {
    title: "APPS",
    items: [
      "Sanitizer Bucket",
      "Lemons, Wedges",
      "Salt & Black Pepper",
      "French Fries",
      "Rosemary Parm Seasoning",
      "Zucchini",
      "Calamari in Brine",
      "Calamari Batter",
      "Buttermilk",
      "Ketchup",
      "Roasted Garlic Aioli",
      "Mezze Tubetti",
      "Mozz Marinara",
      "Eggplant, Breaded",
      "Mozzarella, Slices",
      "Ricotta Cheese",
      "Marinara Sauce",
      "Ricardo Sauce",
      "Chix Soup (Cold)",
      "Soup of the Day (Cold)",
      "Pesto",
      "Prepared Garlic Bread",
      "Grilled Focaccia",
      "Prepared Focaccia Slider Buns",
      "Prepared Open Face Focaccia",
      "Delimeat Portion",
      "Grilled Sliced Sirloin (2mm)",
      "Grilled Sliced Chicken",
      "Chopped Seasoned Burrata",
      "Tomato Caprese Topping",
      "Sausage Arancini",
      "Spinach Arancini",
      "Marinara Sauce (Hot)",
      "Mezzaluna Fritte",
      "Sugo Rosa Sauce",
      "Crab Cakes",
      "Gorgonzola Sauce",
      "Roasted Jumbo Wings",
      "Spicy Sicilian Butter",
      "Gorgonzola Cheese",
      "Short Rib"
    ]
  },
  {
    title: "SALAD",
    items: [
      "Sanitizer Bucket",
      "Roasted Red Peppers",
      "Chopped Basil",
      "Red Onions",
      "Sliced Carrots",
      "Red Cabbage",
      "Ricotta Salata",
      "Pepperoncini",
      "Kalamata Olives",
      "Salt & Black Pepper",
      "Balsamic Glaze",
      "EVOO",
      "Burrata",
      "Romaine",
      "Shredded Parm",
      "Grape Tomatoes",
      "Croutons",
      "Gorgonzola Crumbles",
      "Light Balsamic Dressing",
      "Parmesan Dressing",
      "Caesar Dressing",
      "Vinaigrette Dressing"
    ]
  },
  {
    title: "DESSERTS",
    items: [
      "Mint Sprigs",
      "Powdered Sugar",
      "Cocoa Powder",
      "Pistachios",
      "Mini Cannoli Shells",
      "Cannoli Filling",
      "Cannoli Cake",
      "John Cole Nuts",
      "Salted Caramel",
      "Vanilla Ice Cream",
      "Choc Shavings",
      "Tiramisu",
      "Strawberry Sauce",
      "Cheesecake",
      "Sogno",
      "Chocolate Sauce",
      "Peanut Butter Brownie",
      "Walnut Brittle"
    ]
  },
  {
    title: "GRILL",
    items: [
      "Sanitizer Bucket",
      "Soybean Oil",
      "Spiedino Breading",
      "Salt & White Pepper",
      "Chicken, 8oz",
      "Prepped Rosa",
      "Filet, 8oz",
      "Sirloin, 7oz",
      "Sirloin, 10oz",
      "Ribeye, 16oz",
      "Pork Chop, 8oz",
      "Salmon, 8oz",
      "Branzino",
      "Scallops 13/15",
      "Shrimp 21/25",
      "Spiedinos",
      "Grill Baste",
      "Grill Seasoning",
      "Goat Cheese Slices",
      "Pesto"
    ]
  },
  {
    title: "STATION 1",
    items: [
      "Sanitizer Bucket",
      "Parsley",
      "Lemons, Wedges",
      "Basil Leaves, Whole",
      "Basil, Chopped",
      "Gluten Free Pasta",
      "Salt & Black Pepper",
      "Salt for Water",
      "Boiling, Salted Water",
      "Broccoli, Veg Oil",
      "Broccoli, Plain",
      "Asparagus",
      "Sun-dried Tomatoes",
      "Spinach, Cleaned",
      "Sliced Garlic",
      "Grated Cheese Blend",
      "Sautéed Mushrooms",
      "Alfredo Base",
      "Pomodoro Sauce",
      "Pic Pac",
      "Gorgonzola Crumbles",
      "Linguine Fini",
      "Penne",
      "Garlic Mash",
      "Lemon Butter (Cold)",
      "Marsala Sauce (Cold)",
      "Spicy Sicilian Butter",
      "Mac n Cheese Sauce",
      "Chives, 1/8 Bias Cut",
      "Blanched Carrots",
      "Rosemary Honey Ginger Glaze",
      "Rosemary Parm Seasoning",
      "Rosemary Sprig",
      "Browned Butter",
      "Cacio e Pepe Ravioli"
    ]
  },
  {
    title: "STATION 2",
    items: [
      "Sanitizer Bucket",
      "Soybean Oil",
      "Vodka",
      "Chopped Garlic",
      "Green Onions",
      "Chopped Basil",
      "Parsley",
      "M.M. Breadcrumbs",
      "Salt & White Pepper",
      "Black Pepper",
      "Lobster Ravioli",
      "Kid Ravioli",
      "Mezzaluna",
      "Shrimp 21/25",
      "Scallops 13/15",
      "Peas",
      "Chicken Parmesan",
      "Chicken, Pounded",
      "Flour",
      "Grated Cheese Blend",
      "Fettuccine",
      "Spaghetti",
      "Linguine Fini",
      "Rigatoni",
      "Lemon Butter (Cold)",
      "Chicken Stock",
      "Mozzarella, Slices",
      "Goat Cheese Slices",
      "Crumbled Sausage, 1in",
      "Meatballs (Cold)",
      "Alfredo Base",
      "Sugo Rosa",
      "Marinara",
      "Pomodoro Sauce",
      "Meat Sauce",
      "Lobster Cream Sauce",
      "Diced Tomatoes",
      "Sun-dried Tomatoes",
      "Ricotta Salata",
      "Sautéed Mushrooms",
      "Capers, Drained",
      "Lemon Wheel",
      "Shredded Mozzarella",
      "Liquid Gold Sauce"
    ]
  },
  {
    title: "ALTO SHAAM / STEAM WELL",
    items: [
      "Pomodoro (150°)",
      "Mashed Potatoes (150°)",
      "Meatballs (150°)",
      "Marsala (150°)",
      "Mushroom Marsala (150°)",
      "Lemon Butter (150°)",
      "Mushroom Sauce (150°)",
      "Lasagne (150°)"
    ]
  },
  {
    title: "TENDER SHACK",
    items: [
      "Pickles",
      "Shredded Romaine",
      "Choc Chunk Cookie",
      "Brioche Buns",
      "Chicken Tenders",
      "Prepped Chicken Tenders",
      "Soda Batter",
      "Chicken Breader",
      "Creole Seasoning",
      "Tender Shack Sauce",
      "Sauce, Ranch",
      "Sauce, Buffalo",
      "Sauce, Honey Mustard",
      "Sauce, BBQ",
      "Nash Hot Seasoning"
    ]
  }
];

/* ---------- STATE ---------- */

const state = {
  am: {},
  pm: {}
};

CHECKLIST.forEach(sec => {
  state.am[sec.title] = sec.items.map(i => ({ item: i, done: false, note: "", photo: null }));
  state.pm[sec.title] = sec.items.map(i => ({ item: i, done: false, note: "", photo: null }));
});

/* ---------- RENDER ---------- */

function render() {
  sectionsEl.innerHTML = "";

  CHECKLIST.forEach(section => {
    const card = document.createElement("div");
    card.className = "section";

    const h2 = document.createElement("h2");
    h2.textContent = section.title;
    card.appendChild(h2);

    state[shift][section.title].forEach((row, idx) => {
      const r = document.createElement("div");
      r.className = "row";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = row.done;
      cb.onchange = () => row.done = cb.checked;

      const name = document.createElement("div");
      name.textContent = row.item;

      const note = document.createElement("input");
      note.type = "text";
      note.placeholder = "Note (optional)";
      note.value = row.note;
      note.oninput = () => row.note = note.value;

      const photo = document.createElement("input");
      photo.type = "file";
      photo.accept = "image/*";
      photo.onchange = e => row.photo = e.target.files[0] || null;

      r.append(cb, name, note, photo);
      card.appendChild(r);
    });

    sectionsEl.appendChild(card);
  });
}

/* ---------- TABS ---------- */
document.querySelectorAll(".tab").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    shift = btn.dataset.shift;
    render();
  };
});

/* ---------- INIT ---------- */
(() => {
  const now = new Date();
  $("#date").value = now.toISOString().slice(0,10);
  $("#time").value = now.toTimeString().slice(0,5);
  render();
})();
/* ============================
   PDF GENERATION
============================ */

submitBtn.onclick = async () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "letter" });

  const margin = 40;
  let y = margin;

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  const ensureSpace = h => {
    if (y + h > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // HEADER
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Daily Kitchen Execution Checklist", margin, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Shift: ${shift.toUpperCase()}`, margin, y); y += 14;
  doc.text(`Manager: ${$("#manager").value}`, margin, y); y += 14;
  doc.text(`Store: ${$("#store").value}`, margin, y); y += 14;
  doc.text(`Date: ${$("#date").value}   Time: ${$("#time").value}`, margin, y); y += 20;

  // SECTIONS
  for (const sec of CHECKLIST) {
    ensureSpace(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(sec.title, margin, y);
    y += 14;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const rows = state[shift][sec.title];

    for (const r of rows) {
      ensureSpace(18);

      const line =
        `${r.done ? "✅" : "⬜"} ${r.item}` +
        (r.note ? ` — ${r.note}` : "");

      doc.text(line, margin, y);
      y += 14;
    }

    y += 10;
  }

  // SAVE
  const filename =
    `Kitchen_Checklist_${shift.toUpperCase()}_${$("#date").value}.pdf`;

  doc.save(filename);
};