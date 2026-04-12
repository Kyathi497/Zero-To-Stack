import { apiRequest } from "../api-client";

export interface CreateOrderResponse {
  orderId: string;
  txnToken: string;
  amount: string;
  mid: string;
}

export interface VerifyOrderResponse {
  orderId: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  txnId?: string;
  amount?: string;
}

export async function createOrderApi(data: {
  courseId: string;
  name: string;
  email: string;
  phone: string;
}) {
  return apiRequest<CreateOrderResponse>("/payments/create-order", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function verifyOrderApi(orderId: string) {
  return apiRequest<VerifyOrderResponse>(`/payments/verify/${orderId}`);
}
