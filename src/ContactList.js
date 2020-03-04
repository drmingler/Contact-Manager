import React, { Component } from "react";
// import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class ContactList extends Component {
  state = {
    query: ""
  };

    updateQuery = query => {
    this.setState(currentState => ({
      query: (currentState.query = query.trim())
    }));
  };

  clearQuery = () => this.updateQuery("");

  render() {
    const { contacts, deleteContact } = this.props;
    const { query } = this.state;

    const currentContacts =
      query === ""
        ? contacts
        : contacts.filter(contact =>
            contact.name.toLowerCase().includes(query.toLowerCase())
          );
    console.log(currentContacts.length);

    return (
      <div className={"list-contacts"}>
        <div className={"list-contacts-top"}>
          <input
            className={"search-contacts"}
            type="text"
            placeholder={"Search Contacts"}
            value={query}
            onChange={event => {
              this.updateQuery(event.target.value);
            }}
          />
            <Link className={"add-contact"}
            to = {"/create"}> Add Contact
            </Link>
        </div>

        {currentContacts.length !== contacts.length && (
          <div className={"showing-contacts"}>
            <span>
              Now showing {currentContacts.length} of {contacts.length}
            </span>
            <button onClick={this.clearQuery}> show all </button>
          </div>
        )}

        <ol className={"contact-list"}>
          {currentContacts.map(user => (
            <li key={user.id} className={"contact-list-item"}>
              <div
                className={"contact-avatar"}
                style={{
                  backgroundImage: `url(${user.avatarURL})`
                }}
              >
              </div>
              <div className={"contact-details"}>
                <p>{user.name}</p>
                <p>{user.handle}</p>
              </div>
              <button
                className={"contact-remove"}
                onClick={() => deleteContact(user)}
              >
                remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

// ContactList.propTypes = {
//   contacts: PropTypes.array.isRequired,
//   deleteContact : PropTypes.func.isRequired,
// };
export default ContactList;
