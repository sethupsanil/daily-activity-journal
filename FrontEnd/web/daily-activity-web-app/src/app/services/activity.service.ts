import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  logActivity(text: string) {
    return from(this.authService.getToken()).pipe(
      switchMap((token) =>
        this.http.post(
          `${this.baseUrl}activity/log-activity`,
          { text },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      )
    );
  }

  getActivities(params?: {
    limit?: number;
    mood?: string;
    tags?: string[];
    search?: string;
  }) {
    let queryParams = new HttpParams();
    if (params?.limit) queryParams = queryParams.set('limit', params.limit);
    if (params?.mood) queryParams = queryParams.set('mood', params.mood);
    if (params?.tags)
      queryParams = queryParams.set('tags', JSON.stringify(params.tags));
    if (params?.search) queryParams = queryParams.set('search', params.search);
    return from(this.authService.getToken()).pipe(
      switchMap((token) =>
        this.http.get(`${this.baseUrl}activity/get-activities`, {
          params: queryParams,
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    );
  }
}
