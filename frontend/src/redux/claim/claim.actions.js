import ClaimTypes from './claim.types.js';

export const setCount = (data) => ({
  type: ClaimTypes.SET_COUNT,
  payload: data,
});

export const setClaimData = (data) => ({
  type: ClaimTypes.SET_CLAIM_DATA,
  payload: data,
});

export const setClaimClaims = (data) => ({
  type: ClaimTypes.SET_CLAIM_CLAIMS,
  payload: data,
});

export const resetClaim = () => ({
  type: ClaimTypes.RESET_CLAIM,
});
