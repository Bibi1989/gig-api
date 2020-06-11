const request = require("supertest");
const app = require("../app");

const body = {
  first_name: "Bibi",
  last_name: "Aremo",
  email: "bb@gmail.com",
  phone: "1234565667",
  password: 12345678,
  stack: "Full Stack",
  github_url: "url",
  linkedin_url: "url",
  technologies: ["Java"],
  proficiency: "Mid Level",
  location: "Bayelsa",
  profile: "Profile",
  experience: "Experience",
  yoe: "6",
};

describe("Post Endpoints", () => {
  it("should create a new post", async () => {
    const res = await request(app).post("/api/v1/gig").send(body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(body);
  });
});
