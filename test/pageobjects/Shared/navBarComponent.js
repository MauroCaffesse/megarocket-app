class NavBar {
  get adminsLink() {
    return $('[data-testid="routes-list"] > a[href="/admins"]');
  }

  get classesLink() {
    return $('[data-testid="routes-list"] > a[href="/classes"]');
  }

  get logoutBtn() {
    return $('header > div > div:last-child > div button');
  }

  async navigateToAdmins() {
    await this.adminsLink.click();
  }

  async navigateToClasses() {
    await this.classesLink.click();
  }

  async logoutBtnClick() {
    await this.logoutBtn.click();
  }
}

module.exports = new NavBar();
