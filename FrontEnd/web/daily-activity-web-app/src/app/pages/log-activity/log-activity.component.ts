import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-log-activity',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './log-activity.component.html',
  styleUrl: './log-activity.component.scss',
})
export class LogActivityComponent {
  text = '';
  error = '';
  success = '';
  logForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
  });
  constructor(private activityService: ActivityService) {}

  submitActivity() {
    if (!this.logForm.value.text?.trim()) {
      this.error = 'Activity cannot be empty';
      return;
    }

    this.activityService.logActivity(this.logForm.value.text).subscribe({
      next: () => {
        this.success = 'Activity logged!';
        this.text = '';
      },
      error: () => {
        this.error = 'Failed to log activity';
      },
    });
  }
}
