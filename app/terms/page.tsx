import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import PageContainer from "@/src/components/PageContainer";

export default function TermsPage() {
  return (
    <main style={{ paddingTop: 66, minHeight: "100vh", background: "#F8F9FF" }}>
      <Navbar />
      <PageContainer as="section" className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#E4E6F1] bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6C5CE7]">
            Terms of Service
          </p>
          <h1 className="mt-4 text-3xl font-bold text-[#1E1E2F] md:text-4xl">
            Purchase and Use Terms
          </h1>
          <div className="mt-6 space-y-4 text-base leading-7 text-[#5C6075]">
            <p>
              By placing an order with RoboNest, you agree to provide accurate
              delivery and contact information so we can confirm and fulfill your order.
            </p>
            <p>
              Product availability, pricing, and delivery timing may change. If an
              issue affects your order, we will contact you before dispatch.
            </p>
            <p>
              For engineering services, prototypes, or special sourcing requests,
              scope and pricing may be agreed separately before work begins.
            </p>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </main>
  );
}
