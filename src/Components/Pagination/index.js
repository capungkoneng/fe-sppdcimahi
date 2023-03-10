import { usePagination } from "libs/userPagination";

export const Pagination = ({
    currentPage = 1,
    onChangePage,
    pageSize,
    siblingCount = 1,
    totalCount
}) => {

    const paginationRange = usePagination({
        currentPage,
        pageSize,
        siblingCount,
        totalCount
    });

    const onNext = () => {
        onChangePage(currentPage + 1);
    }

    const onPrevious = () => {
        if ((currentPage - 1) === 0) {
            onChangePage(1);
        } else {
            onChangePage(currentPage - 1);
        }
    }
    return (
        // <div className="ml-4 mb-4 just justify-end">
        //     <nav aria-label="Page navigation">
        //         <ul class="inline-flex -space-x-px">
        //             <li>
        //                 <a href="#" class="px-3 py-2 ml-0 leading-tight text-white bg-[#3F7459] border border-gray-300 rounded-l-lg">Previous</a>
        //             </li>
        //             <li>
        //                 <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
        //             </li>
        //             <li>
        //                 <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
        //             </li>
        //             <li>
        //                 <a href="#" aria-current="page" class="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
        //             </li>
        //             <li>
        //             <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
        //             </li>
        //             <li>
        //             <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
        //             </li>
        //             <li>
        //             <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
        //             </li>
        //         </ul>
        //     </nav>
        // </div>
        

        <div className="w-full flex items-center justify-end px-4 py-2 sm:px-2 rounded">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => onPrevious()}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded"
                >
                    Previous
                </button>
                <button
                    onClick={() => onNext()}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
                <div>
                    <nav className="isolate gap-2 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button onClick={() => onPrevious()} className="relative cursor-pointer inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                            <span className="sr-only">Previous</span>
                                <svg className="w-6 h-6" fill="none" stroke="#C4CDD5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        {
                            paginationRange.map((range) => {
                                if (range === '...') {
                                    return (
                                        <button key={range} className="relative cursor-pointer inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                                            ...
                                        </button>
                                    )
                                }

                                return range === currentPage ? (
                                    <button
                                        key={range}
                                        onClick={() => onChangePage(range)}
                                        aria-current="page"
                                        className="relative cursor-pointer z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                                    >
                                        {range}
                                    </button>
                                ) : (
                                    <button
                                        key={range}
                                        onClick={() => onChangePage(range)}
                                        className="relative cursor-pointer inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                                    >
                                        {range}
                                    </button>
                                )
                            })
                        }
                        <button onClick={() => onNext()} className="relative cursor-pointer inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                            <span className="sr-only">Next</span>
                            <svg className="w-6 h-6" fill="none" stroke="#C4CDD5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}
