// user.js

class User {
    constructor(id, name, email) {
      this.id = id;
      this.name = name;
      this.email = email;
    }
  }
  
  class UserDatabase {
    constructor() {
      this.users = [];
    }
  
    createUser(user) {
      this.users.push(user);
    }
  
    updateUser(userId, updatedUser) {
      const index = this.users.findIndex((user) => user.id === userId);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
    }
  
    deleteUser(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
    }
  
    getUser(userId) {
      return this.users.find((user) => user.id === userId);
    }
  }
  
  module.exports = { User, UserDatabase };
  
  // user.test.js

const { expect } = require('chai');
const { User, UserDatabase } = require('./user');

describe('User Database', () => {
  let userDb;

  beforeEach(() => {
    userDb = new UserDatabase();
  });

  it('should create a user', () => {
    const user = new User(1, 'John Doe', 'john@example.com');
    userDb.createUser(user);

    expect(userDb.users).to.have.lengthOf(1);
  });

  it('should update a user', () => {
    const user1 = new User(1, 'John Doe', 'john@example.com');
    const user2 = new User(2, 'Jane Smith', 'jane@example.com');
    userDb.createUser(user1);
    userDb.createUser(user2);

    const updatedUser = new User(1, 'Updated John Doe', 'updated@example.com');
    userDb.updateUser(1, updatedUser);

    const foundUser = userDb.getUser(1);
    expect(foundUser.name).to.equal('Updated John Doe');
    expect(foundUser.email).to.equal('updated@example.com');
  });

  it('should delete a user', () => {
    const user1 = new User(1, 'John Doe', 'john@example.com');
    const user2 = new User(2, 'Jane Smith', 'jane@example.com');
    userDb.createUser(user1);
    userDb.createUser(user2);

    userDb.deleteUser(1);

    const foundUser = userDb.getUser(1);
    expect(foundUser).to.be.undefined;
    expect(userDb.users).to.have.lengthOf(1);
  });

  it('should get a user by ID', () => {
    const user1 = new User(1, 'John Doe', 'john@example.com');
    const user2 = new User(2, 'Jane Smith', 'jane@example.com');
    userDb.createUser(user1);
    userDb.createUser(user2);

    const foundUser = userDb.getUser(2);

    expect(foundUser.name).to.equal('Jane Smith');
    expect(foundUser.email).to.equal('jane@example.com');
  });
});
