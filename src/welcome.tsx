// 第一个页面, 登录

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Tabs, TabList, TabPanels, Tab, TabPanel
  } from '@chakra-ui/react';

import { useState, useEffect } from 'react';
//   import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { ConnectButton } from '@rainbow-me/rainbowkit';
// //   import { useRouter } from 'next/router';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { LoginButton } from './components/auth/LoginButton';

export default function Index(){
    // const [showPassword, setShowPassword] = useState(false);

    const {address, connector}= useAccount();
    const navigate = useNavigate();
    // const router = useRouter();

    var index_jump_main = 0

    useEffect(() => {
        // console.log("debug useEffect")
        if (index_jump_main==0){
            if (address) {
                index_jump_main = 1
                navigate("/");
            }
        }else{
            index_jump_main = 0
            // console.log("debug rest index_jump_main")
            // 然而没啥用, 先不管了
        }
        // console.log("debug no jump ")
    }, [address]);

    return (
      <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Connect Your Wallet!
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Find your friends On Web3 ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
          <Stack spacing={10} pt={2}>
              <Flex justifyContent="center" alignItems="center">
              {/* <ConnectButton/> */}
              <LoginButton/>
              </Flex>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'} color={'red.400'}>
                We hope you have nice trips here!
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    )
}


