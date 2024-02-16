import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const CheckoutForm = ({ price, form, planid }) => {
    const priceForStripe = price * 100;
    const formlist = form;
    const publishableKey = 'pk_live_51KVWTDDB0Ur7jSukAQ5SCA5yR7WKQDH1FeuK2deHRPNiuNLnyALT6nF4DcIkBmb98ob0dqIJG3TXwiuAZR10HaWY00MNNA4Lg8';

    const onToken = token => {
        const formData = new FormData();
        formData.append('uid', formlist);
        formData.append('planid', planid);
        axios.post('https://domaintobesocial.com/domaintobestart/paysuccess', formData)
            .then((res) => {
                if (res.data.status === 'success') {
                    alert('Payment Successful!');
                    setTimeout(() => { window.location = "/"; }, 1500);
                } else {
                    setTimeout(() => { document.getElementById('errorlogin').style.display = 'none'; }, 2000);
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    

    return (
        <StripeCheckout
            label='Pay Now'
            name='Domaintobe'
            // billingAddress
            // shippingAddress
            image='/images/loginimg.png'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default CheckoutForm;
