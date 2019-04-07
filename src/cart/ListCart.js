import React from 'react'
import Item from './Item'
import Loading from '../component/Loading'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


const ListCart = (props) => {

    if (!props.cart) {
        return <Loading />
    }

    if (props.cart.length <= 0) {
        return <p>You have no items in cart.</p>
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
                            onAdd={props.onAdd}
                            onMinus={props.onMinus} />
                ) 
            }
        </ReactCSSTransitionGroup>
    )

}

export default ListCart