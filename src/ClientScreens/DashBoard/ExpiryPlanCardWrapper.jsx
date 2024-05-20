import React, { useState } from 'react';
import { Card, Button } from 'antd';
import ReactSpeedometer from 'react-d3-speedometer';
import { Box, Text, Flex, Heading } from '@chakra-ui/react';
import styles from './dashboard.module.css';
 
const ExpiryPlanCard = ({ plans }) => {
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
  const currentPlan = plans[currentPlanIndex];
  const maxTotalDays = currentPlan.totalDays;
 
  const handleNextPlan = () => {
    setCurrentPlanIndex((prevIndex) => (prevIndex + 1) % plans.length);
  };
 
  const handlePrevPlan = () => {
    setCurrentPlanIndex((prevIndex) => (prevIndex - 1 + plans.length) % plans.length);
  };
 
  return (
    <Box className={styles.infocard} width="100%" maxWidth="500px" p="4" borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white">
      <strong className={styles.heading} fontSize="18px" fontFamily="sans-serif" fontWeight="bold" textAlign="center" mb="4" marginBottom="30px">
        Days Left to Expire
      </strong>
      <Flex flexDirection="column" alignItems="center">
        <Text fontSize="16px" fontWeight="bold" mb="2">{currentPlan.name}</Text>
        <ReactSpeedometer
          value={currentPlan.daysLeft}
          minValue={0}
          maxValue={maxTotalDays}
          needleColor="blue"
          startColor="red"
          segments={5}
          endColor="green"
          height={200}
          width={300}
        />
      </Flex>
      <Flex justifyContent="center" mt="4">
        <Button onClick={handlePrevPlan} colorScheme="blue" variant="outline" mr="2">
          Previous Plan
        </Button>
        <Button onClick={handleNextPlan} colorScheme="blue">
          Next Plan
        </Button>
      </Flex>
    </Box>
  );
};
 
// Dummy data
const dummyPlans = [
  { name: 'Plan A', daysLeft: 91, totalDays: 180 },
  { name: 'Plan B', daysLeft: 15, totalDays: 90 },
  { name: 'Plan C', daysLeft: 70, totalDays: 365 },
];
 
const ExpiryPlanCardWrapper = () => {
  return <ExpiryPlanCard plans={dummyPlans} />;
};
 
export default ExpiryPlanCardWrapper;