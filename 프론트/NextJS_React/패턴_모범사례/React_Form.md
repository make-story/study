# Best Practices React Form

https://www.codevertiser.com/react-forms-best-practices/

## Reusable Components in ReactJS Form

```jsx
import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

const LoginForm = () => {
  const [user, setUser] = useState({ email: '', password: '' });

  const onChangeInput = e => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const onSubmitForm = e => {
    e.preventDefault();
    console.log('user', user);
  };

  const { name, email } = user;

  return (
    <form onSubmit={onSubmitForm}>
      <Input
        name='email'
        value={email}
        type='email'
        placeholder='Type your email...'
        onChange={onChangeInput}
      />
      <Input
        name='password'
        value={password}
        type='password'
        placeholder='Type your password...'
        onChange={onChangeInput}
      />
      <Button title='Submit' type='submit' />
    </form>
  );
};

export default LoginForm;
```

## React Custom Hooks in ReactJS Form | useForm Hook

```jsx
import { useState } from 'react';

const useForm = formState => {
  const [user, setUser] = useState(formState);

  const onChangeInput = e => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const onSubmitForm = e => {
    e.preventDefault();
    console.log('user', user);
  };

  return {
    user,
    onChangeInput,
    onSubmitForm,
  };
};

export default useForm;
```

```jsx
import Button from '../components/Button';
import Input from '../components/Input';
import useForm from '../hooks/useForm';

const LoginForm = () => {
  const { user, onChangeInput, onSubmitForm } = useForm({
    email: '',
    password: '',
  });

  const { email, password } = user;

  return (
    <form onSubmit={onSubmitForm}>
      <Input
        name='email'
        value={email}
        type='email'
        placeholder='Type your email...'
        onChange={onChangeInput}
      />
      <Input
        name='password'
        value={password}
        type='password'
        placeholder='Type your password...'
        onChange={onChangeInput}
      />
      <Button title='Submit' type='submit' />
    </form>
  );
};

export default LoginForm;
```
