import React from 'react'
import { useState } from 'react';  
import Input from "./Input.jsx"; 
import EmojiPickerPopup from './EmojiPickerPopup.jsx';

const AddCategoryForm = () => {
  
        const [category, setCategory] = useState({
            name: "",
            type: "income",
            icon: ""
        });

        const categoryTypeOptions = [
            { value: "income", label: "Income" },
            { value: "expense", label: "Expense" },
        ];

       const handleChange = (key, value) => {
                setCategory({ ...category, [key]: value });
            };

        return (
            <div className="p-4">

                <EmojiPickerPopup
                    icon={category.icon}
                    onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
                    />

                <Input 
                    value={category.name}
                    onChange={({target}) => handleChange("name", target.value)}
                    label="Category Name"
                    placeholder="e.g., Freelance, Salary, Groceries"
                    type="text"
                />

                  <Input
                        label="Category Type"
                        value={category.type}
                        onChange={({ target }) => handleChange("type", target.value)}
                        isSelect={true}
                        options={categoryTypeOptions}
                    />
                    
            </div>

        );
}

export default AddCategoryForm