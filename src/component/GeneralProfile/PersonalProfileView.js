import { fileHandler } from "action/PanelAct";
import FileSaver from "file-saver";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillBackward } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { history } from "service/helpers";
import "./style.scss";

export const PersonalProfileView = () => {
  const [viewData, setViewData] = useState(null);

  // const { id } = useParams();

  // const loadUserData = async () => {
  //   await axios.get(`http://localhost:3003/personal/${id}`).then((data) => {
  //     setViewData(data?.data)
  //   });
  // };

  // useEffect(() =>{
  //   loadUserData();
  // }, [])

  const getViewData = useLocation();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    if (getViewData) {
      setViewData(getViewData?.state);
      dispatch(fileHandler(viewData));
    }
  });

  const exportData = () => {
    let blob = new Blob([JSON.stringify(viewData)], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(blob, "UserProfile.doc");
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div>
            <div className="viewUserContainer p-5">
              <div
                className="d-flex justify-content-start pb-2"
                onClick={() =>
                  history.push({
                    pathname: "/user/user-add",
                    state: viewData,
                  })
                }
              >
                <div>
                  <FaUserEdit className="text-warning fs-30 cursor-pointer" />
                </div>
              </div>
              <p className="text-light text-center fs-32 fw-800">
                <span onClick={() => history.push("/dashboard/view")}>
                  <AiFillBackward className="text-warning cursor-pointer" />
                </span>{" "}
                {t("userTable.tableTitle")}
              </p>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-warning text-left fw-400">
                    {t("userTable.Name")} :
                  </p>
                  <p className="text-warning text-left fw-400">
                    {t("formHeader.userName")} :
                  </p>
                  <p className="text-warning text-left fw-400">
                    {t("formHeader.gender")} :
                  </p>
                  <p className="text-warning text-left fw-400 mb-0 pb-3">
                    {t("formHeader.phNo")} :
                  </p>
                  <p className="text-warning text-left fw-400 mb-0 pb-3">
                    {t("userTable.file")} :
                  </p>
                  <p className="text-warning text-left fw-400 mb-0">
                    {t("userTable.techStack")} :
                  </p>
                </div>
                <div>
                  <p className="text-light text-left fw-400">
                    {viewData?.personalName}
                  </p>
                  <p className="text-light text-left fw-400">
                    {viewData?.personalUsername}
                  </p>
                  <p className="text-light text-left fw-400">
                    {viewData?.personalGender}
                  </p>
                  <p className="text-light text-left fw-400">
                    {viewData?.personalMartialStatus}
                  </p>
                  <p className="text-light text-left fw-400 mb-0 pb-3">
                    {viewData?.personalMobile}
                  </p>
                  {viewData?.personalFileType?.file?.map((val) => {
                    return (
                      <p className="text-light text-left fw-400 mb-0 pb-3">
                        {val.name}
                      </p>
                    );
                  })}
                  {viewData?.personalStack?.map((res, i) => {
                    return (
                      <p className="text-light text-left fw-400 mb-0">
                        {i + 1}. {res.label}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="d-flex justify-content-center pt-3">
                <div>
                  <button
                    className="btn btn-success p-2 text-light"
                    onClick={exportData}
                  >
                    {t("userTable.downloadUser")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
