"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";

export default function CheckoutPage() {
  const { checkoutItems, checkoutSource, clearCheckout } = useCheckout();
  const { clearCart } = useCart();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [saveAddress, setSaveAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handlePlaceOrder = async () => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated) {
      alert("Please login first.");
      router.push("/login");
      return;
    }

    if (
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.email ||
      !shippingInfo.phone ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.postalCode
    ) {
      alert("Please fill in all shipping information.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethod,
          ...shippingInfo,
          items: checkoutItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to place order.");
      }

      if (saveAddress) {
        localStorage.setItem(
          "shippingAddress",
          JSON.stringify(shippingInfo)
        );
      }

      if (checkoutSource === "cart") {
        clearCart();
      }

      clearCheckout();
      router.push("/order-success");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          <ShippingForm
            shippingInfo={shippingInfo}
            setShippingInfo={setShippingInfo}
            saveAddress={saveAddress}
            setSaveAddress={setSaveAddress}
          />

          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>

        <CheckoutSummary
          checkoutItems={checkoutItems}
          onPlaceOrder={handlePlaceOrder}
          loading={loading || authLoading}
        />
      </div>
    </main>
  );
}
