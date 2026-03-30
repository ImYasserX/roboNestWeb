export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #F8F9FF 0%, #F0EFFE 100%)",
        padding: 16,
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
}
