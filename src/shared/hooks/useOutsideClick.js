const useOutsideClick = (ref, state, callback) => {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  }
  if (state) {
    document.addEventListener('pointerdown', handleClickOutside);
  }
  return () => document.removeEventListener('pointerdown', handleClickOutside);
}

export default useOutsideClick;