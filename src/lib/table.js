export default class Table {
  constructor(tableContainerId, formData, handleEditCallback, handleDeleteCallback) {
    this.container = document.getElementById('tableDiv');
    this.table = document.createElement('table');
    this.table.classList.add('table', 'table-bordered');
    this.formData = formData;

    this.container.appendChild(this.table);

    this.addHeaderRow();
    this.setupEventListeners();
  }

  setupEventListeners() {

    document.addEventListener('dataAdded', (event) => {
      const newData = event.detail;
    
      this.addRow(newData);
    });
  }

  addHeaderRow() {
    const headerRow = this.table.createTHead().insertRow();
    this.formData.forEach((field) => {
      if (field.type !== 'submit' && field.type !== 'reset') {
        const headerCell = document.createElement('th');
        headerCell.textContent = field.label || field.key;
        headerRow.appendChild(headerCell);
      }
    });

    const actionHeaderCell = document.createElement('th');
    actionHeaderCell.textContent = 'Actions';
    headerRow.appendChild(actionHeaderCell);
  }

  addRow(data) {
    const row = this.table.insertRow();
    this.formData.forEach((field) => {
      const cell = row.insertCell();
      cell.textContent = data[field.key];
    });

    const editCell = row.insertCell();
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => handleEditCallback(data));
    editCell.appendChild(editButton);

    const deleteCell = row.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => handleDeleteCallback(data));
    deleteCell.appendChild(deleteButton);
  }
}

