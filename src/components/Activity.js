import React from 'react'
import FinalSideNav from './FinalSideNav'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';

function Activity() {
    const options = {
        chart:{
            type:"column"
        },
        title: {
          text: "Statistics for 2025",
        },
        xAxis: {
          categories: ["Orders", "Products", "Sales"],
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
          {
            name: "Data",
            data: [100, 43, 21],
          },
        ],
      };

      const options2 = {
        chart:{
            type:"pie"
        },
        title: {
          text: "Statistics for 2025",
        },
        xAxis: {
          categories: ["Orders", "Products", "Sales"],
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
          {
            name: "Data",
            data: [ {
                name: 'Orders',
                y: 55.02
            },
            {
                name: 'Products',
                sliced: true,
                selected: true,
                y: 26.71
            },
            {
                name: 'Sales',
                y: 1.09
            },],
          },
        ],
      };

      const options3 = {
       
        title: {
          text: "Statistics for 2025",
        },
        xAxis: {
          categories: ["Orders", "Products", "Sales"],
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
          {
            name: "Data",
            data: [100, 43, 21],
          },
        ],
      };
    
  return (
   <>
   <FinalSideNav />
   {/* <Grid>
   <HighchartsReact highcharts={Highcharts} options={options} />
   </Grid> */}

   <Grid container spacing={2}>
   
        <Grid size={4} sx={{mt:3}}>
        <Paper elevation={3} >
        <HighchartsReact highcharts={Highcharts} options={options} />
        </Paper>
        </Grid>
   
        <Grid size={4} sx={{mt:3}}>
            <Paper elevation={3} >
            <HighchartsReact highcharts={Highcharts} options={options2} />
            </Paper>
        </Grid>
        <Grid size={4} sx={{mt:3}}>
            <Paper elevation={3} >
            <HighchartsReact highcharts={Highcharts} options={options3} />
            </Paper>

        </Grid>
    </Grid>

   </>
  )
}

export default Activity
