import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

import { setSideBarStatus } from 'src/redux/actions/AppActions'
import SelectCurrencyInput from 'src/components/SelectCurrencyInput'
import { orderStatuses } from 'src/config/app_config/order_config'
import ExpandableImage from 'src/components/ExpandableImage'
import { getUserTypeText } from 'src/config/app_config/user_config'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.app.sidebar)
  const {first_name,last_name,user_type} = useSelector(state => state.auth.user);
  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch(setSideBarStatus(val))
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch(setSideBarStatus(val))
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
      <h3><span className="text-success">COZELLER</span>VENDOR</h3> {/*<CIcon name="logo" height="48" alt="Logo"/>*/}
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to={`/orders/${orderStatuses.AWAITING_FULFILLMENT}`}>Manage Orders</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/product/create">Create Product</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">
            
            <span style={{textTransform:"capitalize",fontSize:"1.2em"}}>{first_name} {last_name} </span><pre>  </pre><div> ({getUserTypeText(user_type)})</div></CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem>
          <ExpandableImage borderRadius="50%" width="auto" height="40px" title="Avatar" src="images/avatar.jpg" />
        </CHeaderNavItem>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          <div className="c-subheader-nav">
            <SelectCurrencyInput />
          </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
