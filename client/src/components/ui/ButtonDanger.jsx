export function ButtonDanger({ onClick, children }) {
  return (
    <button
      className='transition-all bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 text-sm'
      onClick={onClick}
    >
      {children}
    </button>
  )
}