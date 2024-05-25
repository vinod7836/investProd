// import React, { useEffect, useState } from 'react';
// import { Box, Text, Center, Spinner } from '@chakra-ui/react';
// import axios from 'axios';
// const RedirectPage = () => {
//     const [investmentTip, setInvestmentTip] = useState('');
//     const [loading, setLoading] = useState(true);
//     useEffect(() => {
//         // Fetch the investment tip from the backend
//         const fetchInvestmentTip = async () => {
//             try {
//                 const response = await axios.get('/get-investment-tip');
//                 setInvestmentTip(response.data.tip);
//             } catch (error) {
//                 console.error('Error fetching investment tip:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchInvestmentTip();
//         // Redirect after 3 seconds
//         const timer = setTimeout(() => {
//             window.location.href = 'https://invest-public.azurewebsites.net/';
//         }, 10000);
//         // Cleanup timer if the component is unmounted
//         return () => {
//             clearTimeout(timer);
//         };
//     }, []);
//     return (
//         <Center height="100vh" flexDirection="column" bg="gray.100">
//             <Text mb="4" fontWeight="bold" color="blue" fontSize="100px" fontFamily="sans-serif" marginTop="20px">
//                 Welcome to INVEST
//             </Text>
//             <Text mb="4" color="gray.600" fontSize="50px" fontFamily="sans-serif">
//                 Wait a while
//             </Text>
//             <Box display="flex" alignItems="center" mb="4">
//                 <Spinner size="4xl" color="teal.500" mr="4" />
//                 <Text color="gray.600" textAlign="center" fontFamily="sans-serif">
//                     Redirecting to the website
//                 </Text>
//             </Box>
//             <Box>
//                 <img
//                     src="/images/AnimationRP.gif"
//                     alt="Loading GIF"
//                     style={{ width: '400px', height: '200px' }}
//                 />
//             </Box>
//             {!loading && investmentTip && (
//                 <Box mt="4" p="4" bg="white" borderRadius="md" boxShadow="md">
//                     <Text fontSize="xl" fontWeight="bold" color="teal.700">
//                         Investment Tip
//                     </Text>
//                     <Text color="gray.600">{investmentTip}</Text>
//                 </Box>
//             )}
//         </Center>
//     );
// };
// export default RedirectPage;

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Text, Center, Spinner } from '@chakra-ui/react';
import axios from 'axios';

const RedirectPage = () => {
    const [investmentTip, setInvestmentTip] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const newUser = params.get('newUser') === 'true';
        const fact = params.get('fact');
        const wlcmMSG = params.get('wlcmMSG');
        const usersJourney = params.get('usersJourney');

        if (token) {
            localStorage.setItem('jwtToken', token);

            if (newUser) {
                // Optional: Store additional information if needed
                localStorage.setItem('fact', fact);
                localStorage.setItem('wlcmMSG', wlcmMSG);
                localStorage.setItem('usersJourney', usersJourney);
            }

            // Redirect after 10 seconds based on user type
            const timer = setTimeout(() => {
                if (newUser) {
                    navigate('/client_registration_form');
                } else {
                    navigate('/Client_landing');
                }
            }, 10000);

            // Cleanup timer if the component is unmounted
            return () => {
                clearTimeout(timer);
            };
        } else {
            // Handle the error or redirect to an error page
            navigate('/error');
        }
    }, [location, navigate]);

    useEffect(() => {
        // Fetch the investment tip from the backend
        const fetchInvestmentTip = async () => {
            try {
                const response = await axios.get('/get-investment-tip');
                setInvestmentTip(response.data.tip);
            } catch (error) {
                console.error('Error fetching investment tip:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvestmentTip();
    }, []);

    return (
        <Center height="100vh" flexDirection="column" bg="gray.100">
            <Text mb="4" fontWeight="bold" color="blue" fontSize="100px" fontFamily="sans-serif" marginTop="20px">
                Welcome to INVEST
            </Text>
            <Text mb="4" color="gray.600" fontSize="50px" fontFamily="sans-serif">
                Wait a while
            </Text>
            <Box display="flex" alignItems="center" mb="4">
                <Spinner size="4xl" color="teal.500" mr="4" />
                <Text color="gray.600" textAlign="center" fontFamily="sans-serif">
                    Redirecting to the website
                </Text>
            </Box>
            <Box>
                <img
                    src="/images/AnimationRP.gif"
                    alt="Loading GIF"
                    style={{ width: '400px', height: '200px' }}
                />
            </Box>
            {!loading && investmentTip && (
                <Box mt="4" p="4" bg="white" borderRadius="md" boxShadow="md">
                    <Text fontSize="xl" fontWeight="bold" color="teal.700">
                        Investment Tip
                    </Text>
                    <Text color="gray.600">{investmentTip}</Text>
                </Box>
            )}
        </Center>
    );
};

export default RedirectPage;
