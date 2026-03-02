import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchUsers, fetchUser, clearSessionCache } from "./usersApi";

const mockUser = {
  id: 1,
  name: "Leanne Graham",
  email: "Sincere@april.biz",
};

describe("usersApi", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    clearSessionCache();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetchUsers returns enriched users with first_name and last_name", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([mockUser]),
    });

    const result = await fetchUsers({ page: 1, search: "" });
    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toMatchObject({
      id: 1,
      first_name: "Leanne",
      last_name: "Graham",
      email: "Sincere@april.biz",
    });
    expect(result.data[0].avatar).toContain("dicebear");
  });

  it("fetchUsers throws when response is not ok", async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(fetchUsers({})).rejects.toThrow(/ошибка сервера/i);
  });

  it("fetchUser returns single enriched user", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });
    const user = await fetchUser(1);
    expect(user.first_name).toBe("Leanne");
    expect(user.last_name).toBe("Graham");
  });
});
