import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}
let INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType] : state.ingredients[action.ingredientType] + 1
                }
            }
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType] : state.ingredients[action.ingredientType] - 1
                }
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
    }
    return state;
}
export default reducer;