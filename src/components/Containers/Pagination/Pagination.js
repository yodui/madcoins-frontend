import React from 'react';
import Icon from '../../Common/Icon/Icon';

const Pagination = ({limit, activePage, count, pagesNumber, handlePageClick}) => {

    const onPageClick = (num) => {
        handlePageClick(num);
    }

    const Page = ({num, activate = true, jump = false}) => {
        const cls = ['page'];
        if(activate && num === activePage) cls.push('active');
        let content = num;
        if(jump === 'toStart') {
            cls.push('jump');
            content = <Icon name={'chevron-left'} />
        } else if(jump === 'toEnd') {
            cls.push('jump');
            content = <Icon name={'chevron-right'} />
        }
        return <span className={cls.join(' ')} onClick={() => onPageClick(num) }>{content}</span>
    }

    const totalPages = Math.ceil(count / limit);
    const begin = (activePage - 1) * limit + 1;
    let end = activePage * limit;
    if(end > count) end = count;

    const getNavEdges = () => {
        // e === edges
        const e = {
            left: 1,
            right: totalPages
        };

        if(totalPages <= pagesNumber) return e;

        const half = Math.floor(pagesNumber / 2);
        const cnt = activePage;
        if(cnt - half <= 0) {
            e.left = 1;
        } else {
            e.left = cnt - half;
        }
        if(cnt + half >= totalPages) {
            e.right = totalPages;
            let diff = totalPages - (cnt + half);
            if(diff < 0) diff = (-1) * diff;
            e.left -= diff;
            if(e.left <= 0) e.left = 1;
        } else {
            let diff=0;
            if(cnt - half <= 1) {
                diff = (-1) * (cnt - half) + 1;
            }
            e.right = cnt + half + diff;
        }
        return e;
    }

    const getPages = () => {
        const e = getNavEdges();
        const pages = [];
        for(let p=e.left;p<=e.right;p++) {
            pages.push(p);
        }
        return pages;
    };

    return <>
        <span className='showWindow'>{begin} - {end}, from {count}</span>
        <div className='pagination'>
            {(totalPages > pagesNumber) && <Page num={1} activate={false} jump='toStart' />}
            {getPages().map((p,i) => <Page num={p} key={'page_'+i} />)}
            {(totalPages > pagesNumber) && <Page num={totalPages} activate={false} jump='toEnd' />}
        </div>
    </>
}

export default Pagination;
