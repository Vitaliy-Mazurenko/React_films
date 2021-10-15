import { Component } from "react";

const inititialData = {
  title: "",
};

class FilmForm extends Component {
  state = {
    data: inititialData,
  };

  handleStringChange = (e) => {};

  handleCheckboxChange = (e) => {};

  handleNumberChange = (e) => {};

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.data);
  };

  render() {
    return (
      <form className="ui form">
        <div className="ui grid mb-3">
          {/* left  column  START */}
          <div className="ten wide column">
            {/* title START */}
            <div className="field">
              <label htmlFor="title">Film title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="film title"
              />
            </div>
            {/* title END */}
          </div>
          {/* left  column  END */}

          {/* Buttons START */}
          <div className="ui fluid buttons">
            <button className="ui button primary" type="submit">
              Save
            </button>
            <div className="or"></div>
            <span className="ui button">Hide form</span>
          </div>
          {/* Buttons END */}
        </div>
        {/* END ui grid */}
      </form>
    );
  }
}

export default FilmForm;
