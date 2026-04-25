import { useState } from "react";

const AddIncomeForm = ({ onAddIncome, categories }) => {
  const [income, setIncome] = useState({
    name: '',
    amount: '',
    date: '',
    icon: '',
    categoryId: ''
  });

  // Example of mapping categories for a dropdown/select
  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name // Assuming a name field exists
  }));

  return (
    <div>Add income</div>
  );
};

export default AddIncomeForm