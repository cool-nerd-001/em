import { User } from '../app/models/user'

describe('User interface', () => {
  it('should have property name of type string', () => {
    const user: User = { name: 'John Smith', token: 'abc123' };
    expect(typeof user.name).toBe('string');
  });

  it('should have property token of type string', () => {
    const user: User = { name: 'John Smith', token: 'abc123' };
    expect(typeof user.token).toBe('string');
  });

  
});
