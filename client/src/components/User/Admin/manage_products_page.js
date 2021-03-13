import React from 'react'
import UserLayout from '../../../hoc/user'
import ManageBrands from './manage_brands'
import ManageCats from './manage_categories'


const ManageProductsPage = () => {
  return (
    <UserLayout>
      <ManageBrands />
      <ManageCats />
    </UserLayout>
  )
}

export default ManageProductsPage
