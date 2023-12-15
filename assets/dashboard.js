const shrink_btn = document.querySelector(".shrink-btn");
const search = document.querySelector(".search");
const sidebar_links = document.querySelectorAll(".sidebar-links a");
const active_tab = document.querySelector(".active-tab");
const shortcuts = document.querySelector(".sidebar-links h4");
const tooltip_elements = document.querySelectorAll(".tooltip-element")
const main_content = document.querySelector(".main-content");
let activeIndex; 


shrink_btn.addEventListener("click", () => {
  document.body.classList.toggle("shrink");
  
  setTimeout(moveActiveTab, 400);
  
  shrink_btn.classList.toggle("hovered");
  
  setTimeout(
    () => {
      shrink_btn.classList.remove("hovered")
    }, 500);
});

search.addEventListener("click", () => {
  document.body.classList.remove("shrink");
  search.lastElementChild.focus();  
});

function showTooltip() {
  let tooltip = this.parentNode.lastElementChild;
  let spans = tooltip.children;
  let tooltipIndex = this.dataset.tooltip;
  
  Array.from(spans).forEach((sp) => sp.classList.remove("show"))
  spans[tooltipIndex].classList.add("show");
  
  tooltip.style.top = `${(100 / (spans.length * 2)) * (tooltipIndex * 2 + 1)}%`;
}

tooltip_elements.forEach(elem => {
  elem.addEventListener("mouseover", showTooltip);
})


const columnDefs = [
  { field: "partner_type", initialWidth: 120, headerName: "Partner Type", suppressMovable: true, checkboxSelection: true, showDisabledCheckboxes: true },
  { field: "partner_name", initialWidth: 250, headerName: "Partner Name", suppressMovable: true },
  { field: "partner_address", initialWidth: 250, headerName: "Partner Address",suppressMovable: true },
  { field: "partner_city", initialWidth: 150, headerName: "Partner City", suppressMovable: true },
  { field: "partner_zipCode", initialWidth: 150, headerName: "Partner Zip Code", suppressMovable: true },
  { field: "partner_mobile", initialWidth: 200, headerName: "Partner Mobile", suppressMovable: true },
  { field: "partner_phone", initialWidth: 200, headerName: "Partner Phone", suppressMovable: true },
  { field: "partner_email", initialWidth: 200,headerName: "Partner Email", suppressMovable: true },
  { field: "partner_notes", initialWidth: 230,headerName: "Partner Notes", suppressMovable: true }
];

// specify the data
const rowData = [
  { partner_type: "S/I", partner_name: "Papanikolaou Dimosthenis",  partner_address:"Korinthou 47", partner_city: "Aigio", partner_zipCode: "25100", partner_mobile: "+30 6972449275", partner_phone:"+30 6979748700", partner_email: "dimoservice2@gmail.com", partner_notes: "Notes"},
  { partner_type: "S/I", partner_name: "Papanikolaou Dimosthenis",  partner_address:"", partner_city: "", partner_zipCode: "", partner_mobile: "", partner_phone:"", partner_email: "", partner_notes: ""},
  { partner_type: "S/I", partner_name: "Papanikolaou Dimosthenis",  partner_address:"", partner_city: "", partner_zipCode: "", partner_mobile: "", partner_phone:"", partner_email: "", partner_notes: ""},
  { partner_type: "S/I", partner_name: "Papanikolaou Dimosthenis",  partner_address:"", partner_city: "", partner_zipCode: "", partner_mobile: "", partner_phone:"", partner_email: "", partner_notes: ""},
  { partner_type: "S/I", partner_name: "Papanikolaou Dimosthenis",  partner_address:"", partner_city: "", partner_zipCode: "", partner_mobile: "", partner_phone:"", partner_email: "", partner_notes: ""},
  { partner_type: "S/I", partner_name: "Papanikolaou Dimosthenis",  partner_address:"", partner_city: "", partner_zipCode: "", partner_mobile: "", partner_phone:"", partner_email: "", partner_notes: ""},
  { partner_type: "S/I", partner_name: "Papanikolaou Dimosthenis",  partner_address:"", partner_city: "", partner_zipCode: "", partner_mobile: "", partner_phone:"", partner_email: "", partner_notes: ""},
  { partner_type: "S/I", partner_name: "Papanikolaou Dimosthenis",  partner_address:"", partner_city: "", partner_zipCode: "", partner_mobile: "", partner_phone:"", partner_email: "", partner_notes: ""},
  { partner_type: "S/I", partner_name: "Papanikolaou Dimosthenis",  partner_address:"", partner_city: "", partner_zipCode: "", partner_mobile: "", partner_phone:"", partner_email: "", partner_notes: ""},
  { partner_type: "S/I", partner_name: "Papanikolaou Dimosthenis",  partner_address:"", partner_city: "", partner_zipCode: "", partner_mobile: "", partner_phone:"", partner_email: "", partner_notes: ""}
 ];


const gridOptions = {
  defaultColDef: {
      resizable: false,
      initialWidth: 200,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      sortable: true
  },
  columnDefs: columnDefs,
  rowData: rowData,
  rowSelection: 'single',
  pagination: true,
  animateRows: true,
  onSelectionChanged: () => {
      const selectedData = gridOptions.api.getSelectedRows();
      console.log('Selection Changed', selectedData);
  },
  
};

function getSelectedRowData() {
  let selectedData = gridOptions.api.getSelectedRows();
  return selectedData
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});


document.getElementById('viewProduct').addEventListener('click', function(){
  let rowData = getSelectedRowData();
  console.log(rowData[0].product_id);
  //this.href = "dadadasd"+rowData[0].product_id;
});

document.getElementById('editProduct').addEventListener('click', function(){
  let rowData = getSelectedRowData();
  console.log(rowData[0].product_id);
  //this.href = "dadadasd"+rowData[0].product_id;
});

document.getElementById('deleteProduct').addEventListener('click', function(){
  let rowData = getSelectedRowData();
  console.log(rowData[0].product_id);
  Toastify({
    text: "Product deleted successfully",
    duration: 3000
  }).showToast();
  
  return 
});

function onFilterTextBoxChanged() {
  gridOptions.api.setQuickFilter(
      document.getElementById('product_search').value
  );
}




document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.modalTrigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      closeAllModals();
    }
  });
});

document.getElementById("footerCYear").innerHTML = new Date().getFullYear();