import React from 'react'
import CIcon from '@coreui/icons-react'
import { orderStatuses } from 'src/config/app_config/order_config'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'success',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Products',
    route: '/product',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Create Product',
        to: '/product/create',
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'View Products',
        to: '/products',
        badge: {
          text:"NEW",
          color:"success"
        }
      }
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Store Orders',
    route: '/orders',
    icon: 'cil-basket',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Awaiting fulfillment',
        to: `/orders/${orderStatuses.AWAITING_FULFILLMENT}`,
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Awaiting Shipping',
        to: `/orders/${orderStatuses.AWAITING_SHIPPING}`,
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Partially Shipped',
        to: `/orders/${orderStatuses.PARTIALLY_SHIPPED}`,
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Shipped Orders',
        to: `/orders/${orderStatuses.SHIPPED}`,
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Awaiting Pickup',
        to: `/orders/${orderStatuses.AWAITING_PICKUP}`,
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Completed Orders',
        to: `/orders/${orderStatuses.COMPLETED}`,
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Cancelled Orders',
        to: `/orders/${orderStatuses.CANCELLED}`,
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Disputed Orders',
        to: `/orders/${orderStatuses.DISPUTED}`,
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Awaiting Refund',
        to: `/orders/${orderStatuses.AWAITING_REFUND}`,
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Refunded',
        to: `/orders/${orderStatuses.REFUNDED}`,
        badge: {
          text:"NEW",
          color:"success"
        }
      }

      
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Store Settings',
    route: '/store',
    icon: 'cil-settings',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Create Store',
        to: '/store/create',
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Join Store',
        to: '/store/join',
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag:'CSidebarNavItem',
        name: 'Store Staffs',
        to: '/store/staffs',
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag:'CSidebarNavItem',
        name: 'Store Staff Tokens',
        to: '/store/staff-tokens',
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag:'CSidebarNavItem',
        name: 'Select Store',
        to: '/store/select',
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag:'CSidebarNavItem',
        name: 'Edit Store',
        to: '/store/update',
        badge: {
          text:"NEW",
          color:"success"
        }
      }
    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Manage Shipping',
    route: '/store',
    icon: 'cil-settings',
    _children: [
      {
        _tag:'CSidebarNavItem',
        name: 'Shipping Groups',
        to: '/shipping/groups',
        badge: {
          text:"NEW",
          color:"success"
        }
      },
      {
        _tag:'CSidebarNavItem',
        name: 'Payments',
        to: '/payment/init',
        badge: {
          text:"NEW",
          color:"success"
        }
      }

    ]
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Store Fund',
    route: '/funds',
    icon: 'cil-calculator',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Store Wallet',
        to: '/funds/wallet',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Bank Accounts',
        to: '/funds/bank-accounts',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Withdrawal Request',
        to: '/funds/request-withdrawal',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Logout',
    to: '/logout',
    icon: <CIcon name="cil-user-unfollow" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'success',
      text: 'NEW',
    }
  },
  



















  {
    _tag: 'CSidebarNavTitle',
    _children: ['Theme']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Colors',
    to: '/theme/colors',
    icon: 'cil-drop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Typography',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Base',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Cards',
        to: '/base/cards',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Forms',
        to: '/base/forms',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Jumbotron',
        to: '/base/jumbotrons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Navs',
        to: '/base/navs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Navbars',
        to: '/base/navbars',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Progress',
        to: '/base/progress-bar',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Switches',
        to: '/base/switches',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tables',
        to: '/base/tables',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tabs',
        to: '/base/tabs',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Buttons',
    route: '/buttons',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Brand buttons',
        to: '/buttons/brand-buttons',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Dropdowns',
        to: '/buttons/button-dropdowns',
      }
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Charts',
    to: '/charts',
    icon: 'cil-chart-pie'
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Icons',
    route: '/icons',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Notifications',
    route: '/notifications',
    icon: 'cil-bell',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Toaster',
        to: '/notifications/toaster'
      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Widgets',
    to: '/widgets',
    icon: 'cil-calculator',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _tag: 'CSidebarNavDivider'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Extras'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Pages',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Login',
        to: '/login',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Register',
        to: '/register',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 404',
        to: '/404',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Disabled',
    icon: 'cil-ban',
    badge: {
      color: 'secondary',
      text: 'NEW',
    },
    addLinkClass: 'c-disabled',
    'disabled': true
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Labels']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label danger',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-danger'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label info',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-info'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Label warning',
    to: '',
    icon: {
      name: 'cil-star',
      className: 'text-warning'
    },
    label: true
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
