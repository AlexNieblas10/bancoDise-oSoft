import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const validateCardData = ({ cardNumber, expiryDate, cvv }) => {
  const cardRegex = /^\d{13,19}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const cvvRegex = /^\d{3,4}$/;

  return cardRegex.test(cardNumber) &&
         expiryRegex.test(expiryDate) &&
         cvvRegex.test(cvv);
};

app.post('/validate-card', (req, res) => {
  const { cardNumber, expiryDate, cvv } = req.body;

  if (!cardNumber || !expiryDate || !cvv) {
    return res.status(400).json({ valid: false, message: "Missing fields" });
  }

  const isValid = validateCardData({ cardNumber, expiryDate, cvv });

  res.json({ valid: isValid });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
