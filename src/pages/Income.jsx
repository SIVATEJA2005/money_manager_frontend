import React from 'react'
import DashBoard from "../components/DashBoard.jsx";
import { useUser } from '../hooks/useUser.jsx';
import { useEffect,useState } from 'react';
import { toast } from 'react-hot-toast';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/ApiEndpoints';
import { LoaderCircle } from 'lucide-react'; // Adjust path accordingly 
import IncomeList from '../components/IncomeList.jsx';
import Model from '../components/Model.jsx';
import { Plus } from 'lucide-react';
import AddIcomeForm from '../components/AddIncomeForm.jsx';

const income = () => {
   useUser();

    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

  const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch income details:', error);
            toast.error(error.response?.data?.message || "Failed to fetch income details");
        } finally {
            setLoading(false);
        }
    };

    //fetching all categories of type income to show in add income form dropdown
    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if (response.status === 200) {
                console.log("Income categories:", response.data);
            setCategories(response.data);
            }
        } catch (error) {
            console.log('Failed to fetch income categories:', error);
            toast.error(error.data?.message || "Failed to fetch income categories for this category");
        }
    };

    useEffect(()=>{
        fetchIncomeDetails();
        fetchIncomeCategories();
    },[])

  return (
    <DashBoard activeMenu="Income">
        <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/* overview for income with line chart */}
                        <button className="add-btn" onClick={() => setOpenAddIncomeModal(true)}>
                            <Plus size={15} className="text-lg" /><AddIncomeForm
                                                                        onAddIncome={() => console.log('Add Income')}
                                                                        categories={categories}
                                                                        />
                        </button>
                    </div>

                    <IncomeList transactions={incomeData}
                        onDelete={(id) => console.log("Delete income with id:", id)}
                    />

                <Model
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                    >
                    Income form modal
                </Model>
                </div>
        </div>
    </DashBoard>
    )
}

export default income