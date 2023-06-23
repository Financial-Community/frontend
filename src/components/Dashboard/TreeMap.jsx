import {
  Button,
  Modal, ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import Chart from "react-apexcharts";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";

export function TreeMap() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const {user} = useAuth();
  const [sData, setSdata] = useState([]);
  const [tickerName, setTickerName] = useState("");


  // linechart
  const [sDataLine, setSDataLine] = useState([]);

  const seriesTree = {
    data: sData,
  };

  const seriesline = {
    data: sDataLine,
  };


  useEffect(() => {
    const getvaluedata = async () => {
      const newvalue = [];
      const reqData = await fetch(`https://depot-ij6sqfx7va-uc.a.run.app/depot/${user?.id}`);
      const resData = await reqData.json();
      for (let i = 0; i < resData.length; i++) {
        newvalue.push({
          x: resData[i].stockTicker,
          y: resData[i].priceCurrent * resData[i].amountCurrent,
        });
      }
      setSdata(newvalue);
    };
    getvaluedata();
  }, [user]);


  useEffect(() => {
    const lineChartData = [];

    if(tickerName === "") return;
    const getvaluedata = async () => {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${tickerName}&apikey=${process.env.REACT_APP_AV_KEY}`;
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
    };
    getvaluedata();

  }, [ tickerName]);

  return (
    <>
      <Chart
        align={"center"}
        type="treemap"
        width={"90%"}
        height={600}
        series={[seriesTree]}
        options={{
          chart: {
            type: "area",
            events: {
              click: function (event, chartContext, config) {
                if(event.target.tagName === "rect"){
                  let name =
                    config.config.series[config.seriesIndex].data[
                      config.dataPointIndex
                      ];
                  setTickerName(name.x);
                  onOpen();
                }
              },
            },
          },
        }}
      />

      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay/>
        <ModalContent backgroundColor={"gray.600"}>
          <ModalHeader>{tickerName}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
          </ModalBody>
          <Chart
            type="line"
            width={"100%"}
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
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

