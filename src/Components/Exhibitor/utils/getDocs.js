export default function getDocuments(data) {
  if (data && data.custom_attributes?.custom_fields?.Documents.length > 0) {
    return data.custom_attributes?.custom_fields?.Documents.map((doc) => {
      return doc;
    });
  }
  return null;
}
