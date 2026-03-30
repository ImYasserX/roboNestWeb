import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import StatsBar from "@/src/components/StatsBar";
import CategoryList from "@/src/components/CategoryList";
import PopularProducts from "@/src/components/PopularProducts";
import PromoStrip from "@/src/components/PromoStrip";
import Footer from "@/src/components/Footer";

export default function HomePage() {
  return (
    <main
      style={{
        paddingTop: 66,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#F8F9FF",
      }}
    >
      <Navbar />
      <Hero />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 48,
          flex: 1,
        }}
      >
        <StatsBar />
        <CategoryList />
        <PopularProducts />
        <PromoStrip />
      </div>
      <Footer />
    </main>
  );
}
