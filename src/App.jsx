import { Component } from "react";
import _orderBy from "lodash/orderBy";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import { films } from "data";
import FilmContext from "contexts/FilmContext";

class App extends Component {
  state = {
    films: [],
  };

  componentDidMount() {
    this.setState({ films: this.sortFilms(films) });
  }

  sortFilms = (films) =>
    _orderBy(films, ["featured", "title"], ["desc", "asc"]);

  toggleFeatured = (id) =>
    this.setState(({ films }) => ({
      films: this.sortFilms(
        films.map((f) => (f._id === id ? { ...f, featured: !f.featured } : f))
      ),
    }));

  value = { toggleFeatured: this.toggleFeatured };

  render() {
    const { films } = this.state;
    return (
      <FilmContext.Provider value={this.value}>
        <div className="ui container">
          <FilmsList films={films} />
        </div>
      </FilmContext.Provider>
    );
  }
}

export default App;
