import { Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Tts() {
    const { localePath } = useLanguage();
    const { search } = useLocation();
    return <Navigate to={`${localePath('/cabinet/tts')}${search}`} replace />;
}
