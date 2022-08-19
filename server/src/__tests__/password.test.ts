import { decryptPassword, passwordHash } from "../utils/passwordHash";

const password: string = "12345";

describe("password hash", () => {
  it("returns hashed and decrypted password to be equal", async () => {
    const hashed = await passwordHash(password);
    const decrypted = await decryptPassword(hashed);
    expect(password).toEqual(decrypted);
  });
});
