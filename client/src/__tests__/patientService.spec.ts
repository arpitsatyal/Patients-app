import axios from "axios";
import { patientService } from "../services/patients";

//Arrange
const patientDetails = {
  id: 1,
  firstName: "arpit",
  lastName: "satyal",
  email: "arpited7@gmail.com",
  contact: "12345",
  address: "Kathamandu",
  dob: "1998-07-29",
  specialAttention: false,
  allergies: ["Pet allergies"],
  image: "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706__340.jpg",
};

//Test
jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({ data: [patientDetails] })),
      post: jest.fn(() => Promise.resolve({ data: patientDetails })),
      put: jest.fn(() =>
        Promise.resolve({ data: { ...patientDetails, specialAttention: true } })
      ),
      delete: jest.fn(() => Promise.resolve({ data: null })),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
  };
});

describe("patients", () => {
  it("should be able to get all patients", async () => {
    //Act
    const result = await patientService.getPatients();
    //Assert
    expect(JSON.stringify(result)).toBe(JSON.stringify([patientDetails]));
    expect(axios.create).toHaveBeenCalledTimes(1);
  });

  it("should be able to create a patient", async () => {
    const result = await patientService.addPatient(patientDetails);

    expect(JSON.stringify(result)).toBe(JSON.stringify(patientDetails));
    expect(axios.create).toHaveBeenCalledTimes(1);
  });

  it("should be able to update a patient", async () => {
    const result = await patientService.updatePatient(patientDetails, 1);

    expect(JSON.stringify(result)).toBe(
      JSON.stringify({ ...patientDetails, specialAttention: true })
    );
    expect(axios.create).toHaveBeenCalledTimes(1);
  });

  it("should be able to delete a patient", async () => {
    const result = await patientService.deletePatient(1);

    expect(JSON.stringify(result)).toBe(JSON.stringify(null));
    expect(axios.create).toHaveBeenCalledTimes(1);
  });
});
