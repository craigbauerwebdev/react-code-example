import * as _ from "lodash";

export default function getContacts(data) {
  const checkEmail = (email) => {
    if (email) {
      return email.toLowerCase() !== "test@test.com";
    }

    return true;
  };

  if (data?.contacts) {
    return _.sortBy(
      data.contacts
        .filter((ex) => ex.contact_type === "Representative contact")
        .filter((contact) => checkEmail(contact.email))
        .filter((contact) => checkEmail(contact.email_two)),
      "snapchat_account"
    );
  }

  return false;
}
