export default function RootLoading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#F8F9FF",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: "4px solid #F0EFFE",
          borderTopColor: "#6C5CE7",
          borderRadius: 999,
        }}
      />
      <p style={{ color: "#6B6B8A", fontSize: 14 }}>Loading RoboNest...</p>
    </div>
  );
}
