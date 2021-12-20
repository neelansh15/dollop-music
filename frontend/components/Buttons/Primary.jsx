export default function PrimaryButton({ children, onClick }) {
  return (
    <button
      className="bg-white text-black px-4 py-1 font-semibold transition hover:(bg-gray-300)"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
