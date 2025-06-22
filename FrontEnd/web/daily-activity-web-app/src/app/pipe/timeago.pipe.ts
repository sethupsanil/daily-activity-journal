import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeago',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    const now = new Date();
    const past = new Date(value);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }
}
