import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <div className="text-center">
        <h1 className="text-3xl font-bold mt-20 mb-10">추모 게시판</h1>  {/* mt-16으로 상단 여백 추가 */}
        <LoginForm />
      </div>
    </div>
  );
}
