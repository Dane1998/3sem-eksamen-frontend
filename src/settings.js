function URL() {
  return {
    server: "https://dgpcoding.com/startcode",
    newContact: "/api/contact",
    allContacts: "/api/contact/allContacts",
    deleteContact: "/api/contact/remove/",
    searchContact: "/api/contact/getContactById/",
    updateContact: "/api/contact/update/",


  };
}
const url = URL();
export default url;
