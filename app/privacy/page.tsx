import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import PageContainer from "@/src/components/PageContainer";

export default function PrivacyPage() {
  return (
    <main style={{ paddingTop: 66, minHeight: "100vh", background: "#F8F9FF" }}>
      <Navbar />
      <PageContainer as="section" className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#E4E6F1] bg-white p-8 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#6C5CE7]">
            Privacy Policy
          </p>
          <h1 className="mt-4 text-3xl font-bold text-[#1E1E2F] md:text-4xl">
            How RoboNest Handles Your Data
          </h1>
          <div className="mt-6 space-y-4 text-base leading-7 text-[#5C6075]">
            <p>
              We collect the information needed to process orders, provide support,
              and improve your shopping experience. This may include your name,
              contact details, delivery information, and order history.
            </p>
            <p>
              We do not sell your personal information. Access to order and account
              data is limited to the RoboNest team and trusted service providers
              needed to operate the store.
            </p>
            <p>
              If you want your account information updated or removed, contact us
              directly and we will help you.
            </p>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </main>
  );
}
