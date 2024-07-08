import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
    name: "truncate"
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit: number = 100, ellipsis: string = '...'): string {
        if (value.length <= limit) {
            return value;
        }
        return value.substring(0, limit) + ellipsis;
    }
}