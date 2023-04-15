import { useCreateProfile, useProfilesOwnedByMe } from '@lens-protocol/react-web';
import React, { useState } from "react";

import { UnauthenticatedFallback } from '../components/UnauthenticatedFallback';
import { WhenLoggedInWithProfile } from '../components/auth/WhenLoggedInWithProfile';
import { never } from '../utils';
import { ProfileCard } from './components/ProfileCard';


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
        Load File
      </button>
    </div>
  );
}

function OwnedProfiles() {
  const { data } = useProfilesOwnedByMe();

  return (
    <div>
      <h3>Owned Profiles</h3>

      {data
        ?.slice()
        .reverse()
        .map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
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
    <div>
      <form onSubmit={onSubmit}>
        <fieldset>
          <FileLoader/>
          <label>
            Enter a profile handle:
            <br />
            <input
              name="handle"
              minLength={5}
              maxLength={31}
              required
              type="text"
              disabled={isPending}
            />
          </label>

          <button type="submit" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create profile'}
          </button>
        </fieldset>

        {error && <p>{error.message}</p>}
      </form>

      <OwnedProfiles />
    </div>
  );
}

export function UseCreateProfile() {
  return (
    <div>
      <h1>
        <code>useCreateProfile</code>
      </h1>
      <WhenLoggedInWithProfile>{() => <CreateProfileForm />}</WhenLoggedInWithProfile>
      <UnauthenticatedFallback message="Log in to create new profiles" />
    </div>
  );
}
