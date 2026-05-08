import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(135, 92, 245, 0.13), 0 2px 8px rgba(0,0,0,0.07)',
        padding: '24px 16px 20px',
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={90}
            outerRadius={120}
            dataKey="amount"
            strokeWidth={2}
            stroke="#fff"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                style={{ filter: `drop-shadow(0px 4px 8px ${colors[index % colors.length]}55)` }}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [`₹${value}`, name]}
            contentStyle={{
              borderRadius: '10px',
              border: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              fontSize: '13px',
            }}
          />

          {showTextAnchor && (
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
              <tspan x="50%" dy="-0.5em" fontSize="13" fill="#888">
                {label}
              </tspan>
              <tspan x="50%" dy="1.5em" fontSize="20" fontWeight="bold" fill="#333">
                {totalAmount}
              </tspan>
            </text>
          )}
        </PieChart>
      </ResponsiveContainer>

      {/* Legend with diamond shapes */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px 24px',
          marginTop: '12px',
        }}
      >
        {data.map((entry, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {/* Diamond shape */}
            <div
              style={{
                width: '11px',
                height: '11px',
                backgroundColor: colors[index % colors.length],
                transform: 'rotate(45deg)',
                borderRadius: '2px',
                boxShadow: `0 2px 6px ${colors[index % colors.length]}88`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: '13px',
                color: '#555',
                fontWeight: 500,
              }}
            >
              {entry.name}
            </span>
            <span
              style={{
                fontSize: '13px',
                color: colors[index % colors.length],
                fontWeight: 700,
              }}
            >
              ₹{entry.amount?.toLocaleString('en-IN') ?? 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;