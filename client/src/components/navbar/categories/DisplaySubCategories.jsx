import React from 'react'

const DisplaySubCategories = ({subCat}) => {
  return (
    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
    {subCat?.map((section, index) => (
      <div key={index}>
        <p
          id={`${section.name}-heading`}
          className="font-medium text-gray-900"
        >
          {section.name}
        </p>
        <ul
          role="list"
          aria-labelledby={`${section.name}-heading`}
          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
        >
        </ul>
      </div>
    ))}
  </div>
  )
}

export default DisplaySubCategories