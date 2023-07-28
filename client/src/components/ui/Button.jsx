export function Button({ onClick, children }) {
  return (
    <button
      className="bg-indigo-600 px-4 py-1 rounded-md my-2 disabled:bg-indigo-300 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
