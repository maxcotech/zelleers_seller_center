import {Pagination,PaginationLink,PaginationItem} from "reactstrap";


const PaginationComponent = (props) => {
    const {links,onClick} = props;

    if(links.length){
        return (
            <Pagination>
                {
                    links.map((item,index) => 
                        <PaginationItem
                            key={index}
                            active={item.active}
                            disabled={item.url === null? true:false}>
                                <PaginationLink 
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClick(item.url)}}
                                href="#">
                                <span dangerouslySetInnerHTML={{__html:item.label}} />
                                </PaginationLink>
                            
                        </PaginationItem>
                    )
                }
            </Pagination>
        )
    } else {
        return <></>
    }
}

export default PaginationComponent;