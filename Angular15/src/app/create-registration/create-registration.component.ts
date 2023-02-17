import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../models/user.models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {

  public packages = ["Monthly", 'Weekly', 'Yearly'];
  public gender: string[] = ["male", 'Female'];
  public importantLists: string[] = [
    ' 1. Training bench',
    '2. Dumbbell set',
    '3. Treadmill',
    '4. Stationary bicycle',
    '5. Barbell Set',
    '6. Rowing machine',
    '7. Low-impact treadmills',
    '8. Ellipticals',
    '9. Balance trainers and resistance bands'
  ];

  public registerForm!: FormGroup;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private api: ApiService, private toastService: NgToastService, private router:Router) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      // bmi: [''],
      // bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: ['']
    });

    this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val["id"];
      this.api.getRegistrationUserId(this.userIdToUpdate)
        .subscribe(res => {
          this.isUpdateActive = true;
          this.fillFormTOUpdate(res);
        })
    })

    
      
    

  }
  submit() {
    this.api.postRegistration(this.registerForm.value).subscribe(res => {
      this.toastService.success({ detail: "Success", summary: "Enqire Added", duration: 3000 });
      this.registerForm.reset();
    })
  }

 

  update() {
    this.api.updateRegistration(this.registerForm.value,this.userIdToUpdate).subscribe(res => {
      this.toastService.success({ detail: "Success", summary: "Enqire Updated", duration: 3000 });
      this.registerForm.reset();
      this.router.navigate(['list']);
    })
  }

  fillFormTOUpdate(user: User): void {
    this.registerForm.setValue({
      firstName: user.firstName,
      // firstName: User.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      // // bmi: user.bmi,
      // // bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate
    })
  }


}

