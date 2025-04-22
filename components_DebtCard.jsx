import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function DebtCard({ item, type, index, handlePayment, togglePaid }) {
  return (
    <Card key={`${type}-${index}`} className={`p-4 ${item.paid ? "bg-gray-100 text-gray-500" : ""}`}>
      <CardContent>
        <div className="text-xl font-semibold mb-2">{item.name}</div>
        <div className="mb-2">Balance: ${item.balance.toFixed(2)}</div>
        <div className="flex items-center gap-2 mb-2">
          <Checkbox checked={item.paid} onCheckedChange={() => togglePaid(type, index)} />
          <span>Paid this month</span>
        </div>
        <Input
          type="number"
          placeholder="Payment amount"
          onBlur={(e) => handlePayment(type, index, e.target.value)}
        />
        <Button className="mt-2 w-full" onClick={() => handlePayment(type, index, 0)}>
          Update
        </Button>
      </CardContent>
    </Card>
  );
}