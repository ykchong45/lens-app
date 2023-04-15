import { useCreateProfile, useProfilesOwnedByMe } from '@lens-protocol/react-web';
import React, { useState } from "react";

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth/WhenLoggedInWithProfile';
import { never } from '../utils';
import { ProfileCard } from './components/ProfileCard';

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Input,
  Button,
  ButtonProps,
  Image
} from '@chakra-ui/react';


function FileLoader() {
  const [selectedFile, setSelectedFile] = useState<Blob | undefined>();

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedFile(event.target?.files?.[0]);
  }

  function handleLoad() {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = function (event) {
        console.log(event.target?.result); // do something with the loaded file
      };
      reader.readAsText(selectedFile);
    }
  }

  return (

    <div>
      <input type="file" accept=".pdf,image/*" onChange={handleFile} />
      <button onClick={handleLoad} disabled={!selectedFile}>
      </button>
    </div>

  );
}

function OwnedProfiles() {
  const { data } = useProfilesOwnedByMe();

  return (
    <div>
      <Center><Heading>Owned Profiles</Heading></Center>
      <Center>
      <Stack spacing={8} direction='row'>
      {data
        ?.slice()
        .reverse()
        .map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </Stack>
      </Center>
    </div>

  );
}

export function CreateProfileForm() {
  const { execute: create, error, isPending } = useCreateProfile();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);
    const handle = (formData.get('handle') as string) ?? never();

    await create({ handle });

    form.reset();
  };

  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
          h={'full'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit={'cover'}
        />
        </Box>
        <Stack>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}>
            create
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            Create New Profile
          </Heading>
          <Text color={'gray.500'}>
            Choose a file for New Profile( only for IMG or PDF)
          </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          {/* <Avatar
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
          // alt={'Author'}
          /> */}
          <div>
            <form onSubmit={onSubmit}>
              <fieldset>
                <FileLoader />
                <label>
                  Enter a profile handle:
                  <br />
                  <Input
                    name="handle"
                    minLength={5}
                    maxLength={31}
                    required
                    type="text"
                    disabled={isPending}
                  />
                </label>
                <Button
        /* flex={1} */
        px={4}
        fontSize={'sm'}
        rounded={'full'}
        bg={'blue.400'}
        color={'white'}
        boxShadow={
          '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
        }
        _hover={{
          bg: 'blue.500',
        }}
        _focus={{
          bg: 'blue.500',
        }}>
                <button type="submit" disabled={isPending}>
                  {isPending ? 'Creating...' : 'Create profile'}
                </button>
      </Button>
              </fieldset>

              {error && <p>{error.message}</p>}
            </form>
          </div>
        </Stack>
      </Box>
    </Center>
  );
}

function Middle_box(){

  return (
    <Box>
    <OwnedProfiles />
    </Box>
  )
}


export function UseCreateProfile() {
  return (
    <div>
      <WhenLoggedInWithProfile>{() => <CreateProfileForm />}</WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="Log in to create new profiles" />
      <Middle_box/>
    </div>
  );
}
