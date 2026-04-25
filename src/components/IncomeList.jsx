import React from "react";
import { Download, Mail } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "./TranscationInformationCard.jsx";

const IncomeList = ({ transactions,onDelete }) => {
  return (
   <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800">
          Income Sources
        </h5>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <Mail size={16} />
            Email
          </button>

          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white 
          bg-gradient-to-r from-purple-600 to-purple-800 
          rounded-lg hover:from-purple-700 hover:to-purple-900 
          transition shadow-sm">
            <Download size={16} />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
            {transactions?.map((income) => (
              <TransactionInfoCard
                key={income.id}
                title={income.name}
                icon={income.icon}
                date={moment(income.date).format("Do MMM YYYY")}
                amount={income.amount}
                type="income"
                onDelete={() => onDelete(income.id)}
              />
            ))}
        </div>
    </div>
  );
};

export default IncomeList;