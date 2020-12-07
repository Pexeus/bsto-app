<template>
    <div class="loaderWrapper">
        <div class="loader">
            <img src="../assets/logo.png" alt="">
            <div class="iWrap">
                <i class="gg-spinner-alt"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .loaderWrapper {
        width: 100%;
        height: 100vh;
        text-align: center;
    }
    i {
        transform: scale(1.5);
        display: inline-block;
        color:var(--bright);
        filter: drop-shadow(0px 1px 1px var(--shadow))
    }
    img {
        width: 20vh;
        filter: drop-shadow(0px 3px 2px var(--shadow));
    }
    .loader {
        margin-top: 35vh;
        width: 100%;
    }
    .iWrap {
        margin-top: 3vh;
        display: block;
        text-align: center;
    }
</style>