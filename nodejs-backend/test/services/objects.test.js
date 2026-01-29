const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("objects service", () => {
  let thisService;
  let objectCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("objects");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (objects)");
  });

  describe("#create", () => {
    const options = {"name":"aasdfasdfasdfadsfadfa","source":"new value"};

    beforeEach(async () => {
      objectCreated = await thisService.create({...options, ...users});
    });

    it("should create a new object", () => {
      assert.strictEqual(objectCreated.name, options.name);
assert.strictEqual(objectCreated.source, options.source);
    });
  });

  describe("#get", () => {
    it("should retrieve a object by ID", async () => {
      const retrieved = await thisService.findById(objectCreated._id);
      assert.strictEqual(retrieved._id.toString(), objectCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"345345345345345345345","source":"updated value"};

    it("should update an existing object ", async () => {
      const objectUpdated = await thisService.findByIdAndUpdate(
        objectCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(objectUpdated.name, options.name);
assert.strictEqual(objectUpdated.source, options.source);
    });
  });

  describe("#delete", () => {
    it("should delete a object", async () => {
      const objectDeleted = await thisService.remove(objectCreated._id);
      assert.strictEqual(objectDeleted._id.toString(), objectCreated._id.toString());
    });
  });
});