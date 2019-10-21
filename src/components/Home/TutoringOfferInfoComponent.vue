<template>
<div class="tutoring-offer-info-container">
    <div class="tutoring-body">
        <div class="image">
            <p>{{ tutoringOffer.courseName | firstLetter }}</p>
        </div>

        <div class="course-tutor">
            <h1>{{ tutoringOffer.courseName | titlecase }}</h1>
            <p>
                {{ tutoringOffer.tutorName }}
            </p>
        </div>
    </div>

    <div class="tutoring-footer">
        <div class="end-date">
            <p>
                {{ tutoringOffer.endTime | simpleDate }}
            </p>
        </div>

        <div class="schedule">
            <p>
                {{ tutoringOffer.startTime | simpleTime }}
                -
                {{ tutoringOffer.endTime | simpleTime }}
            </p>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from "vue-property-decorator";
import {
    TutoringOfferInfo
} from '../../dtos/response/TutoringOfferInfo';

@Component({
    components: {},
    props: {
        tutoringOffer: {
            required: true,
            type: Object as () => TutoringOfferInfo
        }
    },
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
export default class TutoringOfferInfoComponent extends Vue {
    // public tutoringOffer:TutoringOfferInfo;

    public constructor() {
        super();

        // this.tutoringOffer = {};
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.tutoring-offer-info-container {
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
</style>
