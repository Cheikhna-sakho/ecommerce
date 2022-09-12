import React from 'react'

const Contact = () => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900">Contact information</h2>

      <div className="mt-4">
        <label
          htmlFor="email-address"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            type="email"
            id="email-address"
            name="email-address"
            autoComplete="email"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact