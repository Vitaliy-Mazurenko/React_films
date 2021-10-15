import { Component } from "react";

const inititialData = {
  title: "",
  img: "",
  description: "",
  director: "",
  price: "",
  duration: "",
  featured: false,
};

class FilmForm extends Component {
  state = {
    data: inititialData,
  };

  handleStringChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  handleCheckboxChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.checked },
    });

  handleKeyPress = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/[\+e-]/.test(keyValue)) e.preventDefault();
  };

  handleNumberChange = (e) => {
    let value = e.target.value;
    const re = /^[1-9]\d*(\.\d{1,2})?$/;
    if (value === "" || re.test(value)) {
      this.setState({
        data: { ...this.state.data, [e.target.name]: value },
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.data);
  };

  render() {
    const { data } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="ui form">
        <div className="ui grid mb-3">
          {/* two column row START */}
          <div className="two column row">
            {/* left  column  START */}
            <div className="ten wide column">
              {/* title START */}
              <div className="field">
                <label htmlFor="title">Film title</label>
                <input
                  value={data.title}
                  onChange={this.handleStringChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="film title"
                />
              </div>
              {/* title END */}
              {/* image field START */}
              <div className="field img-grid">
                <label htmlFor="img">Image</label>
                <input
                  value={data.img}
                  onChange={this.handleStringChange}
                  name="img"
                  id="img"
                />

                <div className="inp-file">
                  <label htmlFor="photo">Photo</label>
                  <input type="file" id="photo" />
                </div>
              </div>
              {/* image field END */}
              {/* description field START */}
              <div className="column row field">
                <label htmlFor="description">Film description</label>
                <textarea
                  value={data.description}
                  onChange={this.handleStringChange}
                  name="description"
                  id="description"
                  placeholder="film description"
                ></textarea>
              </div>
              {/* description field END */}
            </div>
            {/* left  column  END */}
            {/*  right column START */}
            <div className="six wide column">
              <img
                src="http://via.placeholder.com/250x250"
                className="ui image imgfit"
                alt="myimg"
              />
            </div>
            {/*  right column END */}
          </div>
          {/* two column row END */}

          {/* three column row START */}
          <div className="three column row">
            {/* director START */}
            <div className="column field">
              <label htmlFor="director">Director</label>
              <input
                value={data.director}
                onChange={this.handleStringChange}
                type="text"
                name="director"
                id="director"
                placeholder="film director"
              />
            </div>
            {/* director END*/}
            {/* duration START */}
            <div className="column field">
              <label htmlFor="duration">Duration</label>
              <input
                value={data.duration}
                onChange={this.handleNumberChange}
                onKeyPress={this.handleKeyPress}
                min="1"
                step="0.01"
                type="number"
                name="duration"
                id="duration"
                placeholder="Duration"
              />
            </div>
            {/* duration END */}
            {/* price START */}
            <div className="column field">
              <label htmlFor="price">Price</label>
              <input
                value={data.price}
                onChange={this.handleNumberChange}
                onKeyPress={this.handleKeyPress}
                min="1"
                step="0.01"
                type="number"
                name="price"
                id="price"
                placeholder="price"
              />
            </div>
            {/* price END */}
          </div>
          {/* three column row END */}

          {/* featured START */}
          <div className="six wide column inline field">
            <label htmlFor="featured">Featured</label>
            <input
              checked={data.featured}
              onChange={this.handleCheckboxChange}
              type="checkbox"
              name="featured"
              id="featured"
            />
          </div>
          {/* featured END */}

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
