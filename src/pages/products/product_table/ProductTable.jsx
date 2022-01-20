import { useEffect, useState } from "react";
import { resourceStatus } from "src/config/helpers/resource_helpers";
import { CAlert, CButton, CButtonGroup, CCard, CCardBody, CCardHeader, CRow, CCol } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "src/redux/actions/ProductActions";
import Spinner from "src/components/Spinner";
import PaginationComponent from "src/components/PaginationComponent";
import CircleAvatar from "src/components/CircleAvatar";
import UpdateProductBtn from "./components/UpdateProductBtn";
import LoadingBtn from "src/components/LoadingBtn";
import { confirmAction } from "src/config/helpers/message_helpers";

const ProductTable = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.app.loading);
    const {currency_sym} = useSelector(state => state.auth.currency);
    const { links, products,current_link } = useSelector(state => state.product);
    const [filters, setFilters] = useState({
        status: resourceStatus.active,
    })

    const setFilterValue = (value, key) => {
        setFilters({
            ...filters,
            [key]: value
        })
    }

    const onStatusChange = (e) => {
        setFilterValue(e.target.value, "status");
        dispatch(fetchProducts(current_link, { ...filters, status: e.target.value }));
    }

    const onDeleteProduct = async (data, iloading, onComplete) => {
        const confirm = await confirmAction({ text: "You may not be able to retrieve this product data after you delete it." });
        if (confirm) {
            dispatch(deleteProduct(data, iloading, onComplete))
        }
    }
    const onPaginateClick = (url) => {
        dispatch(fetchProducts(url,filters))
    }

    useEffect(() => {
        dispatch(fetchProducts(current_link, filters));
    }, []);

    const resourceStatusKeys = Object.keys(resourceStatus);
    return (
        <>
            <CCard>
                <CCardHeader>
                    <h4 style={{ display: "inline-block" }}><Spinner status={loading} /> Products</h4>
                    <div style={{ display: "inline-block" }} className="card-header-actions">
                        <CRow>
                            <CCol>
                                <select className="capitalize" style={{ display: "inline-block" }} onChange={onStatusChange} value={filters.status} className="form-control">
                                    {
                                        resourceStatusKeys.map((key) => {
                                            return <option value={resourceStatus[key]}>{key + " products"}</option>
                                        })
                                    }
                                </select>
                            </CCol>
                            <CCol>
                                <CButtonGroup>
                                    <CButton onClick={()=>dispatch(fetchProducts(current_link,filters))} color="success">
                                        Refresh
                                    </CButton>
                                    <CButton color="info">
                                        More Filters
                                    </CButton>
                                </CButtonGroup>
                            </CCol>
                        </CRow>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {
                        (products.length > 0) ?
                            <>
                                <div className="table-responsive">
                                    <table className="table condensed">
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>Product Image</th>
                                                <th>Product Name</th>
                                                <th>Product Slug</th>
                                                <th>Product Sku</th>
                                                <th>Regular Price</th>
                                                <th>Sales Price</th>
                                                <th>Amount In Stock</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.map((item, index) => {
                                                    return (
                                                        <tr key={item.id}>
                                                            <td>{index + 1}</td>
                                                            <td><CircleAvatar borderRadius={"5px"} radius={"50px"} src={item.product_image} /></td>
                                                            <td>{item.product_name ?? "N/A"}</td>
                                                            <td>{item.product_slug ?? "N/A"}</td>
                                                            <td>{item.product_sku ?? "N/A"}</td>
                                                            <td><span dangerouslySetInnerHTML={{__html:currency_sym}} />{item.regular_price ?? "N/A"}</td>
                                                            <td><span dangerouslySetInnerHTML={{__html:currency_sym}} />{item.sales_price ?? "N/A"}</td>
                                                            <td>{item.amount_in_stock ?? "N/A"}</td>
                                                            <td>
                                                                <CButtonGroup>
                                                                    <UpdateProductBtn product_slug={item.product_slug ?? item.id} />
                                                                    <LoadingBtn
                                                                        onClick={onDeleteProduct}
                                                                        data={item.id}
                                                                        color="danger"
                                                                        onComplete={() => dispatch(fetchProducts(current_link, filters))}
                                                                    >
                                                                        Delete
                                                                    </LoadingBtn>
                                                                </CButtonGroup>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <PaginationComponent links={links} onClick={onPaginateClick} />
                            </> :
                            <CAlert color="info">
                                <h3>No Product Found</h3>
                                <p>Could not find any product under the current status and filter settings.</p>
                            </CAlert>

                    }
                </CCardBody>
            </CCard>
        </>
    )
}

export default ProductTable;