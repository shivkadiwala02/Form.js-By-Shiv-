export default class Storage {
  constructor(storageId) {
    this.storageId = storageId;
    console.log('Storage');
  }

  loadData() {
    const storedData = localStorage.getItem(this.storageId);
    return storedData ? JSON.parse(storedData) : [];
  }

  saveData(data) {
    localStorage.setItem(this.storageId, JSON.stringify(data));
  }

  addData(newData, getUserId, getCreatedAt) {
    const data = this.loadData();
    const userId = getUserId(newData);
    const createdAt = getCreatedAt(newData);

    newData.userId = userId;
    newData.createdAt = createdAt;

    data.push(newData);
    this.saveData(data);

    const addDataEvent = new CustomEvent('dataAdded', { detail: newData });

    document.dispatchEvent(addDataEvent);
  }
}
