import { decryptPassword, passwordHash } from "../utils/passwordHash";

const password: string = "okdcpokdpockpdoskcpodsskcpokdcpokdpockdpokcposdkcpodkspckdpsckp[sdkc[pdkc[pksdpocksdopcksdpokcpo";

describe("password hash", () => {
  it("returns hashed and decrypted password to be equal", async () => {
    const hashed = await passwordHash(password);
    const decrypted = await decryptPassword(hashed);
    expect(password).toEqual(decrypted);
  });
});
