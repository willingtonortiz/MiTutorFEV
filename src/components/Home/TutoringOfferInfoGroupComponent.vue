<template>
<div class="tutoring-offer-info-group-container">
    <div v-if="tutoringOffers.length > 0">

        <div class="title">
            <h1>Tutorías encontradas</h1>
        </div>

        <div class="body">
            <TutoringOfferInfoComponent v-for="(item, index) in tutoringOffers" v-bind:key="index" v-bind:tutoringOffer="item"></TutoringOfferInfoComponent>
            <!-- <app-tutoring-offer-info *ngFor="let item of tutoringOffers" [tutoringOffer]="item"></app-tutoring-offer-info> -->
        </div>
    </div>

    <!-- <ng-template #notFound> -->
    <div v-else>
        <div class="errorMessage">
            <p>No se encontraron tutorías</p>
        </div>
    </div>
    <!-- </ng-template> -->
</div>
</template>

<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from "vue-property-decorator";
import TutoringOfferInfoComponent from "./TutoringOfferInfoComponent.vue";
import {
    TutoringOfferInfo
} from '../../dtos/output/TutoringOfferInfo';

@Component({
    components: {
        TutoringOfferInfoComponent
    },
    props: {
        tutoringOffers: {
            required: true,
            type: Array as () => Array < TutoringOfferInfo >,
            default: []
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
export default class TutoringOfferInfoGroupComponent extends Vue {
    // public tutoringOffer: TutoringOfferInfo;

    public constructor() {
        super();

        // this.tutoringOffer = {};
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.tutoring-offer-info-group-container {
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
    }
}

@media only screen and (min-width: 1024px) {
    .tutoring-offer-info-group-container {
        grid-column: 2 / span 1;
        align-self: stretch;

        display: block;
        padding: 16px;

        .body {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            align-content: unset;
            justify-items: center;
        }
    }
}
</style>
