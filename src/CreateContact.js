import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageInput from "./ImageInput";
import serializeForm from "form-serialize"

class CreateContact extends Component {
    Handler=(e)=>{
        e.preventDefault();
        const userInfo = serializeForm(e.target,{hash:true});
        console.log(userInfo);

        if(this.props.onCreateContact){
            this.props.onCreateContact(userInfo)
        }

    };
  render() {
    return (
      <div>
        <Link className={"close-create-contact"} to={"/"}>
          close
        </Link>
        <form onSubmit={this.Handler} className={"create-contact-form"}>
            <ImageInput
                className={"create-contact-avatar-input"}
                name={"avatarURL"}
                maxHeight={64}
            />
          <div className={"create-contact-details"}>
            <input type={"text"} placeholder={"Name"} name={"name"} />
            <input type={"text"} placeholder={"Handle"} name={"handle"} />
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateContact;
