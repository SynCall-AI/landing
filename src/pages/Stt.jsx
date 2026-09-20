import { Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Stt() {
    const { localePath } = useLanguage();
    const { search } = useLocation();
    return <Navigate to={`${localePath('/cabinet/stt')}${search}`} replace />;
}
