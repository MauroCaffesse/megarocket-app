class AddNewTrainer {
  get trainerbtn() {
    return $('[data-testid="routes-list"] a:nth-child(6)');
  }

  get addNewbtn() {
    return $('[data-testid="trainer-add-link"] >   div  > button');
  }

  get inputFirstName() {
    return $('[data-testid="trainers-form-container"] div:nth-child(1) input');
  }

  get inputLastName() {
    return $('[data-testid="trainers-form-container"] div:nth-child(2) input');
  }

  get inputId() {
    return $('[data-testid="trainers-form-container"] div:nth-child(3) input');
  }

  get inputPhone() {
    return $('[data-testid="trainers-form-container"] div:nth-child(4) input');
  }

  get inputEmail() {
    return $('[data-testid="trainers-form-container"] div:nth-child(5) input');
  }

  get inputPassword() {
    return $('[data-testid="trainers-form-container"] div:nth-child(6) input');
  }

  get inputSalary() {
    return $('[data-testid="trainers-form-container"] div:nth-child(7) input');
  }

  get submitBtn() {
    return $('[data-testid="trainers-form-buttons"] div:nth-child(2) button');
  }

  get confirmAlert() {
    return $('[data-testid="confirm-modal-container"]');
  }

  get submitConfirmBtn() {
    return $('[data-testid="confirm-modal-buttons"] div:nth-child(2) button');
  }

  get cancelBtn() {
    return $('[data-testid="trainers-form-buttons"] div:nth-child(1) button');
  }

  async completeForm(firstName, lastName, iD, phone, email, password, salary) {
    await this.inputFirstName.setValue(firstName);
    await this.inputLastName.setValue(lastName);
    await this.inputId.setValue(iD);
    await this.inputPhone.setValue(phone);
    await this.inputEmail.setValue(email);
    await this.inputPassword.setValue(password);
    await this.inputSalary.setValue(salary);
  }

  async SubmitBtnClick() {
    await this.submitBtn.click();
  }

  async CancelBtnClick() {
    await this.cancelBtn.click();
  }

  async SubmitConfirmBtnClick() {
    await this.submitConfirmBtn.click();
  }

  async trainerbtnClick() {
    await this.trainerbtn.click();
  }

  async AddNewbtnbtnClick() {
    await this.addNewbtn.click();
  }
}
module.exports = new AddNewTrainer();
