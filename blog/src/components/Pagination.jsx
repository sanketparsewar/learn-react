import React from 'react'

function Pagination({children}) {
return (
    <div className="pagination text-end text-gray-600 flex justify-end mx-2 my-3">
        {children}
      </div>
)
}

export default Pagination