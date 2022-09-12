import { useRef } from "react";

const Pagination = ({ data, ratio,first, setFirst,end, setEnd, filterdata, setFilterdata }) => {
  const lengthData = data.length;
  const pages = Math.ceil(lengthData / ratio);

  const btnAll = useRef([]);

  const resetClassName = () => {
    for (let index = 0; index < btnAll.current.length; index++) {
      btnAll.current[index].className =
        "select-none py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-200";
    }
  };

  const changeRef = (e) => {
    resetClassName();
    e.target.className += " hover:bg-gray-200 bg-blue-700 text-blue-00";
  };

  const nav = () => {
    let array = [];
    for (let index = 0; index < pages; index++) {
      array.push(
        <li key={index}>
          <button
            ref={(element) => {
              btnAll.current[index] = element;
            }}
            onClick={(e) => {
              setFirst(index * ratio);
              setEnd(index * ratio + ratio);
              changeRef(e);
            }}
            className={`select-none py-2 px-3 leading-tight text-gray-500 bg-red border border-gray-300 hover:bg-gray-200 ${
              index === 0 ? "bg-blue-700 text-gray-50" : ""
            }`}
          >
            {index + 1}
          </button>
        </li>
      );
    }
    return array;
  };

  return (
    <nav aria-label="Pagination">
      <ul className="flex justify-center my-6">
        <li>
          <button
            onClick={() => {
              if (first >= ratio) {
                setFirst((current) => current - ratio);
                setEnd((current) => current - ratio);
                resetClassName();
                btnAll.current[first / ratio - 1].className +=
                  " bg-blue-700 text-gray-50";
                console.log("Précédent");
              }
            }}
            className={` ${
              first <= ratio ? "disabled:opacity-25" : ""
            } select-none py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100`}
          >
            Précédent
          </button>
        </li>
        {nav()}

        <li>
          <button
            onClick={() => {
              if (end < lengthData) {
                setFirst((current) => current + ratio);
                setEnd((current) => current + ratio);
                resetClassName();
                btnAll.current[first / ratio + 1].className +=
                  " bg-blue-700 text-gray-50";
              }
            }}
            href="#"
            className={`${
              end >= lengthData ? "disabled:opacity-25" : ""
            } select-none py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
          >
            Suivant
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
