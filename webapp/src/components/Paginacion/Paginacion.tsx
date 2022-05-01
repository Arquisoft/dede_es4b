import { ChevronRightIcon, ChevronLeftIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/outline'
import { Button } from '@mui/material';
import { useEffect, useState } from 'react'

function Paginacion({ onChange, maxPages }: { onChange: (page: number) => void, maxPages: number }) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    onChange(page - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (

    <div className="bg-white px-4 py-3 my-10 flex items-center justify-between border-t border-gray-200 sm:px-6">

      <div className="hidden sm:flex-1 sm:flex sm:items-center justify-end">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <Button
            onClick={() => { setPage(1) }}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Inicio</span>
            <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
          <Button
            onClick={() => { if (page >= 2) setPage(page - 1) }}
            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          >
            <span className="sr-only">Anterior</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
          <div
            className="bg-white border-gray-300 text-gray-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          >
            {page}
          </div>
          <Button
            onClick={() => { if (page < maxPages) setPage(page + 1) }}
            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          >
            <span className="sr-only">Siguiente</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
          <Button
            onClick={() => { setPage(maxPages) }}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Final</span>
            <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
        </nav>
      </div>
    </div>
  )
}

export default Paginacion