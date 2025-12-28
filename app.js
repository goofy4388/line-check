// ===============================
// Quality Check (AM/PM) + PDF
// Based on the two sheets you sent.
// AM/PM tab controls which checks are required:
// Appearance + Taste + Temp for each row.
// Photos per SECTION.
// Submit downloads PDF to phone.
// ===============================

const $ = (sel) => document.querySelector(sel);

const checklistEl = $("#checklist");
const progressEl = $("#progress");
const submitBtn = $("#submitBtn");
const statusEl = $("#status");

const managerEl = $("#manager");
const dateEl = $("#date");
const storeEl = $("#store");
const timeEl = $("#time");

const FIELDS = ["appearance", "taste", "temp"]; // required per row for selected shift

// -------- Data pulled from your photos --------
const SECTIONS = [
  {
    id: "walkin_tools_temps",
    title: "WALKIN/FREEZER — Equipment Temp Check / Tools",
    rows: [
      { item: "Fryers — 350°F+", utensil: "", life: "" },
      { item: "Alto Shaam — 150°F+", utensil: "", life: "" },
      { item: "Steam Wells — 150°F+", utensil: "", life: "" },
      { item: "Coolers — 40°F or below", utensil: "", life: "" },
      { item: "Salad Cooler — 40°F or below", utensil: "", life: "" },
      { item: "Salad Freezer — Frozen, Ice Free", utensil: "", life: "" },
      { item: "Utensil storage with water — 165°F", utensil: "", life: "" },
      { item: "Thermometer (available)", utensil: "", life: "" },
      { item: "Fryer baskets", utensil: "", life: "" },
      { item: "Mesh skimmer OR tester", utensil: "", life: "" },
      { item: "Clean filter box", utensil: "", life: "" },
      { item: "Microwave programming chart", utensil: "", life: "" }
    ]
  },

  {
    id: "apps",
    title: "APPS",
    rows: [
      { item: "SANITIZER BUCKET", utensil: "TEST STRIPS", life: "2 HR" },
      { item: "LEMONS, WEDGES", utensil: "", life: "1 DAY" },
      { item: "SALT & BLACK PEPPER", utensil: "", life: "1 DAY" },
      { item: "FRENCH FRIES", utensil: "8 WT OZ", life: "FROZEN" },
      { item: "ROSEMARY PARM SEASONING", utensil: "SHAKER", life: "3 DAYS" },
      { item: "ZUCCHINI", utensil: "6 WT OZ", life: "2 DAYS" },
      { item: "CALAMARI IN BRINE", utensil: "4 OZ SPOODLE", life: "2 DAYS" },
      { item: "CALAMARI BATTER", utensil: "1 CUP", life: "1 DAY" },
      { item: "BUTTERMILK", utensil: "", life: "1 DAY" },
      { item: "KETCHUP", utensil: "1½ OZ LADLE", life: "3 DAYS" },
      { item: "ROASTED GARLIC AIOLI", utensil: "1½ OZ LADLE", life: "3 DAYS" },
      { item: "MEZZE TUBETTI", utensil: "2 OZ SPOODLE", life: "2 DAYS" },
      { item: "MOZZ MARINARA", utensil: "", life: "2 DAYS" },
      { item: "EGGPLANT, BREADED", utensil: "", life: "2 DAYS" },
      { item: "MOZZARELLA, SLICES", utensil: "HALVED", life: "4 DAYS" },
      { item: "RICOTTA CHEESE", utensil: "1 OZ LADLE / SOUP SPOON", life: "3 DAYS" },
      { item: "MARINARA SAUCE", utensil: "2 & 3 OZ LADLE", life: "4 DAYS" },
      { item: "RICARDO SAUCE", utensil: "3 OZ LADLE", life: "4 DAYS" },
      { item: "CHX SOUP (COLD)", utensil: "8 OZ LADLE", life: "5 DAYS" },
      { item: "SOUP OF THE DAY (COLD)", utensil: "8 OZ LADLE", life: "5 DAYS" },
      { item: "PESTO", utensil: "", life: "4 DAYS" },
      { item: "PREPPED GARLIC BREAD", utensil: "", life: "2 DAYS" },
      { item: "GRILLED FOCACCIA", utensil: "", life: "2 DAYS" },
      { item: "PREPPED FOCACCIA SLIDER BUNS", utensil: "", life: "2 DAYS" },
      { item: "PREPPED OPEN FACE FOCACCIA", utensil: "", life: "2 DAYS" },
      { item: "DELIMEAT PORTION", utensil: "PORTIONED", life: "3 DAYS" },
      { item: "GRILLED SLICED SIRLOIN, 2MM", utensil: "4 WT OZ PORTIONED", life: "2 DAYS" },
      { item: "GRILLED SLICED CHICKEN", utensil: "4 WT OZ PORTIONED", life: "2 DAYS" },
      { item: "CHOPPED SEASONED BURRATA", utensil: "#40 SCOOP", life: "2 DAYS" },
      { item: "TOMATO CAPRESE TOPPING", utensil: "2 OZ SPOODLE", life: "2 DAYS" },
      { item: "SAUSAGE ARANCINI", utensil: "6 EACH", life: "2 DAYS" },
      { item: "SPINACH ARANCINI", utensil: "8 EACH", life: "2 DAYS" },
      { item: "MARINARA SAUCE (APPS)", utensil: "3 OZ LADLE", life: "4 DAYS" },
      { item: "MEZZALUNA FRITTE", utensil: "4 EACH + 8 EACH", life: "1 DAY" },
      { item: "SUGO ROSA SAUCE", utensil: "2 OZ + 3 OZ LADLE", life: "2 DAYS" },
      { item: "CRAB CAKES", utensil: "2 EACH", life: "2 DAYS" },
      { item: "GEORGIO SAUCE", utensil: "1½ OZ LADLE", life: "4 DAYS" },
      { item: "ROASTED JUMBO WINGS", utensil: "PORTIONED", life: "2 DAYS" },
      { item: "SPICY SICILIAN BUTTER", utensil: "#40 SCOOP", life: "7 DAYS" },
      { item: "GORGONZOLA CHEESE", utensil: "1½ OZ LADLE", life: "4 DAYS" },
      { item: "SHORT RIB", utensil: "", life: "4 DAYS" }
    ]
  },

  {
    id: "salad",
    title: "SALAD",
    rows: [
      { item: "SANITIZER BUCKET", utensil: "TEST STRIPS", life: "2 HR" },
      { item: "ROASTED RED PEPPERS", utensil: "½\" x ¼\" STRIPS", life: "3 DAYS" },
      { item: "CHOPPED BASIL", utensil: "WET PAPER TOWEL", life: "1 DAY" },
      { item: "RED ONIONS", utensil: "", life: "1 DAY" },
      { item: "SLICED CARROTS", utensil: "2 OZ SPOODLE", life: "2 DAYS" },
      { item: "RED CABBAGE", utensil: "3 OZ SPOODLE", life: "2 DAYS" },
      { item: "RICOTTA SALATA", utensil: "GRATER", life: "4 DAYS" },
      { item: "PEPPERONCINI", utensil: "MINI TONGS / DRIP SET", life: "3 DAYS" },
      { item: "KALAMATA OLIVES", utensil: "MINI TONGS / DRIP SET", life: "2 DAYS" },
      { item: "SALT & BLACK PEPPER", utensil: "", life: "1 DAY" },
      { item: "BALSAMIC GLAZE", utensil: "OG CONTAINER", life: "30 DAYS" },
      { item: "EVOO", utensil: "½ OZ LADLE", life: "30 DAYS" },
      { item: "BURRATA", utensil: "SLOTTED SPOON", life: "3 DAYS" },
      { item: "ROMAINE", utensil: "2 CUP MEASURE", life: "3 DAYS" },
      { item: "SHREDDED PARM", utensil: "½ OZ LADLE", life: "3 DAYS" },
      { item: "GRAPE TOMATOES", utensil: "5 EA SIDE SALAD / 8 OZ SPOODLE", life: "1 DAY" },
      { item: "CROUTONS", utensil: "", life: "3 DAYS" },
      { item: "GORGONZOLA CRUMBLES", utensil: "1 OZ LADLE", life: "4 DAYS" },
      { item: "LIGHT BALSAMIC DRESSING", utensil: "1½ OZ LADLE", life: "7 DAYS" },
      { item: "PARMESAN DRESSING", utensil: "1½ OZ LADLE", life: "6 DAYS" },
      { item: "CAESAR DRESSING", utensil: "1½ OZ LADLE", life: "6 DAYS" },
      { item: "VINAIGRETTE DRESSING", utensil: "1½ OZ LADLE", life: "4 DAYS" }
    ]
  },

  {
    id: "alto_steamwell_walkin",
    title: "ALTO SHAAM & STEAM WELL (from Walkin sheet)",
    rows: [
      { item: "CHICKEN SOUP (150°)", utensil: "8 OZ LADLE", life: "4 HR" },
      { item: "SOUP OF THE DAY (150°)", utensil: "8 OZ LADLE", life: "4 HR" },
      { item: "MARINARA SAUCE (150°)", utensil: "3 OZ LADLE", life: "4 HR" },
      { item: "POMODORO SAUCE (150°)", utensil: "2 & 4 OZ LADLE", life: "4 HR" }
    ]
  },

  {
    id: "merry_chef",
    title: "MERRY CHEF",
    rows: [
      { item: "SPIEDINO BREADING", utensil: "1 TEASPOON", life: "4 DAYS" },
      { item: "STUFFED MUSHROOMS", utensil: "", life: "3 DAYS" },
      { item: "PARSLEY SPRIGS", utensil: "STORED IN ICE WATER", life: "1 DAY" },
      { item: "SUGO ROSA SAUCE", utensil: "2 OZ LADLE", life: "4 DAYS" },
      { item: "MEATBALLS", utensil: "TONGS", life: "4 DAYS" },
      { item: "POMODORO", utensil: "2 & 4 OZ LADLES", life: "4 DAYS" }
    ]
  },

  {
    id: "desserts",
    title: "DESSERTS",
    rows: [
      { item: "MINT SPRIGS", utensil: "", life: "1 DAY" },
      { item: "POWDERED SUGAR", utensil: "SHAKER/FINE LID", life: "1 DAY" },
      { item: "COCOA POWDER", utensil: "SHAKER/FINE LID", life: "1 DAY" },
      { item: "PISTACHIOS", utensil: "", life: "3 DAYS" },
      { item: "MINI CANNOLI SHELLS", utensil: "ROOM TEMP", life: "3 DAYS" },
      { item: "CANNOLI FILLING", utensil: "PASTRY BAG", life: "5 DAYS" },
      { item: "CANNOLI CAKE", utensil: "DESSERT SPATULA", life: "3 DAYS" },
      { item: "JOHN COLE NUTS", utensil: "3 OZ SPOODLE", life: "2 DAYS" },
      { item: "SALTED CARAMEL", utensil: "1 & 1½ OZ LADLES", life: "5 DAYS" },
      { item: "VANILLA ICE CREAM", utensil: "#12 SCOOP", life: "FROZEN" },
      { item: "CHOC SHAVINGS", utensil: "", life: "2 DAYS" },
      { item: "TIRAMISU", utensil: "DESSERT SPATULA", life: "3 DAYS" },
      { item: "STRAWBERRY SAUCE", utensil: "1½ OZ LADLE", life: "6 DAYS" },
      { item: "CHEESECAKE", utensil: "DESSERT SPATULA", life: "3 DAYS" },
      { item: "SOGNO", utensil: "DESSERT SPATULA", life: "3 DAYS" },
      { item: "CHOCOLATE SAUCE", utensil: "SQUEEZE BTL, 1½ OZ LADLE", life: "4 HR" },
      { item: "PEANUT BUTTER BROWNIE", utensil: "DESSERT SPATULA", life: "3 DAYS" },
      { item: "WALNUT BRITTLE", utensil: "½ OZ LADLE", life: "4 DAYS" }
    ]
  },

  {
    id: "tender_shack",
    title: "TENDER SHACK",
    rows: [
      { item: "PICKLES", utensil: "TONGS", life: "3 DAYS" },
      { item: "SHREDDED ROMAINE", utensil: "½ MEASURING CUP", life: "2 DAYS" },
      { item: "CHOC. CHUNK COOKIE", utensil: "", life: "2 DAYS" },
      { item: "BRIOCHE BUNS", utensil: "AIR TIGHT CONTAINER", life: "7 DAYS" },
      { item: "CHICKEN TENDERS", utensil: "ICE BAG / DRIP SET", life: "3 DAYS" },
      { item: "PREPPED CHX TENDERS", utensil: "PLASTIC WRAP / ICE BAG", life: "2 DAYS" },
      { item: "SODA BATTER", utensil: "WIRE WHIP", life: "2 DAYS" },
      { item: "CHICKEN BREADER", utensil: "BREADER STATION SETUP", life: "" },
      { item: "CREOLE SEASONING", utensil: "SHAKER", life: "1 DAY" },
      { item: "TENDER SHACK SAUCE", utensil: "1½ OZ LADLE & 1½ OZ PORTIONS", life: "7 DAYS" },
      { item: "SAUCE, RANCH", utensil: "1½ OZ PORTIONS", life: "7 DAYS" },
      { item: "SAUCE, BUFFALO", utensil: "1½ OZ PORTIONS", life: "8 DAYS" },
      { item: "SAUCE, HONEY MUSTARD", utensil: "1½ OZ PORTIONS", life: "7 DAYS" },
      { item: "SAUCE, BBQ", utensil: "1½ OZ PORTIONS", life: "7 DAYS" },
      { item: "NASH. HOT SEASONING", utensil: "SHAKER, TSP & TBS", life: "14 DAYS" }
    ]
  },

  // ---- Second page ----
  {
    id: "line_tools_temps",
    title: "LINE — Equipment Temp Check / Tools",
    rows: [
      { item: "Grill — 550°F+", utensil: "", life: "" },
      { item: "Grill Cooler — 40°F or below", utensil: "", life: "" },
      { item: "Steam Wells — 150°F+", utensil: "", life: "" },
      { item: "Lasagne Drawer — 150°F (no water, dry)", utensil: "", life: "" },
      { item: "Station 2 Cooler — 40°F or below", utensil: "", life: "" },
      { item: "Wood / Water in grates", utensil: "", life: "" },
      { item: "Cutting board", utensil: "", life: "" },
      { item: "Cut glove", utensil: "", life: "" },
      { item: "Spatula", utensil: "", life: "" },
      { item: "Grill brush", utensil: "", life: "" },
      { item: "Tongs", utensil: "", life: "" },
      { item: "Rubber spatulas", utensil: "", life: "" },
      { item: "Cook spoons", utensil: "", life: "" },
      { item: "Pasta forks", utensil: "", life: "" },
      { item: "GF stock pot", utensil: "", life: "" },
      { item: "GF strainer", utensil: "", life: "" },
      { item: "Thermometer", utensil: "", life: "" }
    ]
  },

  {
    id: "grill",
    title: "GRILL",
    rows: [
      { item: "SANITIZER BUCKET", utensil: "TEST STRIPS", life: "2 HR" },
      { item: "SOYBEAN OIL", utensil: "TOWEL, SPRAY BTL", life: "1 DAY" },
      { item: "SPIEDINO BREADING", utensil: "MIXING BOWL", life: "1 DAY" },
      { item: "SALT & WHITE PEPPER", utensil: "", life: "1 DAY" },
      { item: "CHICKEN, 8 OZ", utensil: "ICE BAG / DRIP SET", life: "3 DAYS" },
      { item: "PREPPED ROSA", utensil: "DRIP SET", life: "2 DAYS" },
      { item: "FILET, 9 OZ", utensil: "DRIP SET", life: "2 DAYS" },
      { item: "SIRLOIN, 7 & 10 OZ", utensil: "DRIP SET", life: "2 DAYS" },
      { item: "RIBEYE, 16 OZ", utensil: "DRIP SET", life: "2 DAYS" },
      { item: "PORK CHOP, 8 OZ", utensil: "DRIP SET", life: "2 DAYS" },
      { item: "SALMON, 8 OZ", utensil: "ICE BAG / DRIP SET", life: "3 DAYS" },
      { item: "BRANZINO", utensil: "ICE BAG / DRIP SET", life: "3 DAYS" },
      { item: "SCALLOPS 13/15", utensil: "ICE BAG / DRIP SET", life: "3 DAYS" },
      { item: "SHRIMP 21/25", utensil: "ICE BAG / DRIP SET", life: "3 DAYS" },
      { item: "SPIEDINOS", utensil: "ICE BAG / DRIP SET", life: "1 DAY" },
      { item: "GRILL BASTE", utensil: "BRUSH, ICE BAG", life: "6 DAYS" },
      { item: "GRILL SEASONING", utensil: "SHAKER", life: "1 DAY" },
      { item: "GOAT CHEESE SLICES", utensil: "", life: "4 DAYS" },
      { item: "PESTO", utensil: "TABLESPOON", life: "4 DAYS" }
    ]
  },

  {
    id: "station1",
    title: "STATION 1",
    rows: [
      { item: "SANITIZER BUCKET", utensil: "TEST STRIPS", life: "2 HR" },
      { item: "PARSLEY", utensil: "SHAKER", life: "4 HR" },
      { item: "LEMONS, WEDGES", utensil: "", life: "1 DAY" },
      { item: "BASIL LEAVES, WHOLE", utensil: "", life: "1 DAY" },
      { item: "BASIL, CHOPPED", utensil: "", life: "1 DAY" },
      { item: "GLUTEN FREE PASTA", utensil: "3 WT OZ / 7 WT OZ", life: "1 DAY" },
      { item: "SALT & BLACK PEPPER", utensil: "", life: "1 DAY" },
      { item: "SALT FOR WATER", utensil: "2 OZ SPOODLE", life: "" },
      { item: "BOILING, SALTED WATER", utensil: "", life: "" },
      { item: "BROCCOLI, VEG OIL", utensil: "6 WT OZ", life: "2 DAYS" },
      { item: "BROCCOLI, PLAIN", utensil: "5 WT OZ", life: "2 DAYS" },
      { item: "ASPARAGUS", utensil: "4 WT OZ", life: "2 DAYS" },
      { item: "SUNDRIED TOMATOES", utensil: "TONGS", life: "3 DAYS" },
      { item: "SPINACH, CLEANED", utensil: "", life: "2 DAYS" },
      { item: "SLICED GARLIC", utensil: "1 OZ LADLE", life: "1 DAY" },
      { item: "GRATED CHEESE BLEND", utensil: "½ & 2 OZ SPOODLE", life: "4 DAYS" },
      { item: "SAUTÉED MUSHROOMS", utensil: "1½ OZ LADLE / DRIP SET", life: "3 DAYS" },
      { item: "ALFREDO BASE", utensil: "4 OZ LADLE", life: "5 DAYS" },
      { item: "POMODORO SAUCE", utensil: "6 OZ LADLE", life: "4 DAYS" },
      { item: "PIC PAC", utensil: "5 OZ LADLE", life: "4 DAYS" },
      { item: "GORGONZOLA CRUMBLES", utensil: "1 OZ LADLE", life: "4 DAYS" },
      { item: "LINGUINE FINI", utensil: "12 WT OZ", life: "2 DAYS" },
      { item: "PENNE", utensil: "1½ CUPS", life: "2 DAYS" },
      { item: "GARLIC MASH", utensil: "#8 SCOOP", life: "2 DAYS" },
      { item: "LEMON BUTTER, COLD", utensil: "1½ OZ LADLE", life: "4 DAYS" },
      { item: "MARSALA SAUCE, COLD", utensil: "1½ OZ LADLE", life: "4 DAYS" },
      { item: "SPICY SICILIAN BUTTER", utensil: "#60 SCOOP", life: "7 DAYS" },
      { item: "MAC N CHEESE SAUCE", utensil: "#12 SCOOP", life: "4 DAYS" },
      { item: "CHIVES, ⅛\" BIAS CUT", utensil: "", life: "4 HR" },
      { item: "BLANCHED CARROTS", utensil: "6 WT OZ", life: "2 DAYS" },
      { item: "ROSEMARY HONEY GINGER GLAZE", utensil: "1 OZ LADLE", life: "5 DAYS" },
      { item: "ROSEMARY PARM SEASONING", utensil: "SHAKER", life: "3 DAYS" },
      { item: "ROSEMARY SPRIG", utensil: "", life: "1 DAY" },
      { item: "BROWNED BUTTER", utensil: "#40 SCOOP", life: "5 DAYS" },
      { item: "CACIO E PEPE RAVIOLI", utensil: "2 EACH", life: "FROZEN" }
    ]
  },

  {
    id: "station2",
    title: "STATION 2",
    rows: [
      { item: "SANITIZER BUCKET", utensil: "TEST STRIPS", life: "2 HR" },
      { item: "SOYBEAN OIL", utensil: "1½ OZ LADLE / SPRAY BTL", life: "" },
      { item: "VODKA", utensil: "1 OZ LADLE", life: "1 DAY" },
      { item: "CHOPPED GARLIC", utensil: "1 TEASPOON", life: "1 DAY" },
      { item: "GREEN ONIONS", utensil: "½ OZ LADLE", life: "1 DAY" },
      { item: "CHOPPED BASIL", utensil: "", life: "1 DAY" },
      { item: "PARSLEY", utensil: "SHAKER", life: "4 HR" },
      { item: "M.M. BREADCRUMBS", utensil: "", life: "1 DAY" },
      { item: "SALT & WHITE PEPPER", utensil: "", life: "1 DAY" },
      { item: "BLACK PEPPER", utensil: "", life: "1 DAY" },
      { item: "LOBSTER RAVIOLI", utensil: "9 RAVIOLI", life: "FROZEN" },
      { item: "KID RAVIOLI", utensil: "5 RAVIOLI", life: "FROZEN" },
      { item: "MEZZALUNA", utensil: "7 RAVIOLI", life: "FROZEN" },
      { item: "SHRIMP 21/25", utensil: "ICE BAG / DRIP SET", life: "3 DAYS" },
      { item: "SCALLOPS 13/15", utensil: "ICE BAG / DRIP SET", life: "3 DAYS" },
      { item: "PEAS", utensil: "2 OZ SPOODLE", life: "2 DAYS" },
      { item: "CHICKEN PARMESAN", utensil: "", life: "1½ DAYS" },
      { item: "CHICKEN, POUNDED", utensil: "ICE BAG / DRIP SET", life: "2 DAYS" },
      { item: "FLOUR", utensil: "", life: "1 DAY" },
      { item: "GRATED CHEESE BLEND", utensil: "½, 1 & 4 OZ SPOODLE", life: "4 DAYS" },
      { item: "FETTUCCINE", utensil: "NESTS", life: "2 DAYS" },
      { item: "SPAGHETTI", utensil: "6 WT OZ", life: "2 DAYS" },
      { item: "LINGUINE FINI", utensil: "12 WT OZ", life: "2 DAYS" },
      { item: "RIGATONI", utensil: "8 WT OZ", life: "2 DAYS" },
      { item: "LEMON BUTTER, COLD", utensil: "1½ OZ + 2 OZ LADLES", life: "4 DAYS" },
      { item: "CHICKEN STOCK", utensil: "1 OZ LADLE", life: "5 DAYS" },
      { item: "MOZZARELLA, SLICES", utensil: "HALVED", life: "4 DAYS" },
      { item: "GOAT CHEESE SLICES", utensil: "", life: "4 DAYS" },
      { item: "CRUMBLED SAUSAGE, ½ IN", utensil: "4 WT OZ", life: "3 DAYS" },
      { item: "MEATBALLS (COLD)", utensil: "TONGS", life: "4 DAYS" },
      { item: "ALFREDO BASE", utensil: "8 OZ LADLE", life: "5 DAYS" },
      { item: "SUGO ROSA", utensil: "4 & 5 OZ LADLES", life: "4 DAYS" },
      { item: "MARINARA", utensil: "5 OZ LADLE", life: "4 DAYS" },
      { item: "POMODORO SAUCE", utensil: "3 & 5 OZ LADLES", life: "4 DAYS" },
      { item: "MEAT SAUCE", utensil: "6 OZ SPOODLE", life: "4 DAYS" },
      { item: "LOBSTER CREAM SAUCE", utensil: "4 OZ LADLE", life: "4 DAYS" },
      { item: "DICED TOMATOES", utensil: "1 OZ LADLE", life: "1 DAY" },
      { item: "SUNDRIED TOMATOES", utensil: "TONGS", life: "3 DAYS" },
      { item: "RICOTTA SALATA", utensil: "GRATER", life: "4 DAYS" },
      { item: "SAUTÉED MUSHROOMS", utensil: "2 OZ SPOODLE / DRIP SET", life: "3 DAYS" },
      { item: "CAPERS, DRAINED", utensil: "1 TSP", life: "3 DAYS" },
      { item: "LEMON WHEEL", utensil: "HOBART, 4MM", life: "1 DAY" },
      { item: "SHREDDED MOZZARELLA", utensil: "2 OZ SPOODLE", life: "4 DAYS" },
      { item: "LIQUID GOLD SAUCE", utensil: "5 OZ LADLE", life: "4 DAYS" }
    ]
  },

  {
    id: "alto_hot_side",
    title: "ALTO SHAAM & HOT SIDE STEAM WELL (Line sheet)",
    rows: [
      { item: "POMODORO (150°)", utensil: "2 & 4 OZ LADLES", life: "4 HR" },
      { item: "MASHED POTATOES (150°)", utensil: "#8 SCOOP", life: "4 HR" },
      { item: "MEATBALLS (150°)", utensil: "SLOTTED SPOON", life: "4 HR" },
      { item: "MARSALA (150°)", utensil: "1½ OZ LADLE", life: "4 HR" },
      { item: "MUSH. MARSALA (150°)", utensil: "3 OZ SPOODLE", life: "2 HR" },
      { item: "LEMON BUTTER (150°)", utensil: "2 OZ LADLE", life: "4 HR" },
      { item: "MUSH. LB SAUCE (150°)", utensil: "3 OZ SPOODLE", life: "2 HR" },
      { item: "LASAGNE (150°)", utensil: "SPATULA", life: "" }
    ]
  }
];

// ---------------- State ----------------
let shift = "am"; // "am" | "pm"

// state schema:
// state = {
//   meta:{ manager,date,store,time },
//   am:{ checks:{}, notes:{}, photos:{} },
//   pm:{ checks:{}, notes:{}, photos:{} }
// }
const state = loadState() || freshState();

function freshState() {
  return {
    meta: { manager: "", date: "", store: "", time: "" },
    am: { checks: {}, notes: {}, photos: {} },
    pm: { checks: {}, notes: {}, photos: {} }
  };
}

function saveState() {
  state.meta.manager = managerEl.value.trim();
  state.meta.date = dateEl.value;
  state.meta.store = storeEl.value.trim();
  state.meta.time = timeEl.value;

  localStorage.setItem("quality_check_pdf_v2", JSON.stringify(state));
}

function loadState() {
  try {
    const raw = localStorage.getItem("quality_check_pdf_v2");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function rowId(sectionId, rowIndex) {
  return `${sectionId}::${rowIndex}`;
}

function keyFor(sectionId, rowIndex, field) {
  return `${rowId(sectionId, rowIndex)}::${field}`;
}

// ---------------- Rendering ----------------
function setShift(newShift) {
  shift = newShift;

  document.querySelectorAll(".tab").forEach(btn => {
    const active = btn.dataset.shift === shift;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-selected", active ? "true" : "false");
  });

  render();
  updateUIState();
}

function render() {
  checklistEl.innerHTML = "";

  SECTIONS.forEach(section => {
    const card = document.createElement("div");
    card.className = "card";

    const head = document.createElement("div");
    head.className = "cardHead";

    const title = document.createElement("h2");
    title.textContent = section.title;

    const badge = document.createElement("span");
    badge.className = "badge warn";
    badge.textContent = "Incomplete";
    badge.dataset.section = section.id;

    head.appendChild(title);
    head.appendChild(badge);

    const tableWrap = document.createElement("div");
    tableWrap.className = "tableWrap";

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th style="width:38%;">Item</th>
        <th style="width:18%;">Utensil</th>
        <th style="width:10%;">Shelf Life</th>
        <th style="width:22%;">${shift.toUpperCase()} Check (Appearance / Taste / Temp)</th>
        <th style="width:12%;">Note (optional)</th>
      </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    section.rows.forEach((r, idx) => {
      const tr = document.createElement("tr");

      const tdItem = document.createElement("td");
      tdItem.textContent = r.item;

      const tdU = document.createElement("td");
      tdU.className = "small";
      tdU.textContent = r.utensil || "";

      const tdL = document.createElement("td");
      tdL.className = "small";
      tdL.textContent = r.life || "";

      const tdChecks = document.createElement("td");
      tdChecks.className = "checks";

      const group = document.createElement("div");
      group.className = "checkGroup";

      for (const f of FIELDS) {
        const chkWrap = document.createElement("label");
        chkWrap.className = "chk";

        const cb = document.createElement("input");
        cb.type = "checkbox";

        const k = keyFor(section.id, idx, f);
        cb.checked = !!state[shift].checks[k];

        cb.addEventListener("change", () => {
          state[shift].checks[k] = cb.checked;
          saveState();
          updateUIState();
        });

        const span = document.createElement("span");
        span.textContent = f[0].toUpperCase() + f.slice(1);

        chkWrap.appendChild(cb);
        chkWrap.appendChild(span);
        group.appendChild(chkWrap);
      }

      tdChecks.appendChild(group);

      const tdNote = document.createElement("td");
      const note = document.createElement("input");
      note.className = "noteInput";
      note.placeholder = "";
      const nk = rowId(section.id, idx);
      note.value = state[shift].notes[nk] || "";
      note.addEventListener("input", () => {
        state[shift].notes[nk] = note.value;
        saveState();
      });
      tdNote.appendChild(note);

      tr.appendChild(tdItem);
      tr.appendChild(tdU);
      tr.appendChild(tdL);
      tr.appendChild(tdChecks);
      tr.appendChild(tdNote);

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tableWrap.appendChild(table);

    // Photos per section
    const photosBox = document.createElement("div");
    photosBox.className = "photos";

    const photoRow = document.createElement("div");
    photoRow.className = "photoRow";

    const hint = document.createElement("div");
    hint.className = "photoHint";
    hint.textContent = "Add photos for this section:";

    const photoInput = document.createElement("input");
    photoInput.type = "file";
    photoInput.accept = "image/*";
    photoInput.capture = "environment";
    photoInput.multiple = true;

    photoInput.addEventListener("change", async () => {
      const files = Array.from(photoInput.files || []);
      if (!files.length) return;

      const metas = state[shift].photos[section.id] || [];
      for (const f of files) {
        const dataUrl = await fileToDataUrl(f, { maxDimension: 1400, quality: 0.82 });
        metas.push({ name: f.name || "photo.jpg", type: "image/jpeg", dataUrl });
      }
      state[shift].photos[section.id] = metas;

      saveState();
      render();
      updateUIState();
    });

    const thumbs = document.createElement("div");
    thumbs.className = "thumbs";

    const stored = state[shift].photos[section.id] || [];
    stored.forEach((p, i) => {
      const img = document.createElement("img");
      img.src = p.dataUrl;
      img.title = "Tap to remove";
      img.addEventListener("click", () => {
        if (confirm("Remove this photo?")) {
          const cur = state[shift].photos[section.id] || [];
          cur.splice(i, 1);
          state[shift].photos[section.id] = cur;
          saveState();
          render();
          updateUIState();
        }
      });
      thumbs.appendChild(img);
    });

    photoRow.appendChild(hint);
    photoRow.appendChild(photoInput);

    photosBox.appendChild(photoRow);
    photosBox.appendChild(thumbs);

    card.appendChild(head);
    card.appendChild(tableWrap);
    card.appendChild(photosBox);

    checklistEl.appendChild(card);
  });

  updateSectionBadges();
}

function countTotals() {
  let total = 0;
  let checked = 0;

  SECTIONS.forEach(section => {
    section.rows.forEach((_, idx) => {
      for (const f of FIELDS) {
        total++;
        const k = keyFor(section.id, idx, f);
        if (state[shift].checks[k]) checked++;
      }
    });
  });

  return { total, checked };
}

function updateSectionBadges() {
  SECTIONS.forEach(section => {
    const badge = document.querySelector(`.badge[data-section="${section.id}"]`);
    if (!badge) return;

    let ok = true;
    section.rows.forEach((_, idx) => {
      for (const f of FIELDS) {
        const k = keyFor(section.id, idx, f);
        if (state[shift].checks[k] !== true) ok = false;
      }
    });

    badge.classList.toggle("ok", ok);
    badge.classList.toggle("warn", !ok);
    badge.textContent = ok ? "Complete" : "Incomplete";
  });
}

function metaComplete() {
  return !!managerEl.value.trim() && !!dateEl.value;
}

function updateUIState() {
  const { total, checked } = countTotals();
  progressEl.textContent = `${shift.toUpperCase()} Progress: ${checked}/${total} checks done (Appearance/Taste/Temp).`;

  updateSectionBadges();

  submitBtn.disabled = !(metaComplete() && checked === total);
}

// -------- Photo helper (compress for smaller storage & smaller PDF) --------
async function fileToDataUrl(file, { maxDimension = 1400, quality = 0.82 } = {}) {
  const img = await loadImageFromFile(file);

  const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, w, h);

  return canvas.toDataURL("image/jpeg", quality);
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
    img.src = url;
  });
}

// ---------------- PDF ----------------
async function submit() {
  statusEl.className = "status";
  statusEl.textContent = "";

  if (!metaComplete()) {
    statusEl.className = "status err";
    statusEl.textContent = "Manager Name and Date are required.";
    return;
  }

  const { total, checked } = countTotals();
  if (checked !== total) {
    statusEl.className = "status err";
    statusEl.textContent = "All Appearance/Taste/Temp checks must be completed before submitting.";
    return;
  }

  try {
    submitBtn.disabled = true;
    statusEl.textContent = "Building PDF…";

    const meta = {
      manager: managerEl.value.trim(),
      date: dateEl.value,
      store: storeEl.value.trim(),
      time: timeEl.value,
      submittedAt: new Date().toLocaleString()
    };

    const doc = await buildPdf({ shift, meta });

    const safeMgr = meta.manager.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
    const filename = `Quality-Check-${shift.toUpperCase()}-${meta.date}-${safeMgr || "Manager"}.pdf`;

    doc.save(filename);

    statusEl.className = "status ok";
    statusEl.textContent = "PDF created. If it opens preview, tap Share → Save to Files.";
  } catch (e) {
    statusEl.className = "status err";
    statusEl.textContent = `PDF Error: ${e?.message || e}`;
  } finally {
    submitBtn.disabled = false;
    updateUIState();
  }
}

async function buildPdf({ shift, meta }) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "letter" });

  const margin = 40;
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const maxW = pageW - margin * 2;

  let y = margin;

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(`Quality Check — ${shift.toUpperCase()}`, margin, y);
  y += 22;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const metaLines = [
    `Manager: ${meta.manager}`,
    `Date: ${meta.date}` + (meta.time ? `   Time: ${meta.time}` : ""),
    meta.store ? `Store: ${meta.store}` : "",
    `Submitted: ${meta.submittedAt}`
  ].filter(Boolean);

  y = writeWrapped(doc, metaLines.join("\n"), margin, y, maxW, 14);
  y += 10;

  // Sections
  for (const section of SECTIONS) {
    y = ensureSpace(doc, y, 26, margin);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(section.title, margin, y);
    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    // Column headings
    const colItem = margin;
    const colU = margin + 260;
    const colL = margin + 420;
    const colC = margin + 490;

    y = ensureSpace(doc, y, 18, margin);
    doc.setFont("helvetica", "bold");
    doc.text("Item", colItem, y);
    doc.text("Utensil", colU, y);
    doc.text("Life", colL, y);
    doc.text("A / T / Temp", colC, y);
    doc.setFont("helvetica", "normal");
    y += 10;

    for (let i = 0; i < section.rows.length; i++) {
      const r = section.rows[i];

      const a = state[shift].checks[keyFor(section.id, i, "appearance")] ? "✓" : " ";
      const t = state[shift].checks[keyFor(section.id, i, "taste")] ? "✓" : " ";
      const tp = state[shift].checks[keyFor(section.id, i, "temp")] ? "✓" : " ";

      const noteKey = rowId(section.id, i);
      const note = (state[shift].notes[noteKey] || "").trim();

      // Wrap item text
      const itemLines = doc.splitTextToSize(r.item, 240);
      const uLines = doc.splitTextToSize(r.utensil || "", 150);

      // compute row height
      const rowH = Math.max(itemLines.length, uLines.length, 1) * 12 + (note ? 12 : 0) + 6;
      y = ensureSpace(doc, y, rowH, margin);

      // write
      let yy = y;
      itemLines.forEach((ln, idx) => doc.text(ln, colItem, yy + idx * 12));
      uLines.forEach((ln, idx) => doc.text(ln, colU, yy + idx * 12));
      doc.text((r.life || ""), colL, yy);

      doc.text(`[${a}]  [${t}]  [${tp}]`, colC, yy);

      if (note) {
        const noteLines = doc.splitTextToSize(`Note: ${note}`, maxW);
        doc.setFontSize(9);
        noteLines.forEach((ln, idx) => doc.text(ln, colItem, yy + (Math.max(itemLines.length, uLines.length) * 12) + 12 + idx * 11));
        doc.setFontSize(10);
      }

      y += rowH;
      y += 2;
    }

    // Photos
    const photos = state[shift].photos[section.id] || [];
    if (photos.length) {
      y += 6;
      y = ensureSpace(doc, y, 18, margin);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Photos:", margin, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      y += 10;

      const thumb = 110;
      const gap = 10;
      const perRow = Math.max(1, Math.floor((maxW + gap) / (thumb + gap)));

      let col = 0;
      let x = margin;

      for (const p of photos) {
        y = ensureSpace(doc, y, thumb + 30, margin);
        doc.addImage(p.dataUrl, "JPEG", x, y, thumb, thumb);

        doc.setFontSize(9);
        doc.text((p.name || "photo").slice(0, 24), x, y + thumb + 12);
        doc.setFontSize(10);

        col++;
        if (col >= perRow) {
          col = 0;
          x = margin;
          y += thumb + 24;
        } else {
          x += thumb + gap;
        }
      }
      if (col !== 0) y += thumb + 24;
    }

    y += 10;
  }

  addPageNumbers(doc);
  return doc;
}

function writeWrapped(doc, text, x, y, maxWidth, lineHeight) {
  const lines = String(text).split("\n");
  for (const raw of lines) {
    const wrapped = doc.splitTextToSize(raw, maxWidth);
    for (const w of wrapped) {
      y = ensureSpace(doc, y, lineHeight, 40);
      doc.text(w, x, y);
      y += lineHeight;
    }
  }
  return y;
}

function ensureSpace(doc, y, needed, margin) {
  const pageH = doc.internal.pageSize.getHeight();
  if (y + needed > pageH - margin) {
    doc.addPage();
    return margin;
  }
  return y;
}

function addPageNumbers(doc) {
  const pageCount = doc.getNumberOfPages();
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.text(`Page ${i} of ${pageCount}`, pageW - 95, pageH - 25);
  }
}

// ---------------- Events / Init ----------------
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => setShift(btn.dataset.shift));
});

[managerEl, dateEl, storeEl, timeEl].forEach(el => el.addEventListener("input", () => {
  saveState();
  updateUIState();
}));

submitBtn.addEventListener("click", submit);

(function init() {
  const now = new Date();
  if (!state.meta.date) state.meta.date = now.toISOString().slice(0, 10);
  if (!state.meta.time) state.meta.time = now.toTimeString().slice(0, 5);

  managerEl.value = state.meta.manager || "";
  dateEl.value = state.meta.date || "";
  storeEl.value = state.meta.store || "";
  timeEl.value = state.meta.time || "";

  render();
  updateUIState();
})();
