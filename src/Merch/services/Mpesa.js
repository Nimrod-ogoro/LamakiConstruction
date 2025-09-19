export async function initiateMpesaPayment({ phone, amount, orderId }) {
  const res = await fetch("http://localhost:5000/api/mpesa/stk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, amount, orderId }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("STK push failed: " + text);
  }

  return res.json();
}
