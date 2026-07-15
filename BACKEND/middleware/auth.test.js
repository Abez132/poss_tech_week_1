import { describe, it, expect, jest } from "@jest/globals";
import authMiddleware from "./auth.js";

// Mock req, res, next helpers
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("authMiddleware", () => {
  it("returns 401 when Authorization header is missing", () => {
    const req = { headers: {} };
    const res = mockRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "missing or invalid token",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
