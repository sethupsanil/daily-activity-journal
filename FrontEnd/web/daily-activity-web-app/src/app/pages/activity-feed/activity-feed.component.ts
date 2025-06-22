import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TimeAgoPipe } from '../../pipe/timeago.pipe';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    TimeAgoPipe,
  ],
  templateUrl: './activity-feed.component.html',
  styleUrl: './activity-feed.component.scss',
})
export class ActivityFeedComponent {
  activities: any[] = [];
  search: string = '';
  mood: string = '';
  tags: string[] = [];
  selectedTags: string[] = [];
  limit: number = 10;

  isLoading = false;
  error: string | null = null;

  loading = false;

  constructor(
    private activityService: ActivityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchActivities();
  }

  fetchActivities(): void {
    this.loading = true;
    this.activityService
      .getActivities({ limit: this.limit, search: this.search })
      .subscribe({
        next: (data: any) => {
          this.activities = data.data;
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error fetching activities', err);
          this.loading = false;
        },
      });
  }
  toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.fetchActivities();
  }

  loadMore(): void {
    this.limit += 10;
    this.fetchActivities();
  }

  isTagSelected(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }

  onAdd(): void {
    this.router.navigate(['/log-activity']);
  }

  onLogout(): void {
    console.log('Logout');
  }
}
