"use client";

import { useEffect } from "react";

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfo>>;
  saveAddress: boolean;
  setSaveAddress: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShippingForm({
  shippingInfo,
  setShippingInfo,
  saveAddress,
  setSaveAddress,
}: ShippingFormProps) {
  useEffect(() => {
    const savedAddress = localStorage.getItem("shippingAddress");

    if (savedAddress) {
      setShippingInfo(JSON.parse(savedAddress));
      setSaveAddress(true);
    }
  }, [setShippingInfo, setSaveAddress]);

  const handleChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Shipping Address
      </h2>

      {/* First Name & Last Name */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            First Name
          </label>

          <input
            type="text"
            value={shippingInfo.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Last Name
          </label>

          <input
            type="text"
            value={shippingInfo.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-white"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            value={shippingInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            value={shippingInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-white"
          />
        </div>
      </div>

      {/* Street Address */}
      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium">
          Street Address
        </label>

        <input
          type="text"
          value={shippingInfo.address}
          onChange={(e) => handleChange("address", e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-white"
        />
      </div>

      {/* City, State & Postal Code */}
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">
            City
          </label>

          <input
            type="text"
            value={shippingInfo.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            State
          </label>

          <input
            type="text"
            value={shippingInfo.state}
            onChange={(e) => handleChange("state", e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Postal Code
          </label>

          <input
            type="text"
            value={shippingInfo.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-white"
          />
        </div>
      </div>

      {/* Save Address */}
      <div className="mt-6 flex items-center gap-3">
        <input
          type="checkbox"
          id="saveAddress"
          checked={saveAddress}
          onChange={(e) => setSaveAddress(e.target.checked)}
          className="h-4 w-4"
        />

        <label htmlFor="saveAddress">
          Save this address for future orders
        </label>
      </div>
    </div>
  );
}