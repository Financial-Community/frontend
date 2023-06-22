import React, { useState} from 'react';
import {Box, Button, Heading, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import "../style/style.css";
import {useForm} from "react-hook-form";
import {TreeMap} from "../components/TreeMap";

function Dashboard() {

  const {register, handleSubmit} = useForm();

  const lineChartData = [];
  // linechart
  const [sDataLine, setSDataLine] = useState([]);

  const seriesline = {
    data: sDataLine,
  };

  async function useGraph(data) {
    console.log(data.ticker);
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${data.ticker}&apikey=${process.env.REACT_APP_AV_KEY}`;
    console.log(url);
    const reqData = await fetch(url);
    const resData = await reqData.json();
    console.log(resData["Time Series (Daily)"]);
    for (const [key, value] of Object.entries(resData["Time Series (Daily)"])) {
      lineChartData.push({
        x: key,
        y: value["4. close"],
      });
    }
    const reverseLineChartData = lineChartData.reverse();
    setSDataLine(reverseLineChartData);
  }





  return (
    <>
      <Box
        p={4}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>
        <Heading>TreeMap Block</Heading>
        <Box justifyContent={"center"}>
          <TreeMap/>
        </Box>
      </Box>
      <Box
        p={4}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>
        <Heading>Search by ticker</Heading>
        <Box className="Linechart">
          <form onSubmit={handleSubmit(useGraph)}>
            <InputGroup
              mb={7} mt={5} justifyContent={"center"}>
              <Input

                width={"50%"}
                color={"black"}
                placeholder="Enter Ticker Symbol (AAPL, MSFT, etc.)"
                type="text"
                {...register("ticker")}
              />
              <InputRightAddon>
                <Button type={"submit"}>Go</Button>
              </InputRightAddon>
            </InputGroup>
          </form>
          <Chart
            align={"center"}
            type="line"
            width={"90%"}
            height={400}
            series={[seriesline]}
            options={{
              yaxis: {
                labels: {
                  style: {
                    colors: 'white',
                  }
                }
              },
              xaxis: {
                labels: {
                  style: {
                    colors: 'white',
                  }
                }
              }
            }}
          />

        </Box>
      </Box>

      <Box
        p={4}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>
        <Heading>News Block</Heading>

      </Box>
    </>
  );
}

export default Dashboard;
