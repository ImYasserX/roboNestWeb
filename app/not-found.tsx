import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F8F9FF",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          background: "#fff",
          borderRadius: 24,
          padding: 32,
          textAlign: "center",
          boxShadow: "0 12px 32px rgba(30,30,47,0.08)",
        }}
      >
        <p style={{ color: "#6C5CE7", fontWeight: 700, margin: 0 }}>404</p>
        <h1 style={{ color: "#1E1E2F", fontSize: 28, margin: "12px 0" }}>
          Page not found
        </h1>
        <p style={{ color: "#6B6B8A", lineHeight: 1.6, marginBottom: 24 }}>
          The page you were looking for does not exist or may have moved.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#6C5CE7",
            color: "#fff",
            borderRadius: 999,
            padding: "14px 24px",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
