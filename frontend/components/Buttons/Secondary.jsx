export default function SecondaryButton({ children }) {
  return (
    <button className="bg-dark-300 px-4 py-1 font-semibold transition hover:(bg-dark-100)">
      {children}
    </button>
  );
}
