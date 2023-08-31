import algoliasearch from "algoliasearch";
const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APPLICATION_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
);

export default function getAlgoliaIndex(name) {
  const setUp = async () => {
    const init = await client.initIndex(
      `${process.env.REACT_APP_FUZION_EVENT_ID}_attendee_data`
    );

    return new Promise((resolve) => {
      resolve(init);
    });
  };
  switch (name) {
    case "attendee":
      return setUp();
    case "destroy":
      return client.clearCache();
    default:
      return null;
  }
}
