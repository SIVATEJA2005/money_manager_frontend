// import React from 'react'
// import { useEffect, useState } from 'react';
// import { prepareIncomeLineChartData } from '../util/chartDataPreparation';

// const IncomeOverview = ({ transactions }) => {

//   const [chartData, setChartData] = useState([]);

//     useEffect(() => {
//       const result = prepareIncomeLineChartData(transactions);
//       console.log(result);
//       setChartData(result);
//       return () => {};
//     }, [transactions]);

//   return (
//     <div className="card">
//       <div className="flex items-center justify-between">
//         <div>
//           <h5 className="text-lg">Income Overview</h5>
//           <p className="text-xs text-gray-400 mt-0.5">
//             Track your earnings over time and analyze your income trends.
//           </p>
//         </div>
//       </div>
//       <div className="mt-10">
//         {/* create line chart */}
//         line chart
//       </div>
//     </div>
//   );
// };

// export default IncomeOverview;

import React from 'react'
import { useEffect, useState } from 'react';
import { prepareIncomeLineChartData } from '../util/chartDataPreparation';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const IncomeOverview = ({ transactions }) => {

  const [chartData, setChartData] = useState([]);

    useEffect(() => {
      const result = prepareIncomeLineChartData(transactions);
      console.log(result);
      setChartData(result);
      return () => {};
    }, [transactions]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={(v) => `₹${v}`} />
            <Tooltip formatter={(v) => [`₹${v}`, "Amount"]} />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#875cf5"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeOverview;