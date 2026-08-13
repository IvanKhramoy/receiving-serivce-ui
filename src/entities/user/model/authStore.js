import { create } from 'zustand';
import { decodeJwt} from "@/shared/lib/decodeJwt";
import { tokenStorage} from "@/shared/api/tokenStorage";

const buildUserFromToken = (accessToken) => {
  const claims = decodeJwt(accessToken);
  if (!claims) return null;
  return {
    id: claims.id,
    nickname: claims.nickname,
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

  setTokens: (accessToken, refreshToken) => {
    tokenStorage.setTokens(accessToken, refreshToken);
    set({ accessToken, refreshToken, user: buildUserFromToken(accessToken) })
  },

  logout: () => {
    tokenStorage.clearTokens();
    set( {accessToken: null, refreshToken: null, user: null} )
  }
}))

export default useAuthStore;