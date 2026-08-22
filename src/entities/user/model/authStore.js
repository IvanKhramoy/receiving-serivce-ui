import { create } from 'zustand';
import { decodeJwt} from "@/shared/lib/decodeJwt";
import { tokenStorage} from "@/shared/api/tokenStorage";

const buildUserFromToken = (accessToken) => {
  const claims = decodeJwt(accessToken);
  console.log(claims)
  if (!claims) return null;
  return {
    id: claims.id,
    nickname: claims.nickname,
    email: claims.sub,
    warehouseId: claims.warehouseId,
    authorities: claims.authorities,
  }
}

const initialAccessToken = tokenStorage.getAccessToken();

// zustand store
//returns object of initial state and methods
const useAuthStore = create((set) => ({ //set - way to update state
  accessToken: initialAccessToken,
  refreshToken: tokenStorage.getRefreshToken(),
  user: initialAccessToken ? buildUserFromToken(initialAccessToken) : null,

  setTokens: (accessToken, refreshToken) => { // автоматический ререндер
    tokenStorage.setTokens(accessToken, refreshToken);
    set({ accessToken, refreshToken, user: buildUserFromToken(accessToken) })
  },

  logout: () => { // +блокировка доступа
    tokenStorage.clearTokens();
    set( {accessToken: null, refreshToken: null, user: null} )
  }
}))

export const selectIsManager = (state) => {
  if (!state.user || !state.user.authorities) return false;
  return state.user.authorities.includes('MANAGER');
}

export const selectIsAdmin = (state) => {
  if (!state.user || !state.user.authorities) return false;
  return state.user.authorities.includes('ADMIN');
}

export default useAuthStore;