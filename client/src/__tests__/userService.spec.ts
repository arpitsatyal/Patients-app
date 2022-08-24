import axios from "axios";
import { authService } from "../services/auth";

//Arrange
const userDetails = {
  name: "arpit",
  email: "arpited7@gmail.com",
  password: "12345",
};

//Test
jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      post: jest.fn(() => Promise.resolve({ data: userDetails })),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
  };
});

describe("user login and sign up", () => {
  it("user should be able to sign up with valid data", async () => {
    //Act
    const result = await authService.signup(userDetails);
    //Assert
    expect(JSON.stringify(result)).toBe(JSON.stringify(userDetails));
    expect(axios.create).toHaveBeenCalledTimes(1);
  });

  it("user should be able to login with valid data", async () => {
    //Act
    const result = await authService.login(userDetails);
    //Assert
    expect(JSON.stringify(result)).toBe(JSON.stringify(userDetails));
    expect(axios.create).toHaveBeenCalledTimes(1);
  });
});
