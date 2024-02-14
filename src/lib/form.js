
export default class Form {
  constructor(formContainerId, formData, handleSubmitCallback) {
    this.container = document.getElementById(formContainerId);
    this.form = document.createElement('form');
    this.formData = formData;

    this.initializeForm();
    this.form.addEventListener('submit', (event) => this.handleSubmit(handleSubmitCallback, event));

    this.container.appendChild(this.form);
  }


  initializeForm() {
    this.formData.forEach(field => {
      const inputElement = this.createInputElement(field);
      if (inputElement) {
        this.form.appendChild(inputElement);
      }
    });
  }


  createInputElement(field) {

    if(field.type==='hidden'){
      return
    }





    if (field.type === 'submit' || field.type === 'reset') {
      const buttonElement = document.createElement('input');
      buttonElement.setAttribute('type', field.type);
      buttonElement.setAttribute('id', field.attr && field.attr.id ? field.attr.id : field.key);
      buttonElement.setAttribute('name', field.key);

      buttonElement.setAttribute('class', field.attr && field.attr.className ? field.attr.className : 'btn');

      buttonElement.innerText = field.value || '';

      return buttonElement;
    }

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('form-group');
    const labelElement = document.createElement('label');
    labelElement.innerText = field.label;
    labelElement.setAttribute('for', field.attr && field.attr.id ? field.attr.id : field.key);
    inputContainer.appendChild(labelElement);

    if (field.type === 'radio') {
      field.options.forEach(option => {
        const radioContainer = document.createElement('div');
        radioContainer.classList.add('form-check');

        const radioElement = document.createElement('input');
        radioElement.setAttribute('type', 'radio');
        radioElement.setAttribute('id', option.attr && option.attr.id ? option.attr.id : option.value);
        radioElement.setAttribute('name', field.key);
        radioElement.setAttribute('class', option.attr && option.attr.className ? option.attr.className : 'form-check-input');
        radioElement.setAttribute('value', option.value);

        const optionLabel = document.createElement('label');
        optionLabel.innerText = option.innerText;
        optionLabel.setAttribute('for', option.attr && option.attr.id ? option.attr.id : option.value);

        radioContainer.appendChild(radioElement);
        radioContainer.appendChild(optionLabel);

        inputContainer.appendChild(radioContainer);
      });
    } else if (field.type === 'checkbox') {
      field.options.forEach(option => {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('form-check');

        const checkboxElement = document.createElement('input');
        checkboxElement.setAttribute('type', 'checkbox');
        checkboxElement.setAttribute('id', option.attr && option.attr.id ? option.attr.id : option.value);
        checkboxElement.setAttribute('name', field.key);
        checkboxElement.setAttribute('class', option.attr && option.attr.className ? option.attr.className : 'form-check-input');
        checkboxElement.setAttribute('value', option.value);

        const optionLabel = document.createElement('label');
        optionLabel.innerText = option.innerText;
        optionLabel.setAttribute('for', option.attr && option.attr.id ? option.attr.id : option.value);

        checkboxContainer.appendChild(checkboxElement);
        checkboxContainer.appendChild(optionLabel);

        inputContainer.appendChild(checkboxContainer);
      });
    } else if (field.type === 'select') {
      const selectElement = document.createElement('select');
      selectElement.setAttribute('id', field.attr && field.attr.id ? field.attr.id : field.key);
      selectElement.setAttribute('name', field.key);
      selectElement.setAttribute('class', field.attr && field.attr.className ? field.attr.className : 'form-control');
      selectElement.setAttribute('required', field.attr && field.attr.required ? 'required' : '');

      field.options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.innerText = option.innerText;
        optionElement.setAttribute('value', option.value);
        selectElement.appendChild(optionElement);
      });

      inputContainer.appendChild(selectElement);
    } else if(field.type==='textarea'){
      const textareaElement=document.createElement('textarea');
      textareaElement.setAttribute('id', field.attr && field.attr.id ? field.attr.id : field.key);
      textareaElement.setAttribute('name', field.key);
      textareaElement.setAttribute('class', field.attr && field.attr.className ? field.attr.className : 'form-control');
      textareaElement.setAttribute('required', field.attr && field.attr.required ? 'required' : '');
      inputContainer.appendChild(textareaElement)
      textareaElement.setAttribute('placeholder', field.attr && field.attr.placeholder ? field.attr.placeholder : '');
      textareaElement.setAttribute('rows', field.attr && field.attr.rows ? field.attr.rows : '5');
      textareaElement.setAttribute('value', field.value || '');


    }


    else {
      const inputElement = document.createElement('input');
      inputElement.setAttribute('type', field.type);
      inputElement.setAttribute('id', field.attr && field.attr.id ? field.attr.id : field.key);
      inputElement.setAttribute('name', field.key);
      inputElement.setAttribute('class', field.attr && field.attr.className ? field.attr.className : 'form-control');
      inputElement.setAttribute('placeholder', field.attr && field.attr.placeholder ? field.attr.placeholder : '');

      inputElement.setAttribute('value', field.value || '');

      inputContainer.appendChild(inputElement);
    }

    return inputContainer;
  }




  // setEditMode(index, data) {
  //   this.editMode = true;
  //   this.editIndex = index;


  //   this.formData.forEach(field => {
  //     if (field.type !== 'submit' && field.type !== 'reset') {
  //       const element = this.form.elements[field.key];
  //       if (element) {
  //         if (field.type === 'checkbox') {

  //           element.checked = data[field.key].includes(element.value);
  //         } else {
  //           element.value = data[field.key];
  //         }
  //       }
  //     }
  //   });

  //   const updateButton = document.createElement('button');
  //   updateButton.type = 'button';
  //   updateButton.textContent = 'Update';
  //   updateButton.onclick = this.handleUpdate.bind(this);

  //   const cancelButton = document.createElement('button');
  //   cancelButton.type = 'button';
  //   cancelButton.textContent = 'Cancel';
  //   cancelButton.onclick = this.handleCancel.bind(this);


  //   const submitButton = document.getElementById('btnSubmit');
  //   const resetButton = document.getElementById('btnReset');
  //   submitButton.parentNode.replaceChild(updateButton, submitButton);
  //   resetButton.parentNode.replaceChild(cancelButton, resetButton);
  // }

  // handleUpdate() {

  //   const formDataObject = this.getFormDataObject();
  //   this.storage.updateData(this.editIndex, formDataObject);


  //   this.table.displayData();


  //   this.form.reset();

  //   this.editMode = false;
  //   this.editIndex = null;


  //   const submitButton = document.createElement('button');
  //   submitButton.type = 'submit';
  //   submitButton.textContent = 'Submit';

  //   const resetButton = document.createElement('button');
  //   resetButton.type = 'reset';
  //   resetButton.textContent = 'Reset';


  //   const updateButton = document.getElementById('btnUpdate');
  //   const cancelButton = document.getElementById('btnCancel');
  //   updateButton.parentNode.replaceChild(submitButton, updateButton);
  //   cancelButton.parentNode.replaceChild(resetButton, cancelButton);
  // }

  // handleCancel() {

  //   this.form.reset();


  //   this.editMode = false;
  //   this.editIndex = null;

  //   const submitButton = document.createElement('button');
  //   submitButton.type = 'submit';
  //   submitButton.textContent = 'Submit';

  //   const resetButton = document.createElement('button');
  //   resetButton.type = 'reset';
  //   resetButton.textContent = 'Reset';

  //   const updateButton = document.getElementById('btnUpdate');
  //   const cancelButton = document.getElementById('btnCancel');
  //   updateButton.parentNode.replaceChild(submitButton, updateButton);
  //   cancelButton.parentNode.replaceChild(resetButton, cancelButton);
  // }




  handleSubmit(handleSubmitCallback, event) {
    event.preventDefault();
    const formDataObject = {};
   
    Array.from(this.form.elements).forEach(element => {
      if (element.name) {
        if (element.type === 'checkbox' && element.checked) {
          formDataObject[element.name] = formDataObject[element.name] || [];
          formDataObject[element.name].push(element.value);
        } else if (element.type !== 'checkbox') {
          formDataObject[element.name] = element.value;
        }
      }
    });

    console.log('Form Data:', formDataObject);
    alert("Data is added Successfully ")
    handleSubmitCallback(formDataObject);
  }
}





