<template>
<div class="container">
    <nav class="navbar">
        <div class="logo">
            logo
            <!-- <img src="../assets/logo.png" /> -->
        </div>
        <div class="search">
            <input type="text" v-model="courseName" @keyup.enter="findTutoringOffers" name="courseName" placeholder="Busca algún curso" />
        </div>
        <div class="avatar">
            photo
        </div>
    </nav>

    <div class="side-bar">
        <button>Quiero ser tutor</button>
    </div>

    <div v-if="isSearching && !tutoringsNotFound && !courseNotFound" class="found-tutorings">
        <div class="title">
            <h1>Tutorías encontradas</h1>
        </div>

        <div class="body">
            <div v-for="(item, index) in tutoringOffers" v-bind:key="index" class="tutoring">
                <div class="tutoring-body">
                    <div class="image">
                        <p>{{ item.course.name | firstLetter }}</p>
                    </div>

                    <div class="course-tutor">
                        <h1>{{ item.course.name | titlecase }}</h1>
                        <p>
                            {{ item.person.name + " " + item.person.lastname }}
                        </p>
                    </div>
                </div>

                <div class="tutoring-footer">
                    <div class="end-date">
                        <p>
                            {{ item.tutoringOffer.endTime | simpleDate }}
                        </p>
                    </div>

                    <div class="schedule">
                        <p>
                            {{ item.tutoringOffer.startTime | simpleTime }}
                            -
                            {{ item.tutoringOffer.endTime | simpleTime }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="tutoringsNotFound" class="errorMessage">
        <p>No se encontraron tutorías</p>
    </div>

    <div v-if="courseNotFound" class="errorMessage">
        <p>No se encontró un curso con ese nombre</p>
    </div>
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
} from "../Interfaces/Course";

@Component({
    components: {},
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
    courseService: CourseService;
    tutoringOfferService: TutoringOfferService;

    // datos
    public tutoringOffers: any[];
    public courseName: string;
    public isSearching: boolean;
    public tutoringsNotFound: boolean;
    public courseNotFound: boolean;

    public constructor() {
        super();
        // Servicios
        this.courseService = new CourseService();
        this.tutoringOfferService = new TutoringOfferService();

        this.isSearching = false;
        this.tutoringsNotFound = false;
        this.courseNotFound = false;
        this.tutoringOffers = [];
        this.courseName = "";
    }

    public findTutoringOffers() {
        if (this.courseName.length === 0) {
            this.isSearching = false;
            return;
        }

        this.courseService.findByName(10, this.courseName.toLowerCase())
            .then((response: any) => {
                const course: Course = response.data;
                this.courseNotFound = false;

                this.tutoringOfferService.findByUniversityAndCourse(10, course.courseId)
                    .then((response: any) => {

                        this.tutoringOffers = response.data;

                        this.tutoringOffers.forEach((element: any) => {
                            element.tutoringOffer.startTime = new Date(element.tutoringOffer.startTime);
                            element.tutoringOffer.endTime = new Date(element.tutoringOffer.endTime);
                        });

                        this.isSearching = true;
                        this.tutoringsNotFound = false;
                    })
                    .catch((error: any) => {
                        console.log("error");
                        // console.log(error);
                        this.tutoringsNotFound = true;
                    });
            })
            .catch((error: any) => {
                console.log("error");
                // console.log(error.status);
                this.courseNotFound = true;
            });
    }
}
</script>

<style lang="scss" scoped>
.container {
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

    .found-tutorings {
        margin: 32px 0;

        display: flex;
        flex-flow: column wrap;
        align-content: center;

        .title {
            margin-bottom: 16px;

            h1 {
                font-size: 20px;
            }
        }

        .body {
            display: flex;
            flex-flow: column wrap;
            align-content: center;

            .tutoring {
                width: 300px;
                margin: 16px 0;
                padding: 16px 20px;
                box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                cursor: pointer;

                .tutoring-body {
                    margin-bottom: 16px;

                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: flex-start;
                    align-items: center;

                    .image {
                        height: 60px;
                        width: 60px;
                        margin-right: 20px;
                        font-size: 30px;
                        border-radius: 5px;
                        background-color: tomato;
                        color: white;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .course-tutor {
                        display: flex;
                        flex-flow: column nowrap;

                        h1 {
                            font-weight: bold;
                            font-size: 18px;
                            margin-bottom: 4px;
                        }
                    }
                }

                .tutoring-footer {
                    display: flex;
                    justify-content: space-between;

                    .end-date,
                    .schedule {
                        font-size: 14px;
                    }
                }
            }
        }
    }
}

@media only screen and (min-width: 768px) {
    // .container {
    // 	// background-color: red;
    // 	.found-tutorings {
    // 		.body {
    // 		// flex-flow: row wrap;
    // 		// justify-content: space-around;

    // 		.tutoring {
    // 		.tutoring-body {
    // 		}
    // 		}
    // 		}
    // 	}
    // }
}

@media only screen and (min-width: 1024px) {
    .container {
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

        .found-tutorings {
            grid-column: 2 / span 1;
            align-self: stretch;

            padding: 16px;

            .title {
                align-self: flex-start;

            }

            .body {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                align-content: unset;
                justify-items: center;
            }
        }
    }
}
</style>
