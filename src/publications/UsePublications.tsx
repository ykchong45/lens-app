import { profileId, usePublications } from '@lens-protocol/react-web';

import { ErrorMessage } from '../components/error/ErrorMessage';
import { Loading } from '../components/loading/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { PublicationCard } from './components/PublicationCard';

export function UsePublications() {

  var metadataFilter_disease = {
    restrictPublicationLocaleTo: 'en'
  }

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

  console.log("debug error", error)
  console.log("debug loading", loading)
  console.log("debug hasMore", hasMore)
  console.log("debug observeRef", observeRef)
  console.log('debug publication', publications)


  if (loading) return <Loading />;

  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1>
        <code>usePublications</code>
      </h1>
      <div>
        {publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))}
        {hasMore && <p ref={observeRef}>Loading more...</p>}
      </div>
    </div>
  );
}
