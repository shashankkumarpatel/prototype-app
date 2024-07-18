import { Path } from '../configs/routeConfig';
import { useNavigate, useLocation } from 'react-router-dom';

export const NavigateApp = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const pathName = location.pathname;

  return {
    set: (path: Path | null, key: string | null = null) => {
      const url = pathName + (path ? path : '') + (key ? `\/${key}` : '');
      navigate(url);
    },
  };
};
