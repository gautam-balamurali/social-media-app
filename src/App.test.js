import {
  act,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import SearchBar from "./components/shared/search-bar-component/SearchBar";
import { useUsers } from "core/contexts/users-context/UsersContext";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock("core/contexts/users-context/UsersContext", () => ({
  useUsers: jest.fn(),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockedNavigate.mockClear();
    useUsers.mockReturnValue({
      users: [
        {
          _id: "1",
          firstName: "Gautam",
          lastName: "B",
          username: "gautam.bm",
          picUrl: "https://example.com/user.jpg",
        },
        {
          _id: "2",
          firstName: "Adarsh",
          lastName: "Balika",
          username: "adarshbalika",
          picUrl: "https://example.com/adarsh.jpg",
        },
      ],
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("debounces user filtering and navigates to the selected profile", () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search by username or name/i);
    fireEvent.change(input, { target: { value: "gaut" } });

    expect(screen.queryByText("Gautam B")).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.getByText("Gautam B")).toBeInTheDocument();
    expect(screen.getByText("@gautam.bm")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Gautam B"));
    expect(mockedNavigate).toHaveBeenCalledWith("/profile/gautam.bm");
  });
});
