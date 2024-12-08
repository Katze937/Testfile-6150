import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./InventoryTable.css"; // 引入樣式檔案

function InventoryTable() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Product A", quantity: 10, price: 100, image: null, deleted: false },
    { id: 2, name: "Product B", quantity: 5, price: 200, image: null, deleted: false },
    { id: 3, name: "Product C", quantity: 20, price: 300, image: null, deleted: false },
  ]);
  const [filteredInventory, setFilteredInventory] = useState(inventory);
  const [editRowId, setEditRowId] = useState(null); 
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState(""); 
  const navigate = useNavigate();

  const handleEdit = (id) => {
    setEditRowId(id); // 設置正在編輯的行
  };

  const handleDelete = (id) => {
    const updatedInventory = inventory.map((item) =>
      item.id === id ? { ...item, deleted: true } : item
    );
    setInventory(updatedInventory);
    setFilteredInventory(updatedInventory); // 同步更新过滤后的数据
  };

  const handleAdd = () => {
    const newId = inventory.length ? inventory[inventory.length - 1].id + 1 : 1;
    const newItem = { id: newId, name: "", quantity: "", price: "", image: null, deleted: false };
    const updatedInventory = [...inventory, newItem];

    setInventory(updatedInventory);
    setFilteredInventory(updatedInventory); // 同步更新过滤后的数据
    setEditRowId(newId); // 自動進入編輯模式
  };

  const handleSave = (id) => {
    setEditRowId(null); // 儲存後退出編輯模式
  };

  const handleSaveField = (id, field, value) => {
    const updatedInventory = inventory.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setInventory(updatedInventory);
    setFilteredInventory(updatedInventory); // 同步更新过滤后的数据
  };

  const handleSearch = () => {
    const filteredInventory = inventory.filter((item) => {
      const matchesName = !searchName || item.name.toLowerCase().includes(searchName.toLowerCase());
      const matchesId = !searchId || String(item.id).includes(searchId);
      return matchesName && matchesId && !item.deleted;
    });

    setFilteredInventory(filteredInventory);
  };

  const handleImageUpload = (id, file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updatedInventory = inventory.map((item) =>
        item.id === id ? { ...item, image: reader.result } : item
      );
      setInventory(updatedInventory);
      setFilteredInventory(updatedInventory); // 同步更新过滤后的数据
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="inventory-container">
      <h1 className="inventory-title">Inventory Management</h1>
      
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
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>

        

        {/* Add and Save buttons */}
        <button className="add-button" onClick={handleAdd}>
          Add
        </button>
        {editRowId !== null && (
          <button className="save-button" onClick={() => handleSave(editRowId)}>
            Save
          </button>
        )}

        <button
          className="manage-users-button"
          onClick={() => navigate('/user-management')}
        >
          Manage Users
        </button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item Number</th>
            <th>Item Name</th>
            <th>Inventory Quantity</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <tr
              key={item.id}
              className={item.deleted ? "deleted-row" : ""}
            >
              <td>{item.id}</td>
              <td>
                {editRowId === item.id ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleSaveField(item.id, "name", e.target.value)}
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
                    onChange={(e) => handleSaveField(item.id, "quantity", e.target.value)}
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
                    onChange={(e) => handleSaveField(item.id, "price", e.target.value)}
                  />
                ) : (
                  `$${item.price}`
                )}
              </td>
              <td>
                {item.image ? (
                  <img src={item.image} alt={`Product ${item.name}`} className="item-image" />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(item.id, e.target.files[0])}
                  />
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
