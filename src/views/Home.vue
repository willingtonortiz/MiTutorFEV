<template>
<div class="home-container">
    <nav class="navbar">
        <div class="logo">
            log
            <!-- <img src="../assets/logo.png" /> -->
        </div>
        <div class="search">
            <input type="text" v-model="courseName" @keyup.enter="findTutoringOffers" placeholder="Busca algún curso" />
        </div>
        <div class="avatar">
            photo
        </div>
    </nav>

    <div class="side-bar">
        <button>Quiero ser tutor</button>
    </div>

    <TutoringOfferInfoGroupComponent v-bind:tutoringOffers="tutoringOffers"></TutoringOfferInfoGroupComponent>

</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from "vue-property-decorator";
import {
    CourseService
} from "../Services/CourseService"
import {
    TutoringOfferService
} from "../Services/TutoringOfferService"
import {
    Course
} from '../Interfaces/Course';
import {
    TutoringOfferInfo
} from '../dtos/output/TutoringOfferInfo';
import
TutoringOfferInfoGroupComponent
from "../components/Home/TutoringOfferInfoGroupComponent.vue";

@Component({
    components: {
        TutoringOfferInfoGroupComponent
    },
    props: {},
    filters: {
        firstLetter: function (value: string): string {
            if (!value) return "";

            return value.charAt(0).toUpperCase();
        },
        titlecase: function (value: string): string {
            if (!value) return "";

            return value.charAt(0).toUpperCase() + value.slice(1);
        },
        simpleDate: function (value: Date): string {
            if (!value) return "";

            return value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear();
        },
        simpleTime: function (value: Date): string {
            if (!value) return "";

            return value.getHours() + ":" + value.getMinutes();
        }
    }
})
export default class Home extends Vue {
    // Servicios
    private tutoringOfferService: TutoringOfferService;
    private courseService: CourseService;

    // datos
    public tutoringOffers: any[];
    public courseName: string;

    public constructor() {
        super();
        // Servicios
        this.courseService = new CourseService();
        this.tutoringOfferService = new TutoringOfferService();

        this.tutoringOffers = [];
        this.courseName = "calculo 2";

        // this.findTutoringOffers();
    }

    public async findTutoringOffers() {
        if (this.courseName.length === 0) {
            return;
        }

        try {
            // Finding courses 
            const course: Course = await this.courseService.findByUniversityIdAndCourseName(
                1, this.courseName.toLowerCase()
            );

            // Finding tutoring offers
            const tutoringOffers: Array < TutoringOfferInfo > = await this.tutoringOfferService.findByUniversityIdAndCourseId(
                1, course.courseId!
            );

            this.tutoringOffers = tutoringOffers;
            this.tutoringOffers.forEach((element: any) => {
                element.startTime = new Date(element.startTime);
                element.endTime = new Date(element.endTime);
            });

        } catch (error) {
            this.tutoringOffers = [];
            console.log(error);
        }

    }
}
</script>

<style lang="scss" scoped>
.home-container {

    .navbar {
        // border: 1px solid red;
        padding: 16px;
        display: flex;
        flex-flow: row nowrap;

        justify-content: space-around;
        align-items: center;

        .search {
            input {
                padding: 8px;
                border: 1px solid lightgray;
                border-radius: 5px;
                font-size: 16px;
            }
        }
    }

    .side-bar {
        display: none;
    }
}

@media only screen and (min-width: 768px) {}

@media only screen and (min-width: 1024px) {
    .home-container {
        height: 100vh;
        display: grid;
        grid-template-columns: 3fr 9fr;
        grid-template-rows: min-content;
        gap: 16px;
        align-items: flex-start;

        .navbar {
            grid-column: 1 / span 2;
        }

        .side-bar {
            grid-column: 1 / span 1;
            align-self: stretch;

            margin: 16px;
            box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;

            button {
                padding: 12px 20px;
                background-color: #4e83ed;
                color: white;
                border-radius: 5px;
                border: none;
                font-size: 18px;
                font-weight: normal;
                cursor: pointer;
            }
        }

        TutoringOfferInfoGroupComponent{
            border: 5px solid green;
        }
    }
}
</style>
