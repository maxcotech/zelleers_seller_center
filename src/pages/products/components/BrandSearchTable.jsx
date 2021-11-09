import CircleAvatar from "src/components/CircleAvatar";

const { CCard, CCardBody } = require("@coreui/react")

const BrandSearchTable = (props) => {

    return (
        <>
            {
                props.list.length > 0 ?
                    <CCard>
                        <CCardBody>
                            <table className="table condensed">
                                {
                                    props.list.map((item) => {
                                        return (
                                            <tr 
                                                className="hoverable"
                                                onClick={() => props.onSelectBrand(item)}
                                            >
                                                <td>
                                                    <CircleAvatar radius={50} src={item.brand_logo} />
                                                </td> 
                                                <td>
                                                    {item.brand_name}
                                                </td>
                                                <td>
                                                    <small>{item.website_url ?? "No website"}</small>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            </table>
                        </CCardBody>
                    </CCard> :
                    <></>
        }

        </>
    )
}

export default BrandSearchTable;