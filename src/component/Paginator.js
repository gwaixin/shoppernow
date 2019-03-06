import React from 'react'
import { Pagination } from 'react-bootstrap'

/**
 * 
 * @param {page} props active page
 * @param {pages} props total pages
 * @param {onChangePage} props event when pagination clicked
 */
const Paginator = (props) => {

    // checks if there is a need of pagination
    if (props.pages === null || props.pages === 1) {
        return null
    }

    // checks if pages are just less 6
    if (props.pages <= 6) {
        let pagemain = []
        let spage = 1
        let lpage = props.pages

        while (spage <= lpage) {
            pagemain.push({page: spage, isActive: spage === props.page})
            spage++
        }
        
        // just use simple pagination here TODO
        return (
            <Pagination className="justify-content-center">
                { 
                    // show only page item that is lesser than the total pages
                    pagemain.map(pm => {
                       
                        return (
                            <Pagination.Item 
                                key={`page-${pm.page}`} 
                                onClick={() => props.onChangePage(pm.page)} 
                                active={pm.isActive}>
                                { pm.page }
                            </Pagination.Item>)
                    })
                }
            </Pagination>
        )
    }


    // otherwise use complex pagination
    let pagemain = []
    var spage = 0
    var lpage = 0

    // page that is more than 3
    if (props.page >= 3) {
        spage = props.page-2
        lpage = props.page + 2
    
    // pages that are less than 3
    } else {
        spage = 2
        lpage = spage + 4
    }

    while (spage < lpage) {
        pagemain.push({page: spage, isActive: spage === props.page})
        spage++
    }

    let onPrev = () => {
        return props.onChangePage(props.page-1)
    }
    let onFirst = () => {
        return props.onChangePage(1)
    }
    let onNext = () => {
        return props.onChangePage(props.page+1)
    }
    let onLast = () => {
        return props.onChangePage(props.pages)
    }

    return(
        <Pagination className="justify-content-center">
            <Pagination.First onClick={onFirst} />
            <Pagination.Prev onClick={onPrev} />

            <Pagination.Item onClick={onFirst} active={props.page === 1}>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            { pagemain.map(pm => {
                // show only page item that is lesser than the total pages
                if (pm.page < props.pages) {
                    return (
                        <Pagination.Item 
                            key={`page-${pm.page}`} 
                            onClick={() => props.onChangePage(pm.page)} 
                            active={pm.isActive}>
                            { pm.page }
                        </Pagination.Item>)
                } else {
                    return null
                }
            })}

            <Pagination.Ellipsis />
            <Pagination.Item active={props.page === props.pages} onClick={() => props.onChangePage(props.pages)}>{ props.pages }</Pagination.Item>

            <Pagination.Next onClick={onNext} />
            <Pagination.Last onClick={onLast} />
        </Pagination>
    )
}

export default Paginator