import isValidUrl from "./isValidURL";

export default function getVideos(data) {
  if (data) {
    const { custom_attributes } = data;
    const { custom_fields } = custom_attributes;
    const { Video } = custom_fields;

    return (
      Video &&
      Video.map((video) => {
        if (isValidUrl(video.url)) {
          return video;
        }
        return null;
      }).filter(Boolean)
    );
  }

  return [];
}
