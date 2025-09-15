import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FeedbackService } from '../../../services/feedback/feedback';
import { Feedback } from '../../../models/Feedback';

@Component({
  selector: 'app-view-feedback',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-feedback.html',
  styleUrls: ['./view-feedback.css']
})
export class ViewFeedback implements OnInit {

  feedback: Feedback | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    const feedbackId = this.route.snapshot.paramMap.get('id');
    if (feedbackId) {
      this.feedbackService.getById(+feedbackId).subscribe({
        next: (data) => {
          this.feedback = data;
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    }
  }
}