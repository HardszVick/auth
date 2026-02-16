import User from '../../domain/entities/user';

class UserPresenter {
  constructor(private user: User) {}

  toPublic = () => {
    return {
      id: this.user['id'],
      email: this.user['email'],
    };
  };
}

export default UserPresenter;
