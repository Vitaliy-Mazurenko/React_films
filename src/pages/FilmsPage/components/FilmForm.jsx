import { Component, createRef } from "react";
import ImageLoader from "components/ImageLoader";
import FormMessage from "components/FormMessage";

const initialData = {
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
    data: initialData,
    photo: "",
    errors: {},
  };

  photoRef = createRef();

  updatePhoto = (e) => {
    const file = this.photoRef.current.files && this.photoRef.current.files[0];
    if (file) {
      const img = "/img/" + file.name;
      this.setState({
        data: { ...this.state.data, img },
        errors: { ...this.state.errors, img: "" },
      });
    }
  };

  handleStringChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: "" },
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
        errors: { ...this.state.errors, [e.target.name]: "" },
      });
    }
  };

  validate(data) {
    const errors = {};
    if (!data.title) errors.title = "Title cannot be blank";
    if (!data.img) errors.img = "img cannot be blank";
    if (!data.description) errors.description = "description cannot be blank";
    if (!data.director) errors.director = "director cannot be blank";
    if (!data.duration) errors.duration = "duration cannot be blank";
    if (!data.price) errors.price = "price cannot be blank";
    return errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      console.log(this.state.data);
      this.setState({ data: initialData });
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="ui form">
        <div className="ui grid mb-3">
          {/* two column row START */}
          <div className="two column row">
            {/* left  column  START */}
            <div className="ten wide column">
              {/* title START */}
              <div className={`field ${errors.title ? "error" : ""}`}>
                <label htmlFor="title">Film title</label>
                <input
                  value={data.title}
                  onChange={this.handleStringChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="film title"
                />
                {errors.title && <FormMessage>{errors.title}</FormMessage>}
              </div>
              {/* title END */}
              {/* image field START */}
              <div className={`field img-grid ${errors.img ? "error" : ""}`}>
                <label htmlFor="img">Image</label>
                <input
                  value={data.img}
                  onChange={this.handleStringChange}
                  name="img"
                  id="img"
                />
                {errors.img && <FormMessage>{errors.img}</FormMessage>}

                <div className="inp-file">
                  <label htmlFor="photo">Photo</label>
                  <input
                    ref={this.photoRef}
                    onChange={this.updatePhoto}
                    type="file"
                    id="photo"
                  />
                </div>
              </div>
              {/* image field END */}
              {/* description field START */}
              <div
                className={`column row field ${
                  errors.description ? "error" : ""
                }`}
              >
                <label htmlFor="description">Film description</label>
                <textarea
                  value={data.description}
                  onChange={this.handleStringChange}
                  name="description"
                  id="description"
                  placeholder="film description"
                ></textarea>
                {errors.description && (
                  <FormMessage>{errors.description}</FormMessage>
                )}
              </div>
              {/* description field END */}
            </div>
            {/* left  column  END */}
            {/*  right column START */}
            <div className="six wide column">
              <ImageLoader
                src={data.img}
                fallbackImg="http://via.placeholder.com/250x250"
                className="ui image imgfit"
                alt={data.title}
              />
            </div>
            {/*  right column END */}
          </div>
          {/* two column row END */}

          {/* three column row START */}
          <div className="three column row">
            {/* director START */}
            <div className={`column field ${errors.director ? "error" : ""}`}>
              <label htmlFor="director">Director</label>
              <input
                value={data.director}
                onChange={this.handleStringChange}
                type="text"
                name="director"
                id="director"
                placeholder="film director"
              />
              {errors.director && <FormMessage>{errors.director}</FormMessage>}
            </div>
            {/* director END*/}
            {/* duration START */}
            <div className={`column field ${errors.duration ? "error" : ""}`}>
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
              {errors.duration && <FormMessage>{errors.duration}</FormMessage>}
            </div>
            {/* duration END */}
            {/* price START */}
            <div className={`column field ${errors.price ? "error" : ""}`}>
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
              {errors.price && <FormMessage>{errors.price}</FormMessage>}
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
