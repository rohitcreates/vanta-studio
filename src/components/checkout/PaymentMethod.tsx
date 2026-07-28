"use client";

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
}

const paymentOptions = [
  {
    id: "card",
    label: "Credit / Debit Card",
  },
  {
    id: "upi",
    label: "UPI",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
  },
];

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodProps) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Payment Method
      </h2>

      <div className="space-y-4">
        {paymentOptions.map((option) => (
          <label
            key={option.id}
            htmlFor={option.id}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-800 p-4 transition hover:border-white"
          >
            <input
              id={option.id}
              type="radio"
              name="paymentMethod"
              value={option.id}
              checked={paymentMethod === option.id}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="h-4 w-4"
            />

            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}