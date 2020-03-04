import React, { Component } from "react";
import ContactList from "./ContactList";
import * as ContactsApis from "./utils/ContactsAPI";
import { Route } from "react-router-dom";
import CreateContact from "./CreateContact";

class App extends Component {
  state = {
    contacts: []
  };
  componentDidMount() {
    ContactsApis.getAll().then(data =>
      this.setState(() => ({
        contacts: data
      }))
    );
  }

  removeContact = contact => {
    this.setState(currentState => ({
      contacts: currentState.contacts.filter(data => data.id !== contact.id)
    }));
    ContactsApis.remove(contact);
  };

  addContact = (userinfo) => {
    ContactsApis.create(userinfo)
        .then(userinfo => {
      console.log(userinfo);
      this.setState(currentState => ({
        contacts: currentState.contacts.concat([userinfo])
      }));
    });
  };

  render() {
    return (
      <div>
        <Route
          exact
          path={"/"}
          render={() => (
            <ContactList
              contacts={this.state.contacts}
              deleteContact={this.removeContact}
            />
          )}
        />

        <Route
            exact
          path={"/create"}
          render={({history}) => (
            <CreateContact
              onCreateContact={(userinfo) => {
                this.addContact(userinfo);
                history.push('/')
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
