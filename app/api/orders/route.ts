import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb, verifyIdToken } from "@/src/lib/firebase-admin";
import type { DeliveryInfo } from "@/src/data/products";

const DELIVERY_FEE = 5;

type RequestItem = {
  productId: string;
  quantity: number;
};

type RequestBody = {
  items?: RequestItem[];
  delivery?: DeliveryInfo;
};

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("964")) {
    return `+${digits}`;
  }

  return `+964${digits}`;
}

function validateDelivery(delivery?: DeliveryInfo): string | null {
  if (!delivery) return "Delivery details are required.";
  if (!delivery.fullName?.trim()) return "Full name is required.";
  if (!delivery.phone?.trim()) return "Phone number is required.";
  if (delivery.phone.replace(/\D/g, "").length < 10) return "Enter a valid phone number.";
  if (!delivery.city?.trim()) return "City is required.";
  if (!delivery.area?.trim()) return "Area/District is required.";
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header." },
        { status: 401 }
      );
    }

    const token = authHeader.slice("Bearer ".length);
    let decodedToken;

    try {
      decodedToken = await verifyIdToken(token);
    } catch {
      return NextResponse.json(
        { error: "Your session is no longer valid. Please sign in again." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as RequestBody;
    const items = body.items ?? [];
    const validationError = validateDelivery(body.delivery);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    if (items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    const db = getAdminDb();
    const normalizedItems = items
      .map((item) => ({
        productId: item.productId,
        quantity: Number(item.quantity) || 0,
      }))
      .filter((item) => item.productId && item.quantity > 0);

    if (normalizedItems.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    const productSnapshots = await Promise.all(
      normalizedItems.map((item) => db.collection("products").doc(item.productId).get())
    );

    const orderItems = normalizedItems.map((item, index) => {
      const snapshot = productSnapshots[index];

      if (!snapshot.exists) {
        throw new Error(`Product ${item.productId} is no longer available.`);
      }

      const data = snapshot.data() ?? {};
      const price = typeof data.price === "number" ? data.price : Number(data.price);

      if (!Number.isFinite(price)) {
        throw new Error(`Product ${item.productId} has an invalid price.`);
      }

      return {
        productId: snapshot.id,
        name: typeof data.name === "string" ? data.name : "Product",
        price,
        emoji: typeof data.emoji === "string" ? data.emoji : "📦",
        imageUrl:
          typeof data.imageUrl === "string"
            ? data.imageUrl
            : Array.isArray(data.images) && typeof data.images[0] === "string"
              ? data.images[0]
              : undefined,
        quantity: item.quantity,
      };
    });

    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const delivery = body.delivery as DeliveryInfo;
    const orderPayload = {
      userId: decodedToken.uid,
      items: orderItems,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total: subtotal + DELIVERY_FEE,
      status: "pending" as const,
      paymentMethod: "cod" as const,
      delivery: {
        fullName: delivery.fullName.trim(),
        phone: normalizePhone(delivery.phone),
        city: delivery.city.trim(),
        area: delivery.area?.trim() || "",
        details: delivery.details?.trim() || "",
      },
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const orderRef = await db.collection("orders").add(orderPayload);

    return NextResponse.json({
      success: true,
      orderId: orderRef.id,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create order.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
