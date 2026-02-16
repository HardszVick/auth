export type UserRole = 'SUPERADMIN' | 'USER' | 'SUPPORT';

class User {
  private constructor(
    private readonly _id: string,
    private _email: string,
    private _password: string,
    private _role: UserRole,
    private _disabled: boolean,
  ) {}

  static create = (props: {
    id: string;
    email: string;
    password: string;
    role?: UserRole;
    disabled?: boolean;
  }) => {
    if (!props.email.includes('@')) {
      throw new Error('Invalid email');
    }

    if (props.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    return new User(
      props.id,
      props.email,
      props.password,
      props.role ?? 'USER',
      props.disabled ?? false,
    );
  };

  disable = () => {
    this._disabled = true;
  };

  enable = () => {
    this._disabled = false;
  };

  changeRole = (role: UserRole) => {
    this._role = role;
  };

  changePassword = (newPassword: string) => {
    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    this._password = newPassword;
  };

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get role() {
    return this._role;
  }

  get disabled() {
    return this._disabled;
  }
}

export default User;
