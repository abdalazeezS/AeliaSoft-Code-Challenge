import IUser from "../types/user.type";

class UserService {

  API;
  constructor() {
    this.API = "http://localhost:3010/users";
  }

  fetchUsers = async () => {
    try {
      const res = await fetch(this.API, { method: 'GET' });
      const users = await res.json();
      return users;
    } catch (error) {
      console.error(error);
    }
  }

  deleteUser = (id: number) => {
    try {
      return fetch(`${this.API}/${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error(error);
    }
  }

  updateUser = (id: number, user: IUser) => {
    try {
      return fetch(`${this.API}/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify(user),
        }
      )
    } catch (error) {
      console.error(error);
    }
  }

  addUser = (user: IUser) => {
    const id = Number(user.id);
    const newUser = { ...user, id };

    try {
      return fetch(this.API,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(newUser),
        });
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserService;