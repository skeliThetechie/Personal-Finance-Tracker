import React from 'react'
import TransactionsView from './Transactions/TransactionsView'
import SummaryView from './Summary/SummaryView'

const Dashboard = ({loggedInUser}) => {
  return (
    <>
      {loggedInUser ? (<h1>Welcome, {loggedInUser.Username}!</h1>): ''}
      <TransactionsView />
      <SummaryView  />
    </>
  )
}

export default Dashboard