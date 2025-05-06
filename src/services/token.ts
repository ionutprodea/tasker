export const getToken = () => {
    const local = localStorage.getItem("tasker-auth-token");
    if (local) return local;
    const session = sessionStorage.getItem("tasker-auth-token");
    return session;
}