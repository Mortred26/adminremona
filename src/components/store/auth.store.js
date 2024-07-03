



class AuthStore {
  isAuth = false;

  login() {
    this.isAuth = true;
    window.location.reload()
  }

  logout() {
    this.isAuth = false;
    localStorage.removeItem('role');
    localStorage.removeItem('access_token');
    window.location.reload();
  }

  checkAuthentication() {
    const accessToken = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');
    if (accessToken && role === 'admin') {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }
}

export const authStore = new AuthStore();
