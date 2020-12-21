var slist = {
  // (A) INITIALIZE SHOPPING LIST
  items : [], // current shopping list
  hlist : null, // HTML shopping list

  hlist1 : null,
  hlist2 : null,
  hlist3 : null,
  hlist4 : null,
  hlist5 : null,
  hlist6 : null,
  hlist7 : null,

  items_counter : null,
  qty_counter : null,
  kg_counter : null,


  hadd : null, // HTML add item form
  hitem : null, // HTML add item input field

  hitemcat : null, // category of the item
  hitemqty : null, // quantity of the item type
  hitemtype : null, // kg/qty type of the quantity
  init : function () {
    // (A1) GET HTML ELEMENTS + "ACTIVATE" ADD ITEM
    slist.hlist = document.getElementById("pieczywo");
    slist.hlist1 = document.getElementById("pieczywo");
    slist.hlist2 = document.getElementById("owoce");
    slist.hlist3 = document.getElementById("warzywa");
    slist.hlist4 = document.getElementById("higiena");
    slist.hlist5 = document.getElementById("mieso");
    slist.hlist6 = document.getElementById("nabial");
    slist.hlist7 = document.getElementById("inne");
    slist.items_counter = document.getElementById("items-counter");
    slist.qty_counter = document.getElementById("qty-counter");
    slist.kg_counter = document.getElementById("kg-counter");
    slist.hadd = document.getElementById("shop-add");
    slist.hitem = document.getElementById("shop-item-name");
    slist.hitemcat = document.getElementById("item-category");
    slist.hitemqty = document.getElementById("item-qty");
    slist.hitemtype = document.getElementById("qtype");
    slist.hadd.addEventListener("submit", slist.add);

    // (A2) RESTORE PREVIOUS SHOPPING LIST
    if (localStorage.items == undefined) { localStorage.items = "[]"; }
    slist.items = JSON.parse(localStorage.items);

    // (A3) DRAW HTML SHOPPING LIST
    slist.draw();
  },

  // (B) ADD NEW ITEM TO THE LIST
  add : function (evt) {
    // (B1) PREVENT FORM SUBMIT
    evt.preventDefault();

    // (B2) ADD NEW ITEM TO LIST
    slist.items.push({
      name : slist.hitem.value, // Item name
      category : slist.hitemcat.value,  // Item category
      qty : slist.hitemqty.value, // Item quantity szt

      qty_type : slist.hitemtype.value  // type of the item quantity



    });
    slist.hitem.value = "";
    slist.save();

    // (B3) REDRAW HTML SHOPPING LIST
    slist.draw();
  },

  // (C) DRAW THE HTML SHOPPING LIST
  draw : function () {
    slist.hlist.innerHTML = "";
    slist.hlist1.innerHTML = "";
    slist.hlist2.innerHTML = "";
    slist.hlist3.innerHTML = "";
    slist.hlist4.innerHTML = "";
    slist.hlist5.innerHTML = "";
    slist.hlist6.innerHTML = "";
    slist.hlist7.innerHTML = "";
    slist.items_counter.innerHTML = slist.items.length;

    var sum_qty = 0;
    var sum_kg = 0;

    if (slist.items.length > 0) {
      let row, name, category, qty, qty_type, delbtn, okbtn, items_counter;
      for (let i in slist.items) {
        // (C1) ITEM ROW
        row = document.createElement("div");
        row.className = "item-row";
        var category_name = slist.items[i].category;
        if (slist.items[i].category == "pieczywo")
        {
          slist.hlist1.appendChild(row)
        }
        if (slist.items[i].category == "owoce")
        {
          slist.hlist2.appendChild(row)
        }
        if (slist.items[i].category == "warzywa")
        {
          slist.hlist3.appendChild(row)
        }
        if (slist.items[i].category == "higiena")
        {
          slist.hlist4.appendChild(row)
        }
        if (slist.items[i].category == "mieso")
        {
          slist.hlist5.appendChild(row)
        }
        if (slist.items[i].category == "nabial")
        {
          slist.hlist6.appendChild(row)
        }
        if (slist.items[i].category == "inne")
        {
          slist.hlist7.appendChild(row)
        }

        // // (MY) ITEM CHECK BOX
        var chbtn = document.createElement("input");
        chbtn.className = "checked_item";
        chbtn.type = "checkbox";
        row.appendChild(chbtn);

        // (C2) ITEM NAME
        name = document.createElement("div");
        name.className = "item-name";
        name.innerHTML = slist.items[i].name;
        row.appendChild(name);

        // ITEM QUANTITY
        qty = document.createElement("div");
        qty.className = "list-item-qty";
        qty.innerHTML = slist.items[i].qty+" "+slist.items[i].qty_type;
        if(slist.items[i].qty_type == "szt"){sum_qty += parseInt(slist.items[i].qty);}  
        else sum_kg += parseInt(slist.items[i].qty);
        row.appendChild(qty);
        
        // (C3) DELETE BUTTON
        delbtn = document.createElement("input");
        delbtn.className = "item-del";
        delbtn.type = "button";
        delbtn.value = "USUŃ";
        delbtn.dataset.id = i;
        delbtn.addEventListener("click", slist.delete);
        row.appendChild(delbtn);
      }
    }
    slist.qty_counter.innerHTML = sum_qty;
    slist.kg_counter.innerHTML = sum_kg;
  },

  // (D) SAVE SHOPPING LIST INTO LOCAL STORAGE
  save : function () {
    if (localStorage.items == undefined) { localStorage.items = "[]"; }
    localStorage.items = JSON.stringify(slist.items);
  },

  // (E) DELETE SELECTED ITEM
  delete : function () {
    if (confirm("Remove selected item?")) {
      slist.items.splice(this.dataset.id, 1); 
      slist.save();
      slist.draw();
    }
  },
};
window.addEventListener("DOMContentLoaded", slist.init);

