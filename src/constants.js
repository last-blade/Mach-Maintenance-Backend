export const DB_NAME = "mac-maintenance-backend-srpk-prashant";
export const accessTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const refreshTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 28 * 24 * 60 * 60 * 1000,
}