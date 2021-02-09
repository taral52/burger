import * as actionTypes from './actionTypes'
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        order: orderData,
        orderId: orderId
    }
}
export const purchaseBurgerFail = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post( '/orders.json', orderData )
        .then( response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        } )
        .catch( error => {
            dispatch(purchaseBurgerFail());
        } );
    }
}