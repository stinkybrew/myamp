<template>
    <div>
        <p>Hello, it's US!</p>
        <p>This website is a creation for a group project. Behind this website are three web geniuses who are passionate
        about music and coding! We got our inspiration from other popular music applications though, we wanted to give
        it our own little twist. We want to thank you for visiting and using our website. We hope that you enjoy our
        little creation to its fullest potential.</p>

        <p id="centeredtext" class="biggertext">Our Values</p>

        <div class="values" id="value1">
            <p>USER EXPERIENCE</p>
            <p>Users are the foundation of our website. That's why we aim to create the best user experience there is.</p>
        </div>
        <div class="values" id="value2">
            <p>INNOVATIVE</p>
            <p>We are committed to look for new ways to improve and update our website in all aspects.</p>
        </div>
        <div class="values" id="value3">
            <p>QUALITY</p>
            <p>Everything we put out on our website will be one of the highest quality there is.</p>
        </div>
        <div class="values" id="value4">
            <p>SIMPLICITY</p>
            <p>Transparency, no strings attached. We pride ourselves for our simple, easy to understand concepts.</p>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'AboutPage',
        data() {
            return {
                authenticated: '',
                verifiedAccount: {
                    username: "",
                    password: ""
                },
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        async mounted() {
        },
        methods: {
            async getUserInfo() {
            },
            logout() {
            },
            emitTheThing() {
            },
            
        }
    }
</script>

<style scoped>

</style>
