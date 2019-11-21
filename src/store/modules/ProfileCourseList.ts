import { Course } from "@/Models/Course";
import { CourseService } from "@/Services/CourseService";
import { UserCredentials } from "@/dtos/UserCredentials";
import AuthenticationService from "@/Services/AuthenticationService";

export default {
	namespaced: true,
	state: {
		courses: []
	},
	getters: {
		courses(state, getters) {
			return state.courses;
		}
	},
	mutations: {
		addCourse(state, course: Course) {
			state.courses.push(course);
		},
		async updateCourses(state) {
			const currentUser: UserCredentials =
				AuthenticationService.userValue;

			const courses: Array<Course> = await CourseService.findAllByTutorId(
				currentUser.id
			);
			state.courses = courses;
		}
	},
	actions: {
		async addCourse(context, course: Course) {
			const currentUser: UserCredentials =
				AuthenticationService.userValue;

			await CourseService.addCourseToTutorByTutorIdAndCourseId(
				currentUser.id,
				course.id
			);

			context.commit("updateCourses");
		},
		async deleteCourse(context, course: Course) {
			const currentUser: UserCredentials =
                AuthenticationService.userValue;

			await CourseService.deleteCourseFromTutorByTutorIdAndCourseId(
				currentUser.id,
				course.id
			);

			context.commit("updateCourses");
		},
		async fetchCourses(context) {
			context.commit("updateCourses");
		}
	}
};
