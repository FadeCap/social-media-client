import { login } from "../../js/api/auth/login.js";
import { logout } from "../../js/api/auth/logout.js";
const loginCredentials = {
  email: "stian.busengdal@stud.noroff.no",
  password: "stian123123",
};

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}
const localStorageMock = new LocalStorageMock();
global.localStorage = localStorageMock;

describe("Login Tests", () => {
  const { email, password } = loginCredentials;

  it("Checking if login gets correct credentials", async () => {
    await login(email, password);
    expect(localStorageMock.getItem("token")).toBeTruthy();
  });

  it("Invalid credentials should give error message", async () => {
    await login("a", "b").catch((e) => {
      expect(typeof e.message).toMatch("string");
    });
  });

  it("Throws an error when called with invalid credentials", async () => {
    await expect(login("a", "b")).rejects.toThrow();
  });
});

describe("Logout Test", () => {
  it("Removes token when logging out", async () => {
    const { email, password } = loginCredentials;
    await login(email, password);
    logout();
    expect(localStorageMock.getItem("token")).toEqual(null);
  });
});
