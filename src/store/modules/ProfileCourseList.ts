import {Course} from "@/Models/Course";
import {CourseService} from "@/Services/CourseService";

export default {
    state: {
        courses: []
    },
    getters: {
        courses(state, getters) {
            return state.courses;
        },
    },
    mutations: {
        addCourse(state, course: Course) {
            state.courses.push(course);
        },
        fetchCourses(state, courses: Array<Course>) {
            state.courses = courses;
        }
    },
    actions: {
        addCourse(context, course: Course) {
            context.commit("addCourse", course);
        },
        async fetchCourses(context) {
            const courses: Array<Course> = await CourseService.findAllByTutorId(1);
            context.commit("fetchCourses", courses);
        }
    },

}