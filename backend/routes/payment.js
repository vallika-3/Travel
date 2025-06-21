// backend/routes/payment.js
const express = require('express');
const router = express.Router();


router.post('/payment', (req, res) => {
    const { userId, paymentMethod, amount } = req.body;

    if (!paymentMethod || !amount) {
        return res.status(400).json({ message: "Payment method and amount are required." });
    }

   
    setTimeout(() => {
        
        res.status(200).json({
            message: `Payment of ₹${amount} via ${paymentMethod} processed successfully!`
        });
    }, 2000); 
});

module.exports = router;
