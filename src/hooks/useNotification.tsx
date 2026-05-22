import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('¡Locura total! Estás intentando usar useNotification fuera de un NotificationProvider. Tenés que envolver tu componente (o App.tsx) en el provider.');
  }
  return context;
};
