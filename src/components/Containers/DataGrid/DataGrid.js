import React from 'react';
import './DataGrid.css';
import Pagination from '../Pagination/Pagination';


const DataGrid = ({rows, columns, count, activePage = 1, options}) => {

    const tableCls = ['table'];

    if(options) {
        (options.dense === true) && tableCls.push('dense');
    }

    const PAGINATION_DEFAULTS = { LIMIT: 20, PAGES_NUMBER: 5 };

    const handlePageClick = (num) => {
        options.handlePageClick(num);
    }

    const pagination = {
        limit: options.pagination.limit || PAGINATION_DEFAULTS.LIMIT,
        activePage: activePage,
        pagesNumber: options.pagination.pagesNumber || PAGINATION_DEFAULTS.PAGES_NUMBER,
        count: count,
        handlePageClick: handlePageClick
    };

    const getColStyles = (col) => {
        const styles = {};
        if(col.width) styles.width = col.width;
        if(col.minWidth) styles.minWidth = col.minWidth;
        return styles;
    }

    const TableBar = () => {

        return <div className='tableBar'>
            <div className='statCell'></div>
            <div className='paginationCell'>
                {options.pagination && <Pagination {...pagination} />}
            </div>
        </div>
    }

    return (
        <div className={tableCls.join(' ')}>
            {(options.pagination || options.stat) && <TableBar />}
            <div className='tableHeader'>
                <div className='row'>
                    {columns.map((col,c) => <div className='column' key={['col_',col.id,c].join('_')} style={getColStyles(col)}>{col.label}</div>)}
                </div>
            </div>
            <div className='tableBody'>
                {rows.map((row,r) => {
                    const line = <div className='row' key={'row_'+r}>
                        { columns.map((col,c) => <div className='column' key={['col_',r,c].join('_')} style={getColStyles(col)}>{row[col.id] ? row[col.id] : ''}</div>)}
                    </div>
                    return line;
                })}
            </div>
        </div>
    )
}

export default DataGrid;
