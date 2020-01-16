<template>
    <div id="carousel">
        <div class="cv-carousel">
            <!-- TOP songs goes here -->
            <div class="item">
                <p>song1 from DB</p>
            </div>
            <div class="item">
                <p>song2 from DB</p>
            </div>
            <div class="item">
                <p>song3 from DB</p>
            </div>
            <div class="item">
                <p>song4 from DB</p>
            </div>
            <div class="item">
                <p>song5 from DB</p>
            </div>
        </div>
     </div>   
</template>

<script>
    export default {
        name: 'Carousel',
        data() {
            return {
                topSong: {
                    song1: "Song1",
                    song2: "Song2",
                    song3: "Song3",
                    song4: "Song4",
                    song5: "Song5",
                },
            }
        },

        methods: {
            slidebar() {
         
            },   
        }
    }

</script>
