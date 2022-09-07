import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import "./table.scss";
/**
 * Table : The Common Re-usable Table across website.
 * @return {JSX.Element} The JSX Code for Table
 */
export class TableWrapper extends Component {
  render() {
    let {
      headerDetails,
      children,
      pageMeta = {},
      className = "",
      overFlow = true,
      handleFilter,
      tbodyClass,
      handlePageChange = {},
      sortActiveKey = "",
    } = this.props;
    return (
      <div className="maintableStriped table-container px-3 py-2">
        <div
          className={`maintable-content ${
            overFlow ? "table-responsive" : ""
          } ${className}`}
        >
          <table className={`table table-striped mt-3 ${className}`}>
            <thead>
              <tr>
                {headerDetails.map(
                  (
                    {
                      label,
                      className = "",
                      sortKey = "",
                      element,
                      isSort = false,
                      isButtonRequired = false,
                    },
                    index
                  ) => {
                    return (
                      <th className={className} key={index}>
                        {!isButtonRequired ? (
                          <div
                            className={`d-flex align-items-center justify-content-start text-center`}
                          >
                            {label}
                            {element && element()}
                            {isSort ? (
                              <div
                                className={`d-flex table-filter align-items-center flex-column ml-2 `}
                              >
                                <i
                                  className={`icon-arrow-up ${
                                    sortActiveKey === sortKey ? "active" : ""
                                  } cursor-pointer`}
                                  onClick={() => handleFilter(sortKey, -1)}
                                />
                                <i
                                  className={`icon-arrow-down cursor-pointer`}
                                  onClick={() => handleFilter(sortKey, 1)}
                                />
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </th>
                    );
                  }
                )}
              </tr>
            </thead>
            <tbody className={`tbody-class ${tbodyClass}`}>{children}</tbody>
          </table>
        </div>
        {pageMeta && pageMeta.totalPages > 1 ? (
          <ReactPaginate
            disableInitialCallback={true}
            previousLabel={<i className="icon-arrow-left fs-10"></i>}
            nextLabel={<i className="icon-arrow-right fs-10"></i>}
            breakLabel={<span>...</span>}
            breakClassName="mr-2"
            pageCount={pageMeta.totalPages}
            pageRangeDisplayed={2}
            onPageChange={(e) => handlePageChange(e.selected + 1)}
            containerClassName="pagination custom-pagination"
            subContainerClassName="pages"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            activeClassName="active"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            forcePage={pageMeta.page - 1}
          />
        ) : null}
      </div>
    );
  }
}

TableWrapper.propTypes = {
  placeHolder: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  isEmpty: PropTypes.bool,
  headerDetails: PropTypes.array.isRequired,
  pageMeta: PropTypes.object,
};
