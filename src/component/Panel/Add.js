import closeIcon from "assets/svg/canvasClose.svg";
import upload from "assets/svg/uploadFileIcon.svg";
import axios from "axios";
import { NormalInput } from "component/common/NormalInput";
import { SelectComponent } from "component/common/SelectComponent";
import { Selector } from "component/common/Selector";
import React, { useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useTranslation } from "react-i18next";
import { MdOutlineRemoveCircle } from "react-icons/md";
import { useHistory } from "react-router-dom";
import "./style.scss";

export const Add = () => {
  const [addUser, setAddUser] = useState({
    name: "",
    username: "",
    website: "",
    city: "",
    phone: "",
    stack: null,
    fileType: "",
    status: "Male",
    approvalStatus: false,
    personalMartialStatus: "Single",
    stringOne: "Approved",
    stringTwo: "Disapproved",
  });

  const [option, setOption] = useState([]);

  const [files, setFiles] = useState([]);

  const [showPreview, setShowPreview] = useState(false);

  const { t } = useTranslation();

  const myOptions = [
    {
      value: 1,
      label: ".Net",
    },
    {
      value: 2,
      label: "NodeJS",
    },
    {
      value: 3,
      label: "JavaScript",
    },
    {
      value: 4,
      label: "TypeScript",
    },
    {
      value: 5,
      label: "ReactJS/Native",
    },
    {
      value: 6,
      label: "AWS",
    },
    {
      value: 7,
      label: "Mediasoup",
    },
    {
      value: 8,
      label: "Kotlin",
    },
    {
      value: 9,
      label: "Swift",
    },
    {
      value: 10,
      label: "Azure",
    },
    {
      value: 11,
      label: "Twilio",
    },
    {
      value: 12,
      label: "Kubernetes",
    },
    {
      value: 13,
      label: "WebRTC",
    },
    {
      value: 14,
      label: "Vue.js",
    },
    {
      value: 15,
      label: "Angular",
    },
  ];

  const statusData = [
    {
      id: 0,
      name: "Male",
    },
    {
      id: 1,
      name: "Female",
    },
  ];

  const martialStatusData = [
    {
      id: 0,
      name: "Single",
    },
    {
      id: 1,
      name: "Commited",
    },
    {
      id: 2,
      name: "Married",
    },
  ];

  const history = useHistory();

  //handle Change
  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target || e || {};
    setAddUser({ ...addUser, [name]: value });
  };

  const handleStatusChange = (e) => {
    // setStatus(e.target.value);
    setAddUser({ ...addUser, status: e.target.value });
  };

  const handleMartialChange = (e) => {
    setAddUser({ ...addUser, personalMartialStatus: e.target.value });
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
    if (acceptedFiles) {
      const formdata = new FormData();
      formdata.append("image", acceptedFiles);
    }
    setShowPreview(true);
  });

  useEffect(() => {
    if (files) {
      let objFile = { file: files };
      setAddUser({ ...addUser, fileType: objFile });
    }
  }, [files, showPreview]);

  useEffect(() => {
    axios.get("https://ipapi.co/json/").then((res) => {
      setAddUser({ ...addUser, city: res?.data?.region });
    });
  }, []);

  console.log(addUser, "city");

  const images = files.map((file) => (
    <div className="dnd-container" key={file.name}>
      <img
        className="dnd-img mx-auto d-block"
        src={file.preview}
        alt="Screen"
      />
    </div>
  ));

  const checkShowPreviewIsPresent = () => {
    return (
      <>
        {showPreview ? (
          <img
            src={closeIcon}
            className="img-fluid removeImgBtn"
            onClick={(e) => removeImageHandler(e)}
            alt="icon"
          />
        ) : (
          ""
        )}
      </>
    );
  };

  const removeImageHandler = (e) => {
    e.stopPropagation();
    setFiles([]);
    setShowPreview(false);
  };

  const handleSelectChange = (e) => {
    setOption([...option, e]);
    const data = option.filter((current, index) => {
      return option.findIndex((user) => user.label === current.label) === index;
    });
    setAddUser({ ...addUser, stack: data });
  };

  const handleDelete = (i) => {
    let datum = option;
    datum.splice(i, 1);
    setOption([...datum]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3003/users", addUser).then(() => {
      history.push("/dashboard/view");
    });
  };

  return (
    <div className="row">
      <div className="col-12 py-5 mt-2">
        <div className="d-flex justify-content-center align-items-center addUser-BoxContainer-layout">
          <div>
            <div className="addUser-BoxContainer pt-5 pb-4 px-5">
              <div className="addUser-title-box">
                <h3 className="text-danger add-title fs-32 fw-800  text-center p-3">
                  {t("formHeader.formTitle")}
                </h3>
              </div>
              <form className="my-4">
                <div className="form-group my-2">
                  <NormalInput
                    type="text"
                    label={t("formHeader.firstName")}
                    name="name"
                    value={addUser.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group my-2">
                  <NormalInput
                    type="text"
                    label={t("formHeader.userName")}
                    name="username"
                    value={addUser.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group my-2">
                  <NormalInput
                    type="text"
                    label={t("formHeader.website")}
                    name="website"
                    value={addUser.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group my-2">
                  <NormalInput
                    type="text"
                    label={t("formHeader.state")}
                    name="city"
                    value={addUser?.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-3">
                  <Selector
                    label={t("formHeader.martialStatus")}
                    value={addUser.personalMartialStatus}
                    onChange={handleMartialChange}
                    option={martialStatusData}
                  />
                </div>

                <div className="form-group my-2">
                  <NormalInput
                    type="tel"
                    label={t("formHeader.phNo")}
                    name="phone"
                    value={addUser.phone}
                    onChange={handleChange}
                  />
                  <div className="pt-3">
                    <label className="text-light">
                      {t("formHeader.techStack")}
                    </label>
                    <div className="select-container">
                      <SelectComponent
                        options={myOptions}
                        value={option}
                        onChange={handleSelectChange}
                      />
                      <div className="d-flex pt-3">
                        {option.map(({ label }) => {
                          return (
                            <React.Fragment>
                              <p className="text-danger fw-800">
                                {label}{" "}
                                <span className="pr-2" onClick={handleDelete}>
                                  <MdOutlineRemoveCircle className="text-light fs-20 cursor-pointer" />
                                </span>
                              </p>
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3">
                    <label className="text-light">
                      {t("formHeader.gender")}
                    </label>
                    <Selector
                      name="status"
                      value={addUser.status}
                      onChange={handleStatusChange}
                      option={statusData}
                    />
                  </div>

                  <div>
                    <label className="text-light mb-0">
                      {t("formHeader.doc")}
                    </label>
                    <Dropzone onDrop={onDrop} minSize={10000}>
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps({
                            className: "dropzone",
                            onDrop: (event) => event.preventDefault(),
                          })}
                        >
                          <div className="image-upload-wrap d-flex justify-content-center align-items-center flex-direction-column">
                            <input {...getInputProps()} />
                            {!showPreview ? (
                              <div className="drag-text">
                                <div>
                                  <img
                                    src={upload}
                                    className="img-fluid mx-auto d-block pb-3"
                                    alt="uploadicon"
                                  />
                                  <div className="d-flex justify-content-center">
                                    <div>
                                      <p className="uploadTitle fs-14 fw-400 m-0 pb-3">
                                        Upload files by drag and drop or{" "}
                                        <span className="uploadLink">
                                          click to upload
                                        </span>
                                        .
                                      </p>
                                    </div>
                                  </div>
                                  <p className="fs-12 fw-400 allowedFormats text-center fw-800">
                                    Allowed files: JPEG, PNG, DOC, DOCX, PDF
                                    Maximum Size: 10MB
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="drag-text">
                                  <div>
                                    <div>{images}</div>
                                    {checkShowPreviewIsPresent()}
                                    <div className="d-flex justify-content-center">
                                      <div>
                                        <p className="uploadTitle fs-14 fw-800 m-0 pb-3">
                                          Upload files by drag and drop or{" "}
                                          <span className="uploadLink">
                                            click to upload
                                          </span>
                                          .
                                        </p>
                                      </div>
                                    </div>
                                    <p className="fs-12 fw-400 allowedFormats text-center">
                                      Allowed files: JPEG, PNG, DOC, DOCX, PDF
                                      Maximum Size: 10MB
                                    </p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </div>
                  <div className="col-12">
                    <button
                      onClick={handleSubmit}
                      className="addUserBtn fs-22 fw-700 mt-4 mx-auto d-block p-3 px-5"
                    >
                      {t("formHeader.addUser")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
