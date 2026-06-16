import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        padding: "40px",
      }}
    >
      <h1>PortfolioPal 😎</h1>

      <Link href="/login">
        <button>
          Go To Login
        </button>
      </Link>
    </main>
  );
}