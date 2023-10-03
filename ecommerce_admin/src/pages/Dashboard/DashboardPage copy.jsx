import React, { useState } from "react";
import "../../assets/css/dashboard.css";
import SelectCategory from "../../components/SelectCategory";

const DashboardPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    properties: [],
  });
  const data = ["size", "color", "ram"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePropertyChange = (e, index) => {
    const newProperties = [...formData.properties];
    newProperties[index] = {
      ...newProperties[index],
      data: e.target.value,
    };
    setFormData({
      ...formData,
      properties: newProperties,
    });
  };

  const handleQuantityChange = (e, index) => {
    const newProperties = [...formData.properties];
    newProperties[index] = {
      ...newProperties[index],
      quantity: e.target.value,
    };
    setFormData({
      ...formData,
      properties: newProperties,
    });
  };

  const handleAddProperty = () => {
    setFormData({
      ...formData,
      properties: [
        ...formData.properties,
        { data: "", quantity: 0 },
      ],
    });
  };

  return (
    <div className="container__dashboard">
      <form>
        <div>
          <label>
            Tên sản phẩm:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Thuộc tính:
            {formData.properties.map((property, index) => (
              <div key={index}>
                {data.map((dataItem, dataIndex) => (
                  <input
                    key={dataIndex}
                    type="text"
                    placeholder={dataItem}
                    onChange={(e) =>
                      handlePropertyChange(e, index)
                    }
                  />
                ))}
                <input
                  type="number"
                  placeholder="Quantity"
                  value={property.quantity}
                  onChange={(e) =>
                    handleQuantityChange(e, index)
                  }
                />
              </div>
            ))}
            <button type="button" onClick={handleAddProperty}>
              Thêm thuộc tính
            </button>
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DashboardPage;
