import { useEffect } from 'react';

const useOutsideClick = (ref, isActive, onOutsideClick) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [ref, isActive, onOutsideClick]);

  // const handleClickOutside = (event) => {
  //   if (ref.current && !ref.current.contains(event.target)) {
  //     callback();
  //   }
  // }
  // if (state) {
  //   document.addEventListener('pointerdown', handleClickOutside);
  // }
  // return () => document.removeEventListener('pointerdown', handleClickOutside);
}

export default useOutsideClick;