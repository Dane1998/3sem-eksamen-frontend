import React, { useState } from "react";
import facade from "../apiFacade";


export default function AddContact() {
  const [contact, setContact] = useState({})


  const setContactData = (key) => {
    return (event) => {
      setContact({
        ...contact,
        [key]: event.target.value
      })
    }
  }

  const onSubmit = () => {
    facade.addContact(contact)
    console.log(contact)
  }

  return <div>
    <form>
      <h2>Add new contact</h2>
      <input
        type="text"
        id="name"
        placeholder="name"
        onChange={setContactData("name")} />
      <br />
      <input
        type="email"
        id="email"
        placeholder="email"
        onChange={setContactData("email")}/>
      <br />

      <input
        type="text"
        id="company"
        placeholder="company"
        onChange={setContactData("company")} />
      <br />

      <input
        type="text"
        id="jobtitle"
        placeholder="jobtitle"
        onChange={setContactData("jobtitle")} />
      <br />

      <input
        type="text"
        id="phone"
        placeholder="phone"
        onChange={setContactData("phone")} />
      <br />

      <button onClick={onSubmit} type="submit" className="btn btn-primary">
        Add Contact
            </button>


    </form>
  </div>;
}
