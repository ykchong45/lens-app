import { profileId, usePublications } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from './components/PublicationCard';

import { Tabs, Tab, TabList, TabPanels, TabPanel, TabIndicator } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

export function UsePublications({ tag }) {
  const metadataFilter_disease = {
    restrictPublicationLocaleTo: tag
  }

  useEffect(() => {
    console.log("metadataFilter changed: ", metadataFilter_disease)
  }, [metadataFilter_disease])

  const {
    data: publications,
    error,
    loading,
    hasMore,
    observeRef,
  } = useInfiniteScroll(usePublications({
    profileId: profileId('0x770a'),
    metadataFilter: metadataFilter_disease
  }));


  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {publications.map((publication) => (
        <PublicationCard reactable={false} key={publication.id} publication={publication} />
      ))}
      {hasMore && <p ref={observeRef}>Loading more...</p>}
    </div>
  )

}

export function UsePublicationsWrapper() {
  const [tag, setTag] = useState<string>('hi')



  const CATEGORIES = [
    { name: "HIV", tag: "hi" },
    { name: "Depression", tag: "de" },
    { name: "Mania", tag: "mn" }
  ]

  const handleTabChange = (tabIdx) => {
    const selectedTag = CATEGORIES[tabIdx].tag
    console.log("debug tab change ", tabIdx, selectedTag)
    setTag(selectedTag)
  }



  return (
    <div>
      <h1>
        Publications
      </h1>
      <Tabs onChange={handleTabChange}>
        <TabList>
          {CATEGORIES.map((item) => (
            <Tab key={item.tag}>{item.name}</Tab>
          ))}
        </TabList>
      </Tabs>

      <UsePublications tag={tag} />
    </div>
  );
}
