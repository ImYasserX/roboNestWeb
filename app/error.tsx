"use client";

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8F9FF",
          padding: 24,
          fontFamily: "var(--font-inter), sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 480,
            width: "100%",
            background: "#fff",
            borderRadius: 24,
            padding: 32,
            textAlign: "center",
            boxShadow: "0 12px 32px rgba(30,30,47,0.08)",
          }}
        >
          <p style={{ color: "#6C5CE7", fontWeight: 700, margin: 0 }}>RoboNest</p>
          <h1 style={{ color: "#1E1E2F", fontSize: 28, margin: "12px 0" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#6B6B8A", lineHeight: 1.6, marginBottom: 24 }}>
            The page hit an unexpected problem. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              border: "none",
              background: "#6C5CE7",
              color: "#fff",
              borderRadius: 999,
              padding: "14px 24px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
