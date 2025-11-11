import React from 'react'
import { Grid } from "@mui/material";
import TransactionsView from './Transactions/TransactionsView'
import SummaryView from './Summary/SummaryView'
import PieCharts from './Charts/PieCharts';
import LineCharts from './Charts/LineCharts';

const Dashboard = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <>
      <div className='userStyle'>
      {loggedInUser ? (<h1 style={{marginTop: 10, marginBottom: 0}}>Welcome, {loggedInUser.Username}!</h1>): ''} 
          </div>  
      <Grid className="App" container spacing={4}>
          <TransactionsView />
          <SummaryView  />
          <PieCharts/>
          <LineCharts/>
      </Grid>
    </>
  )
}

export default Dashboard