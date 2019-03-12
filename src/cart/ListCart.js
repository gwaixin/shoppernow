import React from 'react'
import Item from './Item'
import Loading from '../component/Loading'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


const ListCart = (props) => {

    if (!props.cart || props.cart.length <= 0) {
        return <Loading />
    }


    return (
        <ReactCSSTransitionGroup
            transitionName="fading"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {
                props.cart.map(
                    (item, index) => 
                        <Item
                            item={item} 
                            key={`item-${index}`} 
                            onRemove={props.onShowConfirm}
                            onEdit={props.onEditShow} />
                ) 
            }
        </ReactCSSTransitionGroup>
    )

}

export default ListCart