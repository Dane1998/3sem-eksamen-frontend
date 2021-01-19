import React, { useEffect, useState } from "react";
import facade from "../apiFacade";

export default function ContactSearch() {
    const [searchId, setSearchId] = useState("")
    const [deleteId, setDeleteId] = useState("")
    const [showContactById, setShowContactById] = useState([])



    const onChangeSearch = (e) => {
        const { value } = e.target
        setSearchId(value)
    }

    const onSubmitSearch = (e) => {
        searchContact(searchId)
        e.preventDefault();
    }

    const searchContact = () => {
        fetch("https://dgpcoding.com/startcode/api/contact/getContactById/" + searchId)
            .then(res => res.json())
            .then(data => {
                setShowContactById(data)
            })
    }

    const onChangeDelete = (e) => {
        setDeleteId(e.target.value)
    }

   

    const deleteContact = (e) => {
        e.preventDefault();
        facade.deleteContact(deleteId);
    }


    return (
        <div align="center">
            <h2>View Specific Contact</h2>
            <form onSubmit={onSubmitSearch}>
                <input
                    type="text"
                    placeholder="Search"
                    onChange={onChangeSearch} />
                    <input type="submit" /> 

                <ul >
                    <p>Id: {showContactById.id}</p>
                    <p>Name: {showContactById.name}</p>
                    <p>Email: {showContactById.email}</p>
                    <p>Company: {showContactById.company}</p>
                    <p>JobTitle: {showContactById.jobtitle}</p>
                    <p>Phone: {showContactById.phone}</p>
                    <br />
                </ul>
            </form>
            <h2>Delete Contact</h2>
            <form onSubmit={deleteContact}>
                <input
                    type="text"
                    placeholder="Delete"
                    onChange={onChangeDelete} />   
                    <input type="submit" />           
            </form>
        </div>
    )


}