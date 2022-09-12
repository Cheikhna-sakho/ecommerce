import React from 'react'

const ButtonConfirm = () => {
  return (
    <div className="py-6 px-4 sm:px-6">
      <button
        type="submit"
        className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
      >
        Confirm order
      </button>
    </div>
  );
}

export default ButtonConfirm