import axios from "axios";
import { NormalInput } from "component/common/NormalInput";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdModeEdit } from "react-icons/md";
import { history } from "service/helpers";
import "./style.scss";

export const View = () => {
  const [datum, setDatum] = useState([]);

  const [search, setSearch] = useState("");

  const [approve, setApprove] = useState(0);

  const [decline, setDecline] = useState(0);

  useEffect(() => {
    loadUserData();
  }, [search]);

  const loadUserData = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setDatum(
      result?.data?.filter((searchData) => {
        return searchData?.name?.toLowerCase().includes(search?.toLowerCase());
      })
    );
  };

  const deleteHandler = async (item) => {
    await axios.delete(`http://localhost:3003/users/${item}`);
    const userLoad = datum.filter((user) => user.id !== item);
    setDatum(userLoad);
  };

  const approveHandler = (id) =>{
    return setApprove(id);
  }

  const disapproveHandler = (id) =>{
    return setDecline(id);
  }
  

  return (
    <>
      <div className="row">
        <div className="col-12 pt-5">
          <div className="d-flex justify-content-end">
            <div>
              <NormalInput
                placeholder="Search for users"
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-12 p-5">
          <div className="d-flex justify-content-end">
            <div>
              <div className="detail-Box">
                <p className="fs-32 fw-800 text-light text-center userDetailHeader pt-5">
                  User Details
                </p>
                <div className="row p-3">
                  <div className="col-1">
                    <p className="text-warning fs-22 fw-800 userDetailTitle">
                      S.No
                    </p>
                  </div>
                  <div className="col-1">
                    <p className="text-warning fs-22 fw-800 userDetailTitle">
                      Name
                    </p>
                  </div>
                  <div className="col-2">
                    <p className="text-warning fs-22 fw-800 userDetailTitle">
                      File
                    </p>
                  </div>
                  <div className="col-2">
                    <p className="text-warning fs-22 fw-800 userDetailTitle">
                      Tech Stacks
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="text-warning fs-22 fw-800 userDetailTitle">
                      Phone Number
                    </p>
                  </div>
                </div>

                {datum && datum.length <= 0 ? (
                  <p className="text-warning text-center fw-800">
                    No result found....!
                  </p>
                ) : (
                  <>
                    {datum.map((item, i) => {
                      let { id, name, phone } = item;
                      return (
                        <React.Fragment>
                          <div className="row p-3">
                            <div className="col-1">
                              <p className="text-light fw-400 userDetailPara">{`${
                                i + 1
                              } .`}</p>
                            </div>
                            <div className="col-1">
                              <p className="text-light fw-400 userDetailPara">
                                {name}
                              </p>
                            </div>
                            <div className="col-2">
                              {item?.fileType?.file?.map((value) => {
                                return (
                                  <>
                                    <p className="text-light fw-400 userDetailPara">
                                      {value.path}
                                    </p>
                                  </>
                                );
                              })}
                            </div>
                            <div className="col-2">
                              {item?.stack?.map((val) => {
                                return (
                                  <p className="text-light fw-400 userDetailPara">
                                    {val.label}
                                  </p>
                                );
                              })}
                            </div>
                            <div className="col-2">
                              <p className="text-light fw-400">{phone}</p>
                            </div>
                            <div className="col-1">
                            <button className="btn btn-info" onClick={() =>approveHandler(id)}>y</button>
                            {item.id === approve && localStorage.setItem('status', "Approved")}
                            </div>
                            <div className="col-1">
                            <button className="btn btn-info" onClick={() =>disapproveHandler(id)}>n</button>
                            {item.id === decline && localStorage.setItem('status', "Declined")}
                            </div>
                            <div className="col-2">
                              <div className="d-flex flex-row justify-content-between">
                                <div className="pr-2">
                                  <span
                                    onClick={() =>
                                      history.push(`/dashboard/view/${id}`)
                                    }
                                  >
                                    <CgProfile className="fs-26 text-warning cursor-pointer" />
                                  </span>
                                </div>
                                <div className="pr-2">
                                  <span
                                    onClick={() =>
                                      history.push(`/dashboard/edit/${id}`)
                                    }
                                  >
                                    <MdModeEdit className="fs-26 text-success cursor-pointer" />
                                  </span>
                                </div>
                                <div>
                                  <span onClick={() => deleteHandler(id)}>
                                    <AiFillDelete className="fs-26 text-danger cursor-pointer" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="d-flex justify-content-center">
        <div>
          <TableWrapper headerDetails={headerContents}>
            {datum?.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="text-light fw-800">{index + 1}.</td>
                  <td className="text-light fw-800">{item.name}</td>
                  <td className="text-light fw-800">{item.phone}</td>
                  <td className="text-light fw-800">
                    {item?.fileType?.file?.map((value) => {
                      return <>{value.path}</>;
                    })}
                  </td>
                  <td className="text-light fw-800">
                    {item?.stack?.map((val) => {
                      return (
                        <>
                          {val.label} <br />
                        </>
                      );
                    })}
                  </td>
                  <td>
                    <span
                      onClick={() => history.push(`/dashboard/view/${item.id}`)}
                    >
                      <CgProfile className="fs-26 text-warning cursor-pointer" />
                    </span>
                  </td>
                  <td>
                    <span
                      onClick={() => history.push(`/dashboard/edit/${item.id}`)}
                    >
                      <MdModeEdit className="fs-26 text-success cursor-pointer" />
                    </span>
                  </td>
                  <td>
                    <span onClick={() => deleteHandler(item.id)}>
                      <AiFillDelete className="fs-26 text-danger cursor-pointer" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </TableWrapper>
        </div>
      </div> */}
    </>
  );
};
