import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from "../../../components/UI/Input/Input";
import { purchaseBurger } from '../../../store/actions/index'
import { connect } from 'react-redux'
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue:'Fastest'},
                        { value: 'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value: 'fastest'
            }
        }
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        const orderData = {};
        for (let inputIdentifier in this.state.orderForm) {
            orderData[inputIdentifier] =  this.state.orderForm[inputIdentifier].value
        }
        this.props.onPurchaseBurger(orderData);
    }
    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updateInputElement = { ...updatedOrderForm[inputIdentifier] };
        updateInputElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updateInputElement;
        this.setState({orderForm: updatedOrderForm})
    };
    cancelHandler = () => {
        this.history.goBack()
    };

    render () {
        const formElementsArray = [];
        for (let inputIdentifier in this.state.orderForm) {
            formElementsArray.push({
                id: inputIdentifier,
                config: this.state.orderForm[inputIdentifier]
            })
        }
        let form = (
            <form>
                { formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType } 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value} 
                        changed={ (event) => this.inputChangeHandler(event, formElement.id) } />    
                ))}
                <Button btnType="Danger" clicked={this.cancelHandler}>CANCEL</Button>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.ordr.loading
    }
};

const mapActionsToProps = dispatch => {
    return {
        onPurchaseBurger : (orderData) => dispatch(purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(withErrorHandler(ContactData, axios));