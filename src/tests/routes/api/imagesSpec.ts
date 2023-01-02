import supertest from "supertest";
import app from "../../..";
import fs from "fs";
import path from "path";
import resize from "../../../routes/utilities/resize";

const request = supertest(app);

describe("Test invalid scenarios passed in the url", () => {
  it("returns 404 when invalid filename is passed", async () => {
    const response = await request.get("/api/images?filename=abiodun");

    expect(response.status).toBe(404);
  });
  it("returns 404 when NO filename is passed", async () => {
    const response = await request.get("/api/images?filename=");

    expect(response.status).toBe(404);
  });
  it("returns 404 when no height and width is passed", async () => {
    const response = await request.get(
      "/api/images?filename=palmtunnel&width=&height="
    );

    expect(response.status).toBe(404);
  });
});

//got idea on how to go about the test here https://github.com/tariq-k-dev/image-processing-api/blob/main/src/tests/indexSpec.ts
describe("Test for all scenarios passed in the url", () => {
  beforeEach(() => {
    try {
      fs.mkdirSync(path.resolve("build", "assets", "thumb"), {
        recursive: true,
      });
    } catch (err) {}
    try {
      fs.mkdirSync(path.resolve("build", "assets", "full"), {
        recursive: true,
      });
    } catch (err) {}
    const TestImage = path.resolve("src", "assets", "full", "palmtunnel.jpg");
    const ImgOutput = path.resolve("build", "assets", "full", "palmtunnel.jpg");

    try {
      fs.copyFileSync(TestImage, ImgOutput);
    } catch (err) {}
  });

  afterAll(() => {
    fs.rmSync("build/assets", { recursive: true });
  });

  it("returns 200 when valid details  are  passed", async () => {
    const response = await request.get(
      "/api/images?filename=palmtunnel&width=20&height=10"
    );
    const testPath = path.join(
      "build",
      "assets",
      "thumb",
      `palmtunnel-20x$10.jpg`
    );

    resize("palmtunnel", 20, 10);
    expect(fs.existsSync(testPath)).toBeTruthy;
  });



 
});
