import LoginForm from '@/components/LoginForm';
import TearBackground from '@/components/TearEffect/TearBackground';


export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 relative overflow-hidden">
      <TearBackground />
      <div className="text-center relative z-10">
        <h1 className="text-9xl font-bold mt-40 mb-10">추모 게시판</h1>
        <LoginForm />
      </div>
    </div>
  );
}
