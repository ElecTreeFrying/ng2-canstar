import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "ucfirst"
})
export class UcFirstPipe implements PipeTransform {

  transform(input: string): string;
  transform(input: any): any;
  transform(text: any): string {
    return this.isString(text) ? text.slice(0, 1).toUpperCase() + text.slice(1) : text;
  }

  isString(value: any) {
    return typeof value === "string";
  }

}
