import { prismaMock } from "./db/singleton";
import { createUser } from "./db/testFunctions";

test("should create new user ", async () => {
  const user = {
    id: 1,
    name: "Arpit",
    password: "12345",
    email: "arpit@gmail.com",
  };

  prismaMock.user.create.mockResolvedValue(user);

  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    name: "Arpit",
    password: "12345",
    email: "arpit@gmail.com",
  });
});
