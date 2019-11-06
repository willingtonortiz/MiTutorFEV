export default class ColorService {
    constructor() {
    }

    public static generateRandomColorString(): string {
        const red: number = Math.round(Math.random() * 255);
        const green: number = Math.round(Math.random() * 255);
        const blue: number = Math.round(Math.random() * 255);
        const alpha = 0.25;

        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }
}
