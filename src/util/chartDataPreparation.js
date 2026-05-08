export const prepareIncomeLineChartData = (transactions) => {
    if (!transactions || transactions.length === 0) return [];
    const grouped = {};
    transactions.forEach((t) => {
        const date = t.date?.split('T')[0];
        if (!date) return;
        grouped[date] = (grouped[date] || 0) + Number(t.amount);
    });
    return Object.entries(grouped)
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .map(([date, amount]) => ({
            date: new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            }),
            amount,
        }));
};