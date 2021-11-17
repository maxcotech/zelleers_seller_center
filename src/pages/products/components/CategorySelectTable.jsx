import PropTypes from "prop-types";
import { CButton, CButtonGroup } from "@coreui/react";
import ProductCategorySelect from "./ProductCategorySelect";
import CircleAvatar from "src/components/CircleAvatar";

const CategorySelectTable = (props) => {
    if (props.categories !== null && props.categories?.length > 0) {
        return (
            <>
                <table className="table condensed">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Icon</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.categories.map((item,index) => {
                                return (
                                    <tr key={index} className="hoverable" >
                                        <td>{index + 1}</td>
                                        <td><CircleAvatar radius={30} src={item.category_icon} /></td>
                                        <td>{item.category_title}</td>
                                        <td>
                                            <CButtonGroup>
                                                <>
                                                    {
                                                        (item.sub_categories !== null && item.sub_categories?.length > 0) ?
                                                            <ProductCategorySelect 
                                                                title="Select Sub-category"
                                                                onSelectItem={(pitem) => {
                                                                    props.onSelectItem(pitem ?? item);
                                                                }} 
                                                                label="View Subs" 
                                                                categories={item.sub_categories} /> : <></>

                                                    }
                                                </>
                                                <>
                                                    {
                                                        (item.category_level > 1) ?
                                                            <CButton onClick={() => props.onSelectItem(item)} color='primary'>Select</CButton> :
                                                            <></>
                                                    }
                                                </>
                                            </CButtonGroup>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </>
        )
    } else {
        return <></>
    }
}

CategorySelectTable.propTypes = {
    categories:PropTypes.array,
    onSelectItem:PropTypes.func,

}

export default CategorySelectTable;