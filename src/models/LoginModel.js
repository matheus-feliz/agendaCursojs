const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(boby) {
        this.boby = boby;
        this.errors = [];
        this.use = null;
    }

    async register() {
        this.valida();
        await this.userExists();
        if (this.errors.length > 0) return;
        try {

            const salt = bcryptjs.genSaltSync();
            this.boby.password = bcryptjs.hashSync(this.boby.password, salt);
            this.use = await LoginModel.create(this.boby);
        } catch (e) {
            console.log(e);
        }
    }
    async userExists() {
        const user = await LoginModel.findOne({ email: this.boby.email });
        if (user) this.errors.push('usuário já existe');
    }
    valida() {
        this.cleanUp();

        // valida email
        if (!validator.isEmail(this.boby.email)) this.errors.push('E-mail inválido');

        //senha deve esta entre 3 e 50
        if (this.boby.password.length < 3 || this.boby.password.length > 50) {
            this.errors.push('senha deve ter entre 3 a 50 caracteres.')
        }
    }

    cleanUp() {
        for (const key in this.boby) {
            if (typeof this.boby[key] !== 'string') {
                this.boby[key] = '';

            }
        }

        this.boby = {
            email: this.boby.email,
            password: this.boby.password
        }
    }
};

module.exports = Login;