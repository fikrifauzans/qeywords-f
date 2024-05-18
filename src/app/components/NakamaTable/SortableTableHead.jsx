import React, { useState } from 'react';

import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

const SortableTableHead = ({ children, onSort, label, orderBy }) => {
    const [sortDirection, setSortDirection] = useState('asc');
    const fontSize = 10
    const handleSort = () => {
        const sortBy = sortDirection === 'ASC' ? 'DESC' : 'ASC';
        setSortDirection(sortBy);
        onSort(sortBy, orderBy);
    };

    return (
        <div onClick={handleSort} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {children ? children : label}
            {sortDirection === 'ASC' ? <ArrowUpward style={{ fontSize }} /> : <ArrowDownward style={{ fontSize }} />}
        </div>
    );
};

export default SortableTableHead;
