import { createStore, combineReducers } from 'redux';

const initialProductState = {
    produtos: []
};

const produtoReducer = (state = initialProductState, action) => {
    switch (action.type) {
        case 'ADD_PRODUTO':
            return {
                ...state,
                produtos: [...state.produtos, action.payload]
            };
        case 'DELETE_PRODUTO':
            return {
                ...state,
                produtos: state.produtos.filter((_, index) => index !== action.payload)
            };
        case 'UPDATE_PRODUTO':
            return {
                ...state,
                produtos: state.produtos.map((produto, index) => 
                index === action.payload.index ? action.payload.updatedProduto : produto)
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    produto: produtoReducer
});

const store = createStore(rootReducer);

export default store;