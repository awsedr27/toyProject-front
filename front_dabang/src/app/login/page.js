import Link from 'next/link';
import LoginForm from '../components/layouts/forms/LoginForm';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function Home() {
  return (
    <LoginForm
    onClick={handleLoginBtnClick}
    ></LoginForm>
  );
}
