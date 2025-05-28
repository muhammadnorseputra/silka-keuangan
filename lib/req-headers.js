export const headers = {
  Authorization: "Basic QmFsYW5nYW5rYWI6Ymtwc2RtQDIwMjI=",
  apiKey: "bkpsdm6811",
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const HeaderWithAuth = (token) => ({
  Authorization: `Bearer ${token}`,
  apiKey: process.env.SSO_APIKEY,
  "Content-Type": "application/json",
  Accept: "application/json",
});

export const sigapok_headers = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
  Accept: "application/json",
});
