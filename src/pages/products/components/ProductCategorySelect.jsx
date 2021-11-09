import { CButton, CCard, CCardBody } from "@coreui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AppModal from "src/components/AppModal";
import PaginationComponent from "src/components/PaginationComponent";
import Spinner from "src/components/Spinner";
import { fetchCategories } from "src/redux/actions/CategoryActions";
import CategorySelectTable from "./CategorySelectTable";
import PropTypes from "prop-types";

const ProductCategorySelect = (props) => {
    const dispatch = useDispatch();
    const scategory = useSelector(state => state.category);
    const loading = useSelector(state => state.app.loading);
    const [visible,setVisible] = useState(false);

    useEffect(() => {
        if(props.categories === null || typeof props.categories === 'undefined' || props.categories?.length === 0){
            dispatch(fetchCategories())
        }
    },[]);



    return (
        <>
            <AppModal title={props.title ?? "Select Category"} show={visible} onClose={() => setVisible(false)}>
                <CCard>
                    <CCardBody>
                        <div>
                            {
                                (loading === true)?
                                    <div><Spinner status={loading} /> fetching categories...</div>:
                                    <div>
                                        {
                                            (props.categories !== null && props.categories?.length > 0)?
                                                <CategorySelectTable 
                                                    onSelectItem={(item) => {
                                                        setVisible(false);
                                                        props.onSelectItem(item);
                                                    }}
                                                    categories={props.categories} 
                                                />:
                                                <>
                                                    <CategorySelectTable 
                                                        onSelectItem={(item) => {
                                                            setVisible(false);
                                                            props.onSelectItem(item)
                                                        }}
                                                        categories={scategory.categories} 
                                                    />
                                                    <PaginationComponent 
                                                        onClick={(url) => dispatch(fetchCategories(url))}
                                                        links={scategory.links} 
                                                    />
                                                </>
                                        }
                                    </div>
                            }
                        </div>
                    </CCardBody>
                </CCard>
            </AppModal>
            <CButton onClick={() => setVisible(true)} color="info">{props.label ?? "Categories"}</CButton>
        </>
    )
}

ProductCategorySelect.propTypes = {
    onSelectItem:PropTypes.func,
    label:PropTypes.string,
    categories:PropTypes.array

}

export default ProductCategorySelect;