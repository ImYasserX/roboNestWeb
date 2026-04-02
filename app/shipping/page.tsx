import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import PageContainer from "@/src/components/PageContainer";

export default function ShippingPage() {
  return (
    <main style={{ paddingTop: 66, minHeight: "100vh", background: "#F8F9FF" }}>
      <Navbar />
      <PageContainer as="section" className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#E4E6F1] bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6C5CE7]">
            Shipping Info
          </p>
          <h1 className="mt-4 text-3xl font-bold text-[#1E1E2F] md:text-4xl">
            Delivery Across Iraq
          </h1>
          <div className="mt-6 space-y-4 text-base leading-7 text-[#5C6075]">
            <p>
              RoboNest currently ships across Iraq. Orders are confirmed by phone
              before dispatch, and delivery timing depends on your city and order size.
            </p>
            <p>
              Standard delivery is charged at a flat fee shown during checkout.
              Large or custom engineering orders may require a separate delivery quote.
            </p>
            <p>
              If you need an urgent delivery update, contact us through WhatsApp or
              the contact page and include your order ID.
            </p>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </main>
  );
}
