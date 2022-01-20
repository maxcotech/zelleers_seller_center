import { CRow, CCol, CWidgetProgressIcon, CWidgetIcon, CCard, CCardHeader, CCardBody } from "@coreui/react";
import { CIcon } from '@coreui/icons-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDashboardData, defaultDashboardUrl } from './../../redux/actions/DashboardActions';
import { useSelector } from 'react-redux';
import Money from "src/components/Money";
import CompletedOrders from "./components/CompletedOrders";
import PaginationComponent from './../../components/PaginationComponent';


const Dashboard = () => {
    const dispatch = useDispatch();
    const { id } = useSelector(state => state.store.current_store);
    const { stock_data, total_completed_orders, revenues, links } = useSelector(state => state.dashboard);
    const onPaginationClick = (url) => {
        dispatch(fetchDashboardData(url,{ store_id: id}))
    }
    useEffect(() => {
        dispatch(fetchDashboardData(defaultDashboardUrl, { store_id: id }))
    }, []);

    return (
        <>
            <div>
                <CRow>
                    <CCol  xs="12" sm="6" lg="3">
                        <CWidgetProgressIcon
                            header={<span><Money noSymbol={true}>{total_completed_orders ?? 0}</Money> Order(s)</span>}
                            text="Completed Orders"
                            color="gradient-warning"
                            inverse
                        >
                            <CIcon name="cil-basket" height="36" />
                        </CWidgetProgressIcon>
                    </CCol>
                    <CCol  xs="12" sm="6" lg="3">
                        <CWidgetProgressIcon
                            header={<span><Money noSymbol={true}>{stock_data.stock_quantity}</Money> In Stocks</span>}
                            text="Stock Quantity"
                            color="gradient-success"
                            inverse
                        >
                            <CIcon name="cil-puzzle" height="36" />
                        </CWidgetProgressIcon>
                    </CCol>
                    <CCol  xs="12" sm="6" lg="3">
                        <CWidgetProgressIcon
                            header={<Money>{stock_data.stock_value}</Money>}
                            text="Stock Value"
                            color="gradient-danger"
                            inverse
                        >
                            <CIcon name="cil-calculator" height="36" />
                        </CWidgetProgressIcon>
                    </CCol>
                    <CCol  xs="12" sm="6" lg="3">
                        <CWidgetProgressIcon
                            header={<span><Money noSymbol={true}>{stock_data.stock_quantity}</Money> Product(s)</span>}
                            text="Total Products"
                            color="gradient-info"
                            inverse
                        >
                            <CIcon name="cil-puzzle" height="36" />
                        </CWidgetProgressIcon>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs="12" sm="6" lg="3">
                        <CWidgetIcon text="Daily Income" header={<Money>{revenues.daily_revenue}</Money>} color="gradient-warning" iconPadding={false}>
                            <CIcon width={24} name="cil-chart-pie" />
                        </CWidgetIcon>
                    </CCol>
                    <CCol xs="12" sm="6" lg="3">
                        <CWidgetIcon text="Monthly Income" header={<Money>{revenues.monthly_revenue}</Money>} color="gradient-success" iconPadding={false}>
                            <CIcon width={24} name="cil-chart-pie" />
                        </CWidgetIcon>
                    </CCol>
                    <CCol xs="12" sm="6" lg="3">
                        <CWidgetIcon text="Yearly Income" header={<Money>{revenues.yearly_revenue}</Money>} color="gradient-danger" iconPadding={false}>
                            <CIcon width={24} name="cil-chart-pie" />
                        </CWidgetIcon>
                    </CCol>
                    <CCol xs="12" sm="6" lg="3">
                        <CWidgetIcon text="All Time Income" header={<Money>{revenues.all_time_revenue}</Money>} color="gradient-info" iconPadding={false}>
                            <CIcon width={24} name="cil-chart-pie" />
                        </CWidgetIcon>
                    </CCol>
                </CRow>
                <CCard>
                    <CCardHeader>
                        <h4>Completed Orders</h4>
                    </CCardHeader>
                    <CCardBody>
                        <CompletedOrders />
                        <div>
                            <PaginationComponent links={links} onClick={onPaginationClick} />
                        </div>
                    </CCardBody>
                </CCard>
            </div>
        </>
    )
}

export default Dashboard;