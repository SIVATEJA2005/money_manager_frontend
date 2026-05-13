import React, { useEffect, useState, useCallback } from 'react';
import DashBoard from "../components/DashBoard.jsx";
import { useUser } from '../hooks/useUser.jsx';
import { toast } from 'react-hot-toast';
import axiosConfig from '../util/axiosConfig.js';
import { API_ENDPOINTS } from '../util/ApiEndpoints.js';
import { Plus } from 'lucide-react';
import IncomeList from '../components/IncomeList.jsx';
import Model from '../components/Model.jsx';
import AddIncomeForm from '../components/AddIncomeForm.jsx';
import DeleteAlert from '../components/DeleteAlert.jsx';
import IncomeOverview from '../components/IncomeOverview.jsx';


const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    const fetchIncomeDetails = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) {
                setIncomeData(response.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch income details");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            toast.error("Failed to fetch categories");
        }
    };

        const handleAddIncome = async (income) => {
            const { name, amount, date, icon, categoryId } = income;

            if (!name.trim()) {
                toast.error("Please enter a name");
                return;
            }

            if (!amount || isNaN(amount) || Number(amount) <= 0) {
                toast.error("Amount should be a valid number greater than 0");
                return;
            }

            if (!date) {
                toast.error("please select a date");
                return;
            }

            const today = new Date().toISOString().split('T')[0];

            if (date > today) {
            toast.error("Date cannot be in the future");
            return;
            }

            if (!categoryId) {
            toast.error("Please select a category");
            return;
            }

           try {
                const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                    name,
                    amount: Number(amount),
                    date,
                    icon,
                    categoryId,
                });

                if (response.status === 201) {
                    setOpenAddIncomeModal(false);
                    toast.success("Income added successfully");
                    fetchIncomeDetails();
                    fetchIncomeCategories();
                }
                } catch (error) {
                    console.log("Error adding income:", error);
                    toast.error(error.response?.data?.message || "Failed to add income");
                }
        };

        const handleDownloadIncomeDetails = async () => {
            try {
                const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {
                    responseType: 'blob',
                });
                let filename = "income_details.xlsx";
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
                toast.success("Income details downloaded successfully");

            } catch (error) {
                console.log("Error downloading income details:", error);
                toast.error(error.response?.data?.message || "Failed to download income details");
            }
        };
     const handleEmailIncomeDetails = async () => {
            try {
                const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);

                if (response.status === 200) {
                    toast.success("Income details emailed successfully");
                }

            } catch (error) {
                console.error("Error emailing income details:", error);
                toast.error(
                    error.response?.data?.message || "Failed to income income"
                );
            }
        }
        useEffect(() => {
            fetchIncomeDetails();
            fetchIncomeCategories();
        }, [fetchIncomeDetails]);

        
        const deleteIncome = async (id) => {
            try {
                await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
                setOpenDeleteAlert({ show: false, data: null });
                toast.success("Income deleted successfully");
                fetchIncomeDetails();
            } catch (error) {
                console.log('Error deleting income', error);
                toast.error(error.response?.data?.message || "Failed to delete income");
            }
        }

    return (
        <DashBoard activeMenu="Income">
            <div className="my-5 mx-auto px-4">
                <div className="flex flex-col gap-6">

                    {/* Button row */}
                    <div className="flex justify-start">
                        <button
                            className="add-btn flex items-center gap-2"
                            onClick={() => setOpenAddIncomeModal(true)}
                        >
                            <Plus size={15} /> Add Income
                        </button>
                    </div>

                    {/* IncomeOverview in its own row */}
                    <IncomeOverview transactions={incomeData} />

                    {/* Income list */}
                    <IncomeList
                            transactions={incomeData}
                            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                            onDownload={handleDownloadIncomeDetails}
                            onEmail={handleEmailIncomeDetails}
                            />

                    <Model
                        isOpen={openAddIncomeModal}
                        onClose={() => setOpenAddIncomeModal(false)}
                        title="Add Income"
                    >
                        <AddIncomeForm
                            onAddIncome={(income) => {
                                handleAddIncome(income);
                            }}
                            categories={categories}
                        />
                    </Model>

                    <Model
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title="Delete Income"
                        >
                        <DeleteAlert
                            content="Are you sure want to delete this income details?"
                            onDelete={() => deleteIncome(openDeleteAlert.data)}
                            />
                    </Model>

                </div>
            </div>
        </DashBoard>
    );
};

export default Income;