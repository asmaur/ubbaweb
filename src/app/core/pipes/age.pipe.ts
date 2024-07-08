import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "age"
})
export class AgePipe implements PipeTransform {
    transform(value: string, format: string="dd/MM/YYYY") {
        const birthDate = new Date(value);
        const currentDate = new Date();

        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            let previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            days = previousMonth.getDate() + days;
        }

        if (months < 0) {
            years--;
            months = 12 + months;
        }

        return years < 1 ? `${months} meses` : `${years} anos`
    }
}