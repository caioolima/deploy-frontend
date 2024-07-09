import { useTranslation } from 'react-i18next';

const Loading = () => {
    const { t } = useTranslation(); // Hook para acessar as traduções

    return (
        <div className="loading-text">{t('Loading')}</div>
    );
};

export default Loading;
