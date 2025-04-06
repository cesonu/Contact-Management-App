import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactList.css';  // Import custom CSS for styling

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contacts on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/contacts')
      .then(response => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
        setError('Failed to load contacts');
        setLoading(false);
      });
  }, []);

  // Render loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="contact-list-container">
      <h1>Contact List</h1>
      {contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        <ul className="contact-list">
          {contacts.map(contact => (
            <li key={contact._id} className="contact-item">
              <div className="contact-info">
                <h3>{contact.name}</h3>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
