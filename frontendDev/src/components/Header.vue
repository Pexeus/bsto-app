<template>
    <div class="header">
        <div class="goTo">
            <p>Meine Auswahl</p>
            <p>Suche</p>
            <p>Genres</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",

    setup() {

    }
}
</script>

<style scoped>
    .header {
        width: 100%;
        padding: 30px;
        background-color: var(--dark);
        position: sticky;
        top: 0;
        z-index: 100;
    }

    .goTo {
        display: flex;
        justify-content: center;
        max-width: 50%;
        width: 300px;
    }

    .goTo p {
        display: inline-block;
        flex-grow: 1;
        opacity: .8;
        cursor: pointer;
        font-weight: bold;
    }

    .goTo p:hover {
        opacity: 1;
    }
</style>