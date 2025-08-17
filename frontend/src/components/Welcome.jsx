const getNameFromEmail = (email) => {
  if (!email) return "User";
  return email.split("@")[0]; // e.g., "alice" from "alice@example.com"
};

export default function Welcome({ user }) {
  const name = user?.name || getNameFromEmail(user?.email);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome {name} 🎉</h1>
      <p>You are now logged in successfully as <strong>{user?.email}</strong>.</p>
    </div>
  );
}
