import axios from "axios";
import { NormalInput } from "component/common/NormalInput";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillDelete } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdModeEdit } from "react-icons/md";
import { history } from "service/helpers";
import "./style.scss";

export const View = () => {
  const [datum, setDatum] = useState([]);

  const [search, setSearch] = useState("");

  const { t } = useTranslation();

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

  const approveHandler = (i) => {
    let statusData = [...datum];
    if (statusData[i]?.approvalStatus === true) {
      statusData[i].approvalStatus = false;
      alert(`${statusData[i].name} is canceled!`);
    } else {
      statusData[i].approvalStatus = true;
      alert(`${statusData[i].name} is approved!`);
    }
    setDatum([...statusData]);
    localStorage.setItem("userApproval", JSON.stringify(datum));
  };

  let userApprovalData = JSON.parse(localStorage.getItem("userApproval"));

  console.log(userApprovalData, "approvaldata");

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
                  {t("userTable.tableTitle")}
                </p>
                <div className="row p-3">
                  <div className="col-1">
                    <p className="text-warning fs-22 fw-800 userDetailTitle">
                      {t("userTable.sno")}
                    </p>
                  </div>
                  <div className="col-1">
                    <p className="text-warning fs-22 fw-800 userDetailTitle">
                      {t("userTable.Name")}
                    </p>
                  </div>
                  <div className="col-2">
                    <p className="text-warning fs-22 fw-800 userDetailTitle">
                      {t("userTable.file")}
                    </p>
                  </div>
                  <div className="col-2">
                    <p className="text-warning fs-22 fw-800 userDetailTitle">
                      {t("userTable.techStack")}
                    </p>
                  </div>
                  <div className="col-4">
                    <p className="text-warning fs-22 fw-800 userDetailTitle">
                      {t("userTable.phnNo")}
                    </p>
                  </div>
                </div>

                {datum && datum.length <= 0 ? (
                  <p className="text-warning text-center fw-800">
                    {t("userTable.noResult")}
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
                            <div className="col-2">
                              <button
                                className="btn btn-info"
                                onClick={() => approveHandler(id - 1)}
                              >
                                {item?.approvalStatus
                                  ? item?.stringOne
                                  : item?.stringTwo}
                              </button>
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
    </>
  );
};
