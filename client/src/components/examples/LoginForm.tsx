import LoginForm from '../LoginForm';

export default function LoginFormExample() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <LoginForm
        onLogin={(email, password, role) => console.log('Login:', { email, role })}
        onSwitchToRegister={() => console.log('Switch to register')}
      />
    </div>
  );
}
