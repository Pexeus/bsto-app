<template>
    <div class="loginWrapper">
        <div class="login">
            <h1>Login</h1>
            <br>
            <input type="text" id="name" v-model="loginData.username" placeholder="Benutzername...">
            <input type="password" id="pw" v-model="loginData.password" placeholder="Passwort...">

            <button @click="login()">Anmelden</button>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
export default {
    name: "Login",

    setup(props, context) {
        const host = "http://bstoapp.staging.it-tf.ch/"
        const loginData = reactive({username: "", password: ""})

        async function login() {
            console.log(loginData);

            let fetchOptions = {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(loginData)
            }

            const response = await fetch(host + "login", fetchOptions)
            const loginResponse = await response.json()

            if (loginResponse.username == false) {
                alert("Benutzer nicht gefunden")
            }
            else if (loginResponse.password == false) {
                alert("Falsches Passwort")
            }
            else {
                let token = loginResponse

                localStorage.setItem("jwt", token)
                context.emit("loggedin", token)
            }
        }

        return {loginData, login}
    }
}
</script>

<style scoped>
    .loginWrapper {
        width: 100%;
        height: 100vh;
        text-align: center;
    }   

    .login {
        display: inline-block;
        margin-top: 35vh;
        width: 500px;
        max-width: 90%;
    }

    h1 {
        float: left;
        margin: 5px;
        font-weight: 400;
        padding-left: 10px;
        margin-bottom: 15px;
        border-left: 3px solid var(--white);
    }

    input {
        background-color: var(--mid);
        border: 1px solid var(--shadow);
        font-size: larger;
        padding: 5px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 5px;
        width: calc(100% - 10px);
        box-shadow: 0px 1px 5px var(--shadow);
        display: block;
        margin: 5px;
    }

    button {
        background-color: var(--bright);
        border: 1px solid var(--shadow);
        font-size: larger;
        padding: 5px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 5px;
        min-width: 30%;
        box-shadow: 0px 1px 5px var(--shadow);
        display: block;
        margin: 5px;
        float: right;
        margin-top: 10px;
        cursor: pointer;
    }

    button:hover {
        box-shadow: 0px 5px 10px var(--shadow);
    }
</style>