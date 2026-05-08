import React, { useEffect, useState, useCallback } from 'react';
import DashBoard from "../components/DashBoard.jsx";
import { useUser } from '../hooks/useUser.jsx';
import { toast } from 'react-hot-toast';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/ApiEndpoints';
import { Plus } from 'lucide-react';
import ExpenseList from '../components/ExpenseList.jsx';
import Model from '../components/Model.jsx';
import AddExpenseForm from '../components/AddExpenseForm.jsx';
import DeleteAlert from '../components/DeleteAlert.jsx';
import ExpenseOverview from '../components/ExpenseOverview.jsx';

const Expense = () => {
    useUser();
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    const fetchExpenseDetails = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if (response.status === 200) {
                setExpenseData(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch expense details");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            toast.error("Failed to fetch categories");
        }
    };

    const handleAddExpense = async (expense) => {
        const { name, amount, date, icon, categoryId } = expense;

        if (!name.trim()) { toast.error("Please enter a name"); return; }
        if (!amount || isNaN(amount) || Number(amount) <= 0) { toast.error("Amount should be a valid number greater than 0"); return; }
        if (!date) { toast.error("Please select a date"); return; }

        const today = new Date().toISOString().split('T')[0];
        if (date > today) { toast.error("Date cannot be in the future"); return; }
        if (!categoryId) { toast.error("Please select a category"); return; }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            });
            if (response.status === 201) {
                setOpenAddExpenseModal(false);
                toast.success("Expense added successfully");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add expense");
        }
    };

    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "expense_details.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Expense details downloaded successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to download expense details");
        }
    };

    const handleEmailExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
            if (response.status === 200) {
                toast.success("Expense details emailed successfully");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to email expense details");
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, [fetchExpenseDetails]);

    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete expense");
        }
    };

    return (
        <DashBoard activeMenu="Expense">
            <div className="my-5 mx-auto px-4">
                <div className="flex flex-col gap-6">

                    <div className="flex justify-start">
                        <button
                            className="add-btn flex items-center gap-2"
                            onClick={() => setOpenAddExpenseModal(true)}
                        >
                            <Plus size={15} /> Add Expense
                        </button>
                    </div>

                    <ExpenseOverview transactions={expenseData} />

                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                        onDownload={handleDownloadExpenseDetails}
                        onEmail={handleEmailExpenseDetails}
                    />

                    <Model
                        isOpen={openAddExpenseModal}
                        onClose={() => setOpenAddExpenseModal(false)}
                        title="Add Expense"
                    >
                        <AddExpenseForm
                            onAddExpense={(expense) => handleAddExpense(expense)}
                            categories={categories}
                        />
                    </Model>

                    <Model
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title="Delete Expense"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this expense?"
                            onDelete={() => deleteExpense(openDeleteAlert.data)}
                        />
                    </Model>

                </div>
            </div>
        </DashBoard>
    );
};

export default Expense;