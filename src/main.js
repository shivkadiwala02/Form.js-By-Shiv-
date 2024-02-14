import formData from './data/formData.js';
import Form from './lib/form.js';
import Storage from './lib/storage.js';
import Table from './lib/table.js';

class Main {
  constructor(formContainerId, storageId, tableContainerId) {

    const getUserId = (obj) => formData.find(field => field.key === 'userId').getValue(obj);
    const getCreatedAt = (obj) => formData.find(field => field.key === 'createdAt').getValue(obj);

    const storage = new Storage(storageId);


    const handleFormSubmit = (formDataObject) => {
      storage.addData(formDataObject, getUserId, getCreatedAt);;
    };

    const handleEdit = (data) => {
      console.log('Edit clicked:', data);
    };

    const handleDelete = (data) => {
      console.log('Delete clicked:', data);
    };

    const frm = new Form(formContainerId, formData, handleFormSubmit);
    const tbl = new Table(tableContainerId, formData, handleEdit, handleDelete);

    document.addEventListener('DOMContentLoaded', () => {

      const storedData = storage.loadData();
console.log(storedData)
      storedData.forEach((data) => {
        const addDataEvent = new CustomEvent('dataAdded', { detail: data });

        document.dispatchEvent(addDataEvent);
      });
    });

  }
}

const main = new Main('container', 'storageId', 'tableContainerId');
console.log(main);
