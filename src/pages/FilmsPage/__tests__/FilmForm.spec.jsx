import { MemoryRouter as Router } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import films from "test/films";

const mockFilm = films[0];

function setValuesToControlls(override = {}) {
  const { title, img, description, director, duration, price, featured } = {
    ...mockFilm,
    ...override,
  };

  userEvent.type(screen.getByLabelText(/title/i), title);
  userEvent.type(screen.getByLabelText(/image/i), img);
  userEvent.type(screen.getByLabelText(/description/i), description);
  userEvent.type(screen.getByLabelText(/director/i), director);
  userEvent.type(screen.getByLabelText(/duration/i), duration.toString());
  userEvent.type(screen.getByLabelText(/price/i), price.toString());
  userEvent.type(screen.getByLabelText(/featured/i), featured);
}

function Wrapper({ ...rest }) {
  return (
    <Router>
      <FilmForm film={{}} {...rest} />
    </Router>
  );
}

test("form should not has class loading while server errors", async () => {
  const titleError = "title has error";
  const resolvedValue = { response: { data: { errors: {} } } };
  resolvedValue.response.data.errors = { title: titleError };

  const saveFilm = jest.fn().mockRejectedValue(resolvedValue);
  render(<Wrapper saveFilm={saveFilm} />);

  setValuesToControlls();

  const btnEl = screen.getByText(/save/i);
  const form = screen.getByTestId("film-form");

  await waitFor(() => userEvent.click(btnEl));

  expect(form).not.toHaveClass("loading");

  const messageErr = screen.queryByRole("alert");
  expect(messageErr).toBeInTheDocument();
  expect(messageErr).toHaveTextContent(titleError);
});

test("FilmForm should render correct", () => {
  const saveFilm = jest.fn(() => Promise.resolve());

  render(<Wrapper saveFilm={saveFilm} />);

  setValuesToControlls();
  const btnEl = screen.getByText(/save/i);

  userEvent.click(btnEl);
  expect(saveFilm).toHaveBeenCalledTimes(1);
});

test("should render FormMessage when error", () => {
  const saveFilm = jest.fn(() => Promise.resolve());
  render(<Wrapper saveFilm={saveFilm} />);

  setValuesToControlls({ title: null });

  const btnEl = screen.getByText(/save/i);

  userEvent.click(btnEl);
  const formMsg = screen.getByRole("alert");
  expect(formMsg).toBeInTheDocument();
});
