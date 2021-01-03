const OAUTH_URL = "https://github.com/login/oauth/authorize";
const ClIENT_ID = "d3e7259ccbf1621dafcd";

export const turnToOAuth = () => {
    const oauth_url = `${OAUTH_URL}?client_id=${ClIENT_ID}&redirect_uri=${window.location.href}`;
    window.location.href = oauth_url;
};
