import React from 'react';
import { Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalButtonComponent from './payment.js';

const PaymentRoute = () => {
    return (
        <Route path="/settings/payment">
            <div>
                <h1>PayPal Payments</h1>
                <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
                    <PayPalButtonComponent />
                </PayPalScriptProvider>
            </div>
        </Route>
    );
};

export default PaymentRoute;
