// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useTranslation } from "react-i18next";
// import { useForm } from "react-hook-form";
// import API from "../../../utilities/API";

// //   #region components
// import {
//     Card,
//     CardBody,
//     Button,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     Form,
//     FormGroup,
//     Alert,
// } from "reactstrap";
// import Spinner from "../../../components/spinner/Spinner";
// import ReactTable from "react-table-v6";
// import Breadcrumbs from "../../../components/Breadcrumbs";
// // #endregion

// // #region Actions
// import {
//     addCountry,
//     deleteCountry,
//     fetchCountry,
//     updateCountry,
// } from "../../../redux/country/Action";

// // #endregion
// //   #region style
// import "react-table-v6/react-table.css";
// // #endregion

// export default function Country() {
//     const { t } = useTranslation();
//     const dispatch = useDispatch();
//     const { handleSubmit } = useForm(); // initialise the hook

//     const country = useSelector((state) => state.countryReducers.country);
//     const error = useSelector((state) => state.countryReducers.error);
//     const loading = useSelector((state) => state.countryReducers.loading);

//     // #region constants
//     const [visible, setVisible] = useState("");
//     const [modalAdd, setModalAdd] = useState(false);
//     const [modalDelete, setModalDelete] = useState(false);
//     const [modalEdit, setModalEdit] = useState(false);
//     const [selectedCountry, setSelectedCountry] = useState(null);
//     const [update, setUpdate] = useState({
//         lastUpdate: new Date(),
//         userId: 1,
//     });
//     const [add, setAdd] = useState({
//         lastUpdate: new Date(),
//         userId: 1,
//     });

//     // #endregion

//     // #region table data

//     //   #region submit functions]

//     const onEdit = () => {
//         dispatch(updateCountry(update));
//         setModalEdit(false);
//     };

//     const onAdd = (data) => {
//         dispatch(addCountry(add));
//         setModalAdd(false);
//     };

//     const onDelete = (id, e) => {
//         e.preventDefault();
//         dispatch(deleteCountry(id, 0));
//         setModalDelete(false);
//     };

//     // #endregion

//     function FetchData(id) {
//         API(`Coding/GeneralCoding/Country/GetCountryById/${id}`, "GET").then(
//             ({ data, status }) => {
//                 if (status === 200) {
//                     setUpdate(data);
//                     setModalEdit(true);
//                 }
//             }
//         );
//     }

//     // #region react table data
//     const data2 = country?.map((prop) => {
//         return {
//             countryId: prop.countryId,
//             countryNameA: prop.countryNameA,
//             countryNameE: prop.countryNameE,
//             countryCode: prop.countryCode,
//             actions: (
//                 // we've added some custom button actions
//                 <div className="text-center">
//                     <Button
//                         className="edit-btn"
//                         size="sm"
//                         round="true"
//                         icon="true"
//                         onClick={() => {
//                             setSelectedCountry(prop.countryId);
//                             setUpdate({ ...update, countryId: prop.countryId });
//                             FetchData(prop?.countryId);
//                         }}
//                     >
//                         <i className="fa fa-edit" />
//                     </Button>
//                     {/* use this button to remove the data row */}
//                     <Button
//                         className="ml-1 delete-btn"
//                         size="sm"
//                         round="true"
//                         icon="true"
//                         onClick={() => {
//                             setSelectedCountry(prop.countryId);
//                             setModalDelete(!modalDelete);
//                         }}
//                     >
//                         <i className="fa fa-times" />
//                     </Button>
//                 </div>
//             ),
//         };
//     });
//     // #endregion
//     document.addEventListener("click", () => setVisible(false));

//     useEffect(() => {
//         dispatch(fetchCountry());
//     }, [dispatch]);

//     useEffect(() => {
//         error ? setVisible(true) : setVisible(false);
//     }, [error]);

//     // #endregion

//     return (
//         <div className="country">
//             <Breadcrumbs main="coding" sub="general" subSub="countries" />
//             {!loading ? (
//                 <Card>
//                     <Alert
//                         color="danger"
//                         className={visible ? "d-block" : "d-none"}
//                     >
//                         {t(error)}
//                     </Alert>

//                     <CardBody>
//                         <Button
//                             className="mt-4 "
//                             style={{ width: "fit-content" }}
//                             onClick={() => {
//                                 setModalAdd(!modalAdd);
//                             }}
//                         >
//                             {t("Add")} +
//                         </Button>
//                     </CardBody>

//                     <CardBody>
//                         {
//                             //  #region React Table

//                             <ReactTable
//                                 columns={[
//                                     {
//                                         Header: t("country arabic name"),
//                                         accessor: "countryNameA",
//                                     },
//                                     {
//                                         Header: t("country english name"),
//                                         accessor: "countryNameE",
//                                     },

//                                     {
//                                         Header: t("country code"),
//                                         accessor: "countryCode",
//                                     },
//                                     {
//                                         Header: "",
//                                         accessor: "actions",
//                                         sortable: false,
//                                         filterable: false,
//                                     },
//                                 ]}
//                                 defaultPageSize={10}
//                                 showPaginationBottom={true}
//                                 className="-striped -highlight "
//                                 data={data2}
//                                 filterable
//                                 nextText={t("Next")}
//                                 previousText={t("Previous")}
//                                 noDataText={t("No rows found")}
//                                 loadingText={t("Loading...")}
//                                 pageText={t("Page")}
//                                 rowsText={t("rows")}
//                                 ofText={t("of")}
//                             />
//                             // #endregion
//                         }
//                     </CardBody>
//                 </Card>
//             ) : (
//                 <Spinner />
//             )}
//             {
//                 //   #region Delete
//                 <Modal
//                     backdrop={false}
//                     isOpen={modalDelete}
//                     toggle={() => setModalDelete(!modalDelete)}
//                 >
//                     <ModalHeader toggle={() => setModalDelete(!modalDelete)}>
//                         {t("Remove country")} {t("?")}
//                     </ModalHeader>
//                     <ModalBody>
//                         <Form onSubmit={(e) => onDelete(selectedCountry, e)}>
//                             <h2>
//                                 {t("Are you sure you want remove this")}{" "}
//                                 {t("country")} {t("?")}
//                             </h2>
//                             <FormGroup>
//                                 <Button color="primary" type="submit">
//                                     {t("Remove")}
//                                 </Button>
//                                 <Button
//                                     color="secondary"
//                                     className="ml-1"
//                                     onClick={() => setModalDelete(!modalDelete)}
//                                 >
//                                     {t("Cancel")}
//                                     <i class="mr-2 mdi mdi-close px-2"></i>
//                                 </Button>
//                             </FormGroup>
//                         </Form>
//                     </ModalBody>
//                 </Modal>

//                 // #endregion
//             }

//             {
//                 //  #region Edit Modal

//                 <Modal
//                     backdrop={false}
//                     isOpen={modalEdit}
//                     style={{ maxWidth: 700 }}
//                     toggle={() => setModalEdit(!modalEdit)}
//                 >
//                     <Card>
//                         <ModalHeader toggle={() => setModalEdit(!modalEdit)}>
//                             <i className="mdi mdi-alert-box mr-2" />
//                             {t("Edit country")}
//                         </ModalHeader>
//                         <CardBody>
//                             <Form onSubmit={handleSubmit(onEdit)}>
//                                 <div className="container">
//                                     <div className="row">
//                                         <FormGroup className="col-sm-4">
//                                             <label
//                                                 className="control-label"
//                                                 htmlFor="countryNameEn"
//                                             >
//                                                 {t("Name In English")}{" "}
//                                             </label>
//                                             <div className="mb-2">
//                                                 <input
//                                                     type="text"
//                                                     name="countryNameE"
//                                                     autoComplete="off"
//                                                     required
//                                                     id="countryNameEn"
//                                                     onInvalid={(e) =>
//                                                         e.target.setCustomValidity(
//                                                             t(
//                                                                 "Please fill out this field"
//                                                             )
//                                                         )
//                                                     }
//                                                     onInput={(e) =>
//                                                         e.target.setCustomValidity(
//                                                             ""
//                                                         )
//                                                     }
//                                                     className="form-control e-input"
//                                                     defaultValue={
//                                                         update?.countryNameE
//                                                     }
//                                                     onChange={(e) =>
//                                                         setUpdate({
//                                                             ...update,
//                                                             countryNameE:
//                                                                 e.target.value,
//                                                         })
//                                                     }
//                                                 />
//                                             </div>
//                                         </FormGroup>
//                                         <FormGroup className="col-sm-4">
//                                             <label
//                                                 className="control-label"
//                                                 htmlFor="countryNameAr"
//                                             >
//                                                 {t("Name In Arabic")}{" "}
//                                             </label>
//                                             <div className="mb-2">
//                                                 <input
//                                                     type="text"
//                                                     name="countryNameA"
//                                                     required
//                                                     id="countryNameAr"
//                                                     defaultValue={
//                                                         update?.countryNameA
//                                                     }
//                                                     onInvalid={(e) =>
//                                                         e.target.setCustomValidity(
//                                                             t(
//                                                                 "Please fill out this field"
//                                                             )
//                                                         )
//                                                     }
//                                                     onInput={(e) =>
//                                                         e.target.setCustomValidity(
//                                                             ""
//                                                         )
//                                                     }
//                                                     className="form-control"
//                                                     autoComplete="off"
//                                                     onChange={(e) =>
//                                                         setUpdate({
//                                                             ...update,
//                                                             countryNameA:
//                                                                 e.target.value,
//                                                         })
//                                                     }
//                                                 />
//                                             </div>
//                                         </FormGroup>
//                                         <FormGroup className="col-sm-4">
//                                             <label
//                                                 className="control-label"
//                                                 htmlFor="countryCode1"
//                                             >
//                                                 {t("country code")}
//                                             </label>
//                                             <div className="mb-2">
//                                                 <input
//                                                     type="text"
//                                                     name="countryCode"
//                                                     id="countryCode1"
//                                                     required
//                                                     defaultValue={
//                                                         update?.countryCode
//                                                     }
//                                                     onInvalid={(e) =>
//                                                         e.target.setCustomValidity(
//                                                             t(
//                                                                 "Please fill out this field"
//                                                             )
//                                                         )
//                                                     }
//                                                     onInput={(e) =>
//                                                         e.target.setCustomValidity(
//                                                             ""
//                                                         )
//                                                     }
//                                                     className="form-control"
//                                                     autoComplete="off"
//                                                     onChange={(e) => {
//                                                         setUpdate({
//                                                             ...update,
//                                                             countryCode:
//                                                                 e.target.value,
//                                                         });
//                                                     }}
//                                                 />
//                                             </div>
//                                         </FormGroup>
//                                     </div>
//                                 </div>
//                                 <FormGroup className="text-center">
//                                     <Button
//                                         className="button btn-info"
//                                         type="submit"
//                                     >
//                                         {t("Update")}
//                                         <i class="mr-2 mdi mdi-checkbox-multiple-marked-outline"></i>
//                                     </Button>
//                                 </FormGroup>
//                             </Form>
//                         </CardBody>
//                     </Card>
//                 </Modal>

//                 // #endregion
//             }
//             {
//                 //  #region Add Modal

//                 <Modal
//                     backdrop={false}
//                     style={{ maxWidth: 700 }}
//                     isOpen={modalAdd}
//                     toggle={() => setModalAdd(!modalAdd)}
//                 >
//                     <Card>
//                         <ModalHeader toggle={() => setModalAdd(!modalAdd)}>
//                             <i className="mdi mdi-alert-box mr-2" />
//                             {t("Add a new country")}
//                         </ModalHeader>
//                         <CardBody>
//                             <Form onSubmit={handleSubmit(onAdd)}>
//                                 <div className="container">
//                                     <div className="row">
//                                         <FormGroup className="col-sm-4">
//                                             <label
//                                                 className="control-label"
//                                                 htmlFor="countryNameE"
//                                             >
//                                                 {t("Name In English")}{" "}
//                                             </label>
//                                             <div className="mb-2">
//                                                 <input
//                                                     type="text"
//                                                     name="countryNameE"
//                                                     autoComplete="off"
//                                                     required
//                                                     id="countryNameE"
//                                                     onInvalid={(e) =>
//                                                         e.target.setCustomValidity(
//                                                             t(
//                                                                 "Please fill out this field"
//                                                             )
//                                                         )
//                                                     }
//                                                     onInput={(e) =>
//                                                         e.target.setCustomValidity(
//                                                             ""
//                                                         )
//                                                     }
//                                                     className="form-control e-input"
//                                                     placeholder={t(
//                                                         "Enter English Name"
//                                                     )}
//                                                     onChange={(e) =>
//                                                         setAdd({
//                                                             ...add,
//                                                             countryNameE:
//                                                                 e.target.value,
//                                                         })
//                                                     }
//                                                 />
//                                             </div>
//                                         </FormGroup>
//                                         <FormGroup className="col-sm-4">
//                                             <label
//                                                 className="control-label"
//                                                 htmlFor="countryNameA"
//                                             >
//                                                 {t("Name In Arabic")}{" "}
//                                             </label>
//                                             <div className="mb-2">
//                                                 <input
//                                                     type="text"
//                                                     name="countryNameA"
//                                                     required
//                                                     id="countryNameA"
//                                                     onInvalid={(e) =>
//                                                         e.target.setCustomValidity(
//                                                             t(
//                                                                 "Please fill out this field"
//                                                             )
//                                                         )
//                                                     }
//                                                     onInput={(e) =>
//                                                         e.target.setCustomValidity(
//                                                             ""
//                                                         )
//                                                     }
//                                                     className="form-control"
//                                                     autoComplete="off"
//                                                     placeholder={t(
//                                                         "Enter Arabic Name"
//                                                     )}
//                                                     onChange={(e) =>
//                                                         setAdd({
//                                                             ...add,
//                                                             countryNameA:
//                                                                 e.target.value,
//                                                         })
//                                                     }
//                                                 />
//                                             </div>
//                                         </FormGroup>
//                                         <FormGroup className="col-sm-4">
//                                             <label
//                                                 className="control-label"
//                                                 htmlFor="countryCode"
//                                             >
//                                                 {t("country code")}{" "}
//                                             </label>
//                                             <div className="mb-2">
//                                                 <input
//                                                     type="text"
//                                                     name="countryCode"
//                                                     id="countryCode"
//                                                     required
//                                                     onInvalid={(e) =>
//                                                         e.target.setCustomValidity(
//                                                             t(
//                                                                 "Please fill out this field"
//                                                             )
//                                                         )
//                                                     }
//                                                     onInput={(e) =>
//                                                         e.target.setCustomValidity(
//                                                             ""
//                                                         )
//                                                     }
//                                                     className="form-control"
//                                                     autoComplete="off"
//                                                     placeholder={t(
//                                                         "Enter Country Code"
//                                                     )}
//                                                     onChange={(e) =>
//                                                         setAdd({
//                                                             ...add,
//                                                             countryCode:
//                                                                 e.target.value,
//                                                         })
//                                                     }
//                                                 />
//                                             </div>
//                                         </FormGroup>
//                                     </div>
//                                 </div>
//                                 <FormGroup className="text-center">
//                                     <Button
//                                         className="button btn-info"
//                                         type="submit"
//                                     >
//                                         {t("Add")} +
//                                     </Button>
//                                 </FormGroup>
//                             </Form>
//                         </CardBody>
//                     </Card>
//                 </Modal>

//                 // #endregion
//             }
//         </div>
//     );
// }

import {React,useEffect} from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import ReactTable from "react-table-v6";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {fetchCity_2} from "../../../redux/city_2/Actions";

function City_2() {
    const { t } = useTranslation();
    const dispatch =useDispatch();
    const city_2 = useSelector((state) => state.city_2Reducers.city_2);
 
    console.log(city_2 && city_2)
    
    useEffect(() => {
        dispatch(fetchCity_2());
    }, [dispatch]);

    return (
        <div>
            <Breadcrumbs main="coding" sub="general" subSub="cities_2" />

            <div>
                <ReactTable
                    columns={[
                        {
                            Header: t("city arabic name"),
                            accessor: "cityNameA",
                        },
                        {
                            Header: t("city english name"),
                            accessor: "cityNameE",
                        },

                        {
                            Header: t("city code"),
                            accessor: "cityCode",
                        },
                        {
                            Header: "",
                            accessor: "actions",
                        },
                    ]}
                    data={city_2 && city_2}
                />
            </div>
        </div>
    );
}

export default City_2;
