// backend/routes/deposit.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Deposit Route (Update saved amount)
router.post('/deposit', async (req, res) => {
    const { userId, depositAmount } = req.body;

    if (depositAmount <= 0) {
        return res.status(400).json({ message: "Invalid deposit amount." });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Update saved amount and check if they have reached the goal
        user.savedAmount += depositAmount;
        await user.save();

        res.status(200).json({
            message: `Successfully deposited ₹${depositAmount}. Total saved: ₹${user.savedAmount}`,
            savedAmount: user.savedAmount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;
