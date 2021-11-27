// write js here
"use strict"

class ValidationForm {
    constructor(form, id) {
        this.form = form;
        this.id = id;
    }

    initialize() {
        this.validationOnTyping();
        this.validationOnSubmit();
    }

    // set evenet listeter to all element input
    validationOnTyping() {
        this.id.forEach(item => {
            const inputField = document.querySelector(`#${item}`)

            inputField.addEventListener("input", () => {
                this.validatingInput(inputField)
            });
        });
    };

    // input validating
    validatingInput(input) {
        if (input.value.length < 1 || input.value === null || input.value === undefined) {
            this.setErrorMessage(input, "error", `${input.placeholder} cannot be blank`);
        } else {
            this.setErrorMessage(input, "success", null);
        };

        // email address field
        if (input.id === "email") {
            // check for a valid email address
            const re = /\S+@\S+\.\S+/
            if (re.test(input.value)) {
                this.setErrorMessage(input, "success", null);
            } else {
                this.setErrorMessage(input, "error", "Invalid email address");
            };
        };
    };

    setErrorMessage(field, status, message) {
        const errorMessageField = field.parentElement.querySelector(".error-message");

        if (status === "success") {
            errorMessageField.innerText = message;
            field.classList.remove("input-error");
            this.iconStyles(field, "success");
        } else {
            errorMessageField.innerText = message;
            errorMessageField.style.color = "#DC3545"
            field.classList.add("input-error");
            this.iconStyles(field, "error");
        };
    };

    iconStyles(field, status) {
        const successIcon = field.parentElement.querySelector(".icon-success");
        const errorIcon = field.parentElement.querySelector(".icon-error");

        if (status === "success") {
            successIcon.classList.remove("hidden");
            errorIcon.classList.add("hidden");
        } else {
            successIcon.classList.add("hidden");
            errorIcon.classList.remove("hidden");
        };
    };

    validationOnSubmit() {
        this.form.addEventListener("submit", e => {
            const inputStatus = [];
            e.preventDefault();

            this.id.forEach(item => {
                const inputField = document.querySelector(`#${item}`)
                if (inputField.value.length < 1) {
                    inputStatus.push(false);
                } else {
                    if (inputField.id === "email") {
                        const re = /\S+@\S+\.\S+/
                        if (re.test(inputField.value)) {
                            inputStatus.push(true);
                        } else {
                            inputStatus.push(false);
                        };
                    } else {
                        inputStatus.push(true);
                    }
                }
                console.log(inputField.value);
                this.validatingInput(inputField)
                // this.checkValueOnSubmit(inputStatus, inputField)
            });

            // check all input is true (length > 1)
            if (this.checkValueOnSubmit(inputStatus)) {
                this.styleSuccess(this.id, true);
            } else {
                undefined;
            };
        });
    };

    checkValueOnSubmit(inputStatus) {
        const isTrue = value => value === true;
        const valid = inputStatus.every(isTrue)
        console.log(inputStatus);
        console.log(valid);
        return valid;
    };

    styleSuccess(id, validation) {
        this.id.forEach(item => {
            const overlay = document.querySelector(".overlay");
            overlay.classList.remove("hidden")
            const inputField = document.querySelector(`#${item}`).value = "";
            setTimeout(() => {
                overlay.classList.add("hidden");
            }, 3000);
        });
    };
};

const form = document.querySelector("#form");
const listId = ["name", "email", "subject", "message"]

const validation = new ValidationForm(form, listId)
validation.initialize();