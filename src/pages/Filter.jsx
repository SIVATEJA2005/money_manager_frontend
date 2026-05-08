import React, { useState } from 'react';
import DashBoard from "../components/DashBoard.jsx";
import { useUser } from '../hooks/useUser.jsx';
import { Search, LoaderCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/ApiEndPoints.js';
import TransactionInfoCard from '../components/TranscationInformationCard.jsx';
import moment from 'moment';

const Filter = () => {
    useUser();

    const [type, setType] = useState("income");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortField, setSortField] = useState("date");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTER, {
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder
            });
            setTransactions(response.data);
        } catch (error) {
            console.error("Failed to fetch transactions: ", error);
            toast.error("Failed to fetch filtered results");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashBoard activeMenu="Filters">
            <div className="p-4 sm:p-5 max-w-full">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Filter Transactions
                </h2>

                <div className="card p-4 mb-4">
                    <h5 className="text-base sm:text-lg font-semibold mb-4">
                        Select the filters
                    </h5>

                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium" htmlFor="type">Type</label>
                                <select
                                    id="type"
                                    value={type}
                                    onChange={(e) => {
                                        setType(e.target.value);
                                        setTransactions([]);  // ← clears old results
                                    }}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                >
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium" htmlFor="startdate">Start Date</label>
                                <input
                                    id="startdate"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium" htmlFor="enddate">End Date</label>
                                <input
                                    id="enddate"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium" htmlFor="sortfield">Sort Field</label>
                                <select
                                    id="sortfield"
                                    value={sortField}
                                    onChange={(e) => setSortField(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                >
                                    <option value="date">Date</option>
                                    <option value="amount">Amount</option>
                                    <option value="category">Category</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium" htmlFor="sortorder">Sort Order</label>
                                <select
                                    id="sortorder"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                >
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-2 items-end">
                            <div className="flex flex-col gap-1 flex-1">
                                <label className="text-sm font-medium" htmlFor="keyword">Search</label>
                                <input
                                    id="keyword"
                                    type="text"
                                    placeholder="Search by name..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            </div>

                            <button
                                onClick={handleSearch}
                                disabled={loading}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition mb-0.5 whitespace-nowrap disabled:opacity-50"
                            >
                                {loading ? (
                                    <LoaderCircle size={16} className="animate-spin" />
                                ) : (
                                    <Search size={16} />
                                )}
                                <span className="hidden sm:inline">
                                    {loading ? "Searching..." : "Search"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold">Transactions</h5>
                    </div>

                    {transactions.length === 0 && !loading ? (
                        <p className="text-gray-500">Select the filters and click apply to filter the transactions</p>
                    ) : ""}

                    {loading ? (
                        <p className="text-gray-500">Loading Transactions</p>
                    ) : ""}

                    {transactions.map((transaction) => (
                        <TransactionInfoCard
                            key={transaction.id}
                            title={transaction.name}
                            icon={transaction.icon}
                            date={moment(transaction.date).format("Do MMM YYYY")}
                            amount={transaction.amount}
                            type={type}
                            hideDeleteBtn={true}
                        />
                    ))}
                </div>
            </div>
        </DashBoard>
    );
};

export default Filter;