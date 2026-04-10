import React, { useEffect } from 'react'
import DashBoard from "../components/DashBoard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import CategoryList  from "../components/CategoryList.jsx"
import { Plus } from "lucide-react";
import axiosConfig from "../util/axiosConfig.js";
import { API_ENDPOINTS } from "../util/ApiEndPoints.js";
import { toast } from "react-hot-toast";
import { useState } from 'react';
import Model from "../components/Model.jsx";
import AddCategoryForm from '../components/AddCategoryForm.jsx';

const Category = () => {
    useUser();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES + "/get");
            if (response.status === 200) {
                console.log('categories', response.data);
                setCategoryData(response.data);
            }
        } catch (error) {
            console.error('Something went wrong. Please try again.', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {   
        fetchCategoryDetails();
    }, [])

    return (
        <DashBoard activeMenu="Category">
            <div className="my-5 mx-auto">
                {/* Add button to add category */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>
                    <button
                        onClick={() => setOpenAddCategoryModal(true)}
                        className="add-btn flex items-center gap-1">
                        <Plus size={15} />
                        Add Category
                    </button>
                </div>
                {/* Category list */}
                <CategoryList categories={categoryData}/>

                {/* Adding category modal */}

                <Model
                    title="Add Category"
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                >
                    <AddCategoryForm/>
                </Model>

                {/* Updating category modal */}
            </div>
        </DashBoard>
    );
};

export default Category