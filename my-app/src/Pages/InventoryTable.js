import React, { useState } from "react";
import "./InventoryTable.css"; // 引入樣式檔案

function InventoryTable() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Product A", quantity: 10, price: 100,deleted: false },
    { id: 2, name: "Product B", quantity: 5, price: 200,deleted: false },
    { id: 3, name: "Product C", quantity: 20, price: 300,deleted: false },
  ]);

  const [editRowId, setEditRowId] = useState(null); // 控制編輯行
  const [searchName, setSearchName] = useState(''); // 搜尋名稱
  const [searchId, setSearchId] = useState(''); // 搜尋ID

  const handleEdit = (id) => {
    setEditRowId(id); // 設置正在編輯的行
  };

  const handleDelete = (id) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, deleted: true } : item
      )
    );
  };

  const handleAdd = () => {
    const newId = inventory.length ? inventory[inventory.length - 1].id + 1 : 1;
    const newItem = { id: newId, name: '', quantity: '', price: '', deleted: false };
    setInventory([...inventory, newItem]);
    setEditRowId(newId); // 自動進入編輯模式
  };

  const handleSave = (id) => {
    setEditRowId(null); // 儲存後退出編輯模式
  };

  const handleSaveField = (id, field, value) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSearch = () => {
    const filtered = inventory.map((item) => {
      if (
        (!searchName || item.name.toLowerCase().includes(searchName.toLowerCase())) &&
        (!searchId || String(item.id).includes(searchId))
      ) {
        return { ...item, highlight: true };
      } else {
        return { ...item, highlight: false };
      }
    });
    setInventory(filtered);
  };

  return (
    <div className="inventory-container">
      <h1 className="inventory-title">Inventory Management</h1>
      {/* 搜尋欄位 */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Item Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Item Number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
        
        {/* Add and Save buttons */}
        <button className="add-button" onClick={handleAdd}>Add</button>
        {editRowId !== null && (
          <button className="save-button" onClick={() => handleSaveField(editRowId)}>Save</button>
        )}
      </div>
      
      
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item Number</th>
            <th>Item Name</th>
            <th>Inventory Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {inventory.map((item) => (
                <tr
                key={item.id}
                className={item.deleted ? 'deleted-row' : item.highlight ? 'highlight-row' : ''}
                >
                <td>{item.id}</td>
                <td>
                    {editRowId === item.id ? (
                    <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleSave(item.id, 'name', e.target.value)}
                    />
                    ) : (
                    item.name
                    )}
                </td>
                <td>
                    {editRowId === item.id ? (
                    <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleSave(item.id, 'quantity', e.target.value)}
                    />
                    ) : (
                    item.quantity
                    )}
                </td>
                <td>
                    {editRowId === item.id ? (
                    <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handleSave(item.id, 'price', e.target.value)}
                    />
                    ) : (
                    `$${item.price}`
                    )}
                </td>
                <td>
                    <button
                    className="edit-delete-button"
                    onClick={() => handleEdit(item.id)}
                    >
                    Edit
                    </button>
                    <button
                    className="edit-delete-button"
                    onClick={() => handleDelete(item.id)}
                    >
                    Delete
                    </button>
                </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
