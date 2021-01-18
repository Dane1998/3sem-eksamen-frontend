import React, { useEffect, useState } from "react";
import facade from "../apiFacade";

export default function ViewContact() {
    const [showContact, setShowContact] = useState([])
    const [array, setArray] = useState([]);

    useEffect(() => {
        facade.fetchContacts(setArray)
    }, [])


    return (
    <div>
        <h2>View Contact</h2>

        <ul>
            {array.map(contact => {
                return (
                    <ul key={contact.id}>
                        <p>Id: {contact.id}</p>
                        <p>Name: {contact.name}</p>
                        <p>Email: {contact.email}</p>
                        <p>Company: {contact.company}</p>
                        <p>JobTitle: {contact.jobtitle}</p>
                        <p>Phone: {contact.phone}</p>
                        <br/>
                    </ul>
                )
            })}
        </ul>

    </div>
    )
}
