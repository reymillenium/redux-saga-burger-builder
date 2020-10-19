import React, {Component} from "react";

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.scss';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        // Prevents from sending the request and reload the page:
        event.preventDefault();
        // console.log('ContactData -> this.props.ingredients:', this.props.ingredients);
        this.setState({
            loading: true
        });
        // In a real price I would recalculate the price on the server
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Reinier Garcia",
                address: {
                    street: '101 SW',
                    zipCode: '33135',
                    country: 'United States of America'
                },
                email: 'reymillenium@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            }).catch(error => {
            this.setState({loading: false});
        });

        // this.props.history.push("/checkout");
    }

    render() {
        let form = (
            <form action="">
                <input className={classes.Input} type="text" name={'name'} placeholder={'Your Name'}/>
                <input className={classes.Input} type="email" name={'email'} placeholder={'Your Email'}/>
                <input className={classes.Input} type="text" name={'street'} placeholder={'Your Street'}/>
                <input className={classes.Input} type="text" name={'postal'} placeholder={'Your Postal Code'}/>

                <Button buttonType={'Success'} clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;