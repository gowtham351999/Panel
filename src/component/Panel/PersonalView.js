import axios from "axios";
import FileSaver from "file-saver";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillBackward } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { history } from "service/helpers";
import "./style.scss";

export const PersonalView = () => {
  const [viewData, setViewData] = useState(null);

  const { id } = useParams();

  const { t } = useTranslation();

  const loadUserData = async () => {
    await axios.get(`http://localhost:3003/users/${id}`).then((data) => {
      setViewData(data?.data);
    });
  };

  const exportData = () => {
    let blob = new Blob([JSON.stringify(viewData)], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(blob, "UserProfile.doc");
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div>
            <div className="viewUserContainer p-5">
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
                    {t("formHeader.website")} :
                  </p>
                  <p className="text-warning text-left fw-400 mb-0 pb-3">
                    {t("userTable.phnNo")} :
                  </p>
                  <p className="text-warning text-left fw-400 mb-0">
                    {t("userTable.techStack")} :
                  </p>
                </div>
                <div>
                  <p className="text-light text-left fw-400">
                    {viewData?.name}
                  </p>
                  <p className="text-light text-left fw-400">
                    {viewData?.username}
                  </p>
                  <p className="text-light text-left fw-400">
                    {viewData?.website}
                  </p>
                  <p className="text-light text-left fw-400 mb-0 pb-3">
                    {viewData?.phone}
                  </p>
                  {viewData?.stack?.map((res, i) => {
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
                    Download Profile
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
