import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-resume-modal',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './resume-modal.component.html',
    styleUrls: ['./resume-modal.component.scss']
})
export class ResumeModalComponent implements OnInit {
    resumeForm!: FormGroup;
    selectedFile: File | null = null;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ResumeModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { job: any }
    ) { }

    ngOnInit(): void {
        this.resumeForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];

            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a PDF or Word document');
                input.value = '';
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                input.value = '';
                return;
            }

            this.selectedFile = file;
        }
    }

    removeFile(event: Event): void {
        event.stopPropagation();
        this.selectedFile = null;
    }

    onSubmit(): void {
        if (this.resumeForm.invalid || !this.selectedFile) {
            this.resumeForm.markAllAsTouched();
            if (!this.selectedFile) {
                alert('Please upload your resume');
            }
            return;
        }

        this.dialogRef.close({
            formData: this.resumeForm.value,
            file: this.selectedFile
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
