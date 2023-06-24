import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Heading, Input, InputGroup, InputRightAddon, SimpleGrid} from "@chakra-ui/react";
import Chart from "react-apexcharts";
import "../style/style.css";
import {useForm} from "react-hook-form";
import {TreeMap} from "../components/Dashboard/TreeMap";
import {News} from "../components/Dashboard/News";
import axios from "axios";
import {useAuth} from "../context/AuthContext";

function Dashboard() {
  const {user} = useAuth();
  const {register, handleSubmit} = useForm();

  const [news, setNews] = useState([]);

  const cachedNewsData = useRef(null);

  const lineChartData = [];
  // linechart
  const [sDataLine, setSDataLine] = useState([]);
  const seriesline = {
    data: sDataLine,
  };

  async function useGraph(data) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${data.ticker}&apikey=${process.env.REACT_APP_AV_KEY}`;
    const reqData = await fetch(url);
    const resData = await reqData.json();
    for (const [key, value] of Object.entries(resData["Time Series (Daily)"])) {
      lineChartData.push({
        x: key,
        y: value["4. close"],
      });
    }
    const reverseLineChartData = lineChartData.reverse();
    setSDataLine(reverseLineChartData);
  }


  function getData() {
    if (user && user.id) {
      const id = user.id;
      axios.put(`https://depot-ij6sqfx7va-uc.a.run.app/depot/update`, {
        "userId": id,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }
  }


  useEffect(() => {
    const getNews = () => {
      fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${process.env.REACT_APP_AV_KEY}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log("new Data")
          cachedNewsData.current = data.feed
          setNews(cachedNewsData.current);
        })
    }

    if (cachedNewsData.current !== null) {
      // use cached data
      setNews(cachedNewsData.current);
      console.log(news);
    } else {
      // fetch new data
      getNews();
    }
  }, []);

  return (
    <>
      <Box
        p={4}
        m={3}
        borderRadius={'10px'}
        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
        fontSize={"19px"} textAlign={"center"} color={"white"}>
        <Heading>TreeMap Block</Heading>
        <Button onClick={getData}>Get Data</Button>
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
                name={"ticker"}
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
        <SimpleGrid columns={[1, 2]} justifyItems={"center"} gap={3}>
          {
            news.map((n) => {
              return (
                <News text={n.summary} image={n.banner_image} headline={n.title} url={n.url}/>
              )
            })
          }
        </SimpleGrid>
      </Box>
    </>
  );
}

export default Dashboard;
