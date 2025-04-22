import { useState } from "react";
import DebtCard from "@/components/DebtCard";

const initialCards = [
  { name: "Credit One", balance: 535, paid: false },
  { name: "BrghtWay", balance: 498, paid: false },
  { name: "Citi", balance: 173.51, paid: false },
  { name: "Capital One Quicksilver", balance: 288.64, paid: false },
  { name: "Discover It", balance: 2546.68, paid: false },
  { name: "Capital One Venture", balance: 296, paid: false },
  { name: "Target", balance: 436.34, paid: false },
  { name: "Ulta Beauty", balance: 317.64, paid: false }
];

const initialLoans = [
  { name: "BMG Money", balance: 2931.74, paid: false },
  { name: "Upstart Loan 1", balance: 1792, paid: false },
  { name: "Upstart Loan 2", balance: 1100, paid: false },
  { name: "MoneyLion", balance: 218.35, paid: false }
];

export default function DebtBudgetTracker() {
  const [cards, setCards] = useState(initialCards);
  const [loans, setLoans] = useState(initialLoans);

  const handlePayment = (type, index, amount) => {
    const paymentAmount = parseFloat(amount || 0);
    if (paymentAmount < 0 || isNaN(paymentAmount)) {
      alert("Please enter a valid payment amount.");
      return;
    }

    const updated = type === "card" ? [...cards] : [...loans];
    updated[index].balance = Math.max(updated[index].balance - paymentAmount, 0);
    type === "card" ? setCards(updated) : setLoans(updated);
  };

  const togglePaid = (type, index) => {
    const updated = type === "card" ? [...cards] : [...loans];
    updated[index].paid = !updated[index].paid;
    type === "card" ? setCards(updated) : setLoans(updated);
  };

  const totalBalance = (items) => items.reduce((sum, item) => sum + item.balance, 0);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Debt Budget Tracker</h1>

      <div className="mb-6">
        <div>Total Credit Card Balance: ${totalBalance(cards).toFixed(2)}</div>
        <div>Total Loan Balance: ${totalBalance(loans).toFixed(2)}</div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Credit Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((item, i) => (
          <DebtCard
            key={`card-${i}`}
            item={item}
            type="card"
            index={i}
            handlePayment={handlePayment}
            togglePaid={togglePaid}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Loans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loans.map((item, i) => (
          <DebtCard
            key={`loan-${i}`}
            item={item}
            type="loan"
            index={i}
            handlePayment={handlePayment}
            togglePaid={togglePaid}
          />
        ))}
      </div>
    </div>
  );
}