import { Component } from "react";
import _sortBy from "lodash/sortBy";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import { films } from "data";

class App extends Component {
  state = {
    films: [],
  };

  componentDidMount() {
    this.setState({ films: this.sortFilms(films) });
  }

  sortFilms = (films) => _sortBy(films, ["title"]);

  toggleFeatured = (id) => {};

  render() {
    const { films } = this.state;
    return (
      <div className="ui container">
        <FilmsList films={films} />
      </div>
    );
  }
}

export default App;
